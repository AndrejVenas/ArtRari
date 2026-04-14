-- Active: 1776176708683@@127.0.0.1@5432@test2@public
-- ENUMS
CREATE TYPE user_role AS ENUM('user', 'curator', 'admin');

CREATE TYPE exhibition_status AS ENUM('waiting', 'running', 'converted_in_auction');

CREATE TYPE auction_status AS ENUM('scheduled', 'active', 'finished');

CREATE TYPE work_status AS ENUM('available', 'in_auction', 'sold');

CREATE TYPE lot_status AS ENUM('available', 'sold', 'cancelled');

CREATE TYPE purchase_status AS ENUM(
  'pending_payment',
  'pending_shipment',
  'completed',
  'cancelled'
);

-- Tables
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  is_banned BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE exhibition (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  curator_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  theme TEXT,
  description TEXT,
  background_url TEXT,
  start_date TIMESTAMP NOT NULL,
  status exhibition_status NOT NULL DEFAULT 'waiting'
);

CREATE TABLE auction (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  exhibition_id INTEGER NOT NULL REFERENCES exhibition (id) ON DELETE CASCADE,
  start_date TIMESTAMP NOT NULL,
  auction_step NUMERIC(10, 2) NOT NULL,
  status auction_status NOT NULL DEFAULT 'scheduled',
  CONSTRAINT chk_auction_step CHECK (auction_step > 0)
);

CREATE TABLE work (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  owner_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  exhibition_id INTEGER REFERENCES exhibition (id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  technique TEXT NOT NULL,
  creation_date DATE NOT NULL,
  photo_url TEXT NOT NULL,
  start_price NUMERIC(12, 2) NOT NULL,
  status work_status NOT NULL DEFAULT 'available',
  CONSTRAINT chk_work_start_price CHECK (start_price >= 0)
);

CREATE TABLE lot (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  work_id INTEGER NOT NULL UNIQUE REFERENCES work (id) ON DELETE CASCADE,
  auction_id INTEGER NOT NULL REFERENCES auction (id) ON DELETE CASCADE,
  current_price NUMERIC(12, 2) NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status lot_status NOT NULL DEFAULT 'available',
  CONSTRAINT chk_lot_current_price CHECK (current_price >= 0)
);

CREATE TABLE bid (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lot_id INTEGER NOT NULL REFERENCES lot (id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_win BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT chk_bid_amount CHECK (amount > 0)
);

CREATE TABLE purchase_history (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lot_id INTEGER NOT NULL REFERENCES lot (id) ON DELETE SET NULL,
  final_price NUMERIC(12, 2) NOT NULL,
  win_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status purchase_status NOT NULL DEFAULT 'pending_payment',
  CONSTRAINT chk_purchase_final_price CHECK (final_price > 0)
);

CREATE TABLE tag (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE tag_work (
  tag_id INTEGER NOT NULL REFERENCES tag (id) ON DELETE CASCADE,
  work_id INTEGER NOT NULL REFERENCES work (id) ON DELETE CASCADE,
  PRIMARY KEY (tag_id, work_id)
);

-- Functions
CREATE OR REPLACE FUNCTION fn_validate_bid () RETURNS TRIGGER AS $$
DECLARE
    v_auction_status auction_status;
    v_lot_end_date TIMESTAMP;
    v_lot_status lot_status;
    v_owner_id INTEGER;
    v_current_price NUMERIC(12, 2);
    v_auction_step NUMERIC(10, 2);
    v_curator_id INTEGER;
BEGIN
    SELECT a.status, l.end_date, l.status, w.owner_id, l.current_price, a.auction_step, e.curator_id
    INTO v_auction_status, v_lot_end_date, v_lot_status, v_owner_id, v_current_price, v_auction_step, v_curator_id
    FROM lot l
    JOIN auction a ON l.auction_id = a.id
    JOIN work w ON l.work_id = w.id
    Join exhibition e ON a.exhibition_id = e.id
    WHERE l.id = NEW.lot_id;

    IF v_auction_status != 'active' THEN RAISE EXCEPTION 'Аукціон не активний.'; END IF;
    IF v_lot_status != 'available' OR v_lot_end_date <= CURRENT_TIMESTAMP THEN RAISE EXCEPTION 'Торги за цей лот вже завершено.'; END IF;
    IF NEW.user_id = v_owner_id THEN RAISE EXCEPTION 'Ви не можете ставити на власну роботу.'; END IF;
    IF NEW.user_id = v_curator_id THEN RAISE EXCEPTION 'Куратор не може робити ставки на лоти зі своєї виставки.'; END IF;
    IF NEW.amount < (v_current_price + v_auction_step) THEN RAISE EXCEPTION 'Ставка замала.'; END IF;

    RETURN NEW;
END; 
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_before_insert_bid BEFORE INSERT ON bid FOR EACH ROW
EXECUTE FUNCTION fn_validate_bid ();
