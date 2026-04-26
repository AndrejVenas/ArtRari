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