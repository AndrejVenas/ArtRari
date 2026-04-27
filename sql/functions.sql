--Select for update
-- Functions
CREATE OR REPLACE FUNCTION fn_validate_bid () RETURNS VOID AS $$
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
    WHERE l.id = NEW.lot_id
    FOR UPDATE OF l;

    IF v_auction_status != 'active' THEN RAISE EXCEPTION 'Аукціон не активний.'; END IF;
    IF v_lot_status != 'available' OR v_lot_end_date <= CURRENT_TIMESTAMP THEN RAISE EXCEPTION 'Торги за цей лот вже завершено.'; END IF;
    IF NEW.user_id = v_owner_id THEN RAISE EXCEPTION 'Ви не можете ставити на власну роботу.'; END IF;
    IF NEW.user_id = v_curator_id THEN RAISE EXCEPTION 'Куратор не може робити ставки на лоти зі своєї виставки.'; END IF;
    IF NEW.amount < (v_current_price + v_auction_step) THEN RAISE EXCEPTION 'Ставка замала.'; END IF;
END; 
$$ LANGUAGE plpgsql;

--Анти-снайпер(продовження часу лоту якщо ставка зробелна за 10 хвилин до кінця)
CREATE OR REPLACE FUNCTION fn_extend_auction_timer () RETURNS VOID AS $$
BEGIN
    UPDATE lot
    SET end_date = end_date + INTERVAL '10 minutes'
    WHERE id = NEW.lot_id 
    AND end_date - CURRENT_TIMESTAMP < INTERVAL '10 minutes';
END;
$$ LANGUAGE PLPGSQL;

--Скасування лоту адміністратором
CREATE OR REPLACE FUNCTION fn_cancel_lot (p_lot_id INTEGER) RETURNS VOID AS $$
BEGIN
    UPDATE lot SET status = 'cancelled' WHERE id = p_lot_id;
    UPDATE work w
    SET status = 'available'
    FROM lot l
    WHERE w.id = l.work_id AND l.id = p_lot_id;
END;
$$ LANGUAGE PLPGSQL;

--Скасування ставки адміністратором
CREATE OR REPLACE FUNCTION fn_cancel_bid (p_bid_id INTEGER) RETURNS VOID AS $$
DECLARE
v_lot_id INTEGER;
BEGIN
    DELETE FROM bid 
    WHERE id = p_bid_id 
    RETURNING lot_id INTO v_lot_id;
    
    UPDATE lot l
    SET current_price = COALESCE(
        (SELECT amount FROM bid WHERE lot_id = v_lot_id ORDER BY amount DESC LIMIT 1),
        (SELECT start_price FROM work WHERE id = l.work_id)
    )
    WHERE id = v_lot_id;
END;
$$ LANGUAGE PLPGSQL;

--Бан юзера
CREATE OR REPLACE PROCEDURE sp_ban_user (p_user_id INTEGER) AS $$
DECLARE
BEGIN
    UPDATE users 
    SET is_banned = TRUE 
    WHERE id = p_user_id;
    
    DELETE FROM bid b 
    USING lot l 
    WHERE b.user_id = p_user_id AND l.id = b.lot_id AND l.status = 'available' AND l.end_date > CURRENT_TIMESTAMP;

    WITH unpaid_lots AS(
        SELECT id AS purchase_id, lot_id
        FROM purchase_history
        WHERE status = 'pending_payment' AND user_id = p_user_id
    ),
    cancel_purchases AS(
        UPDATE purchase_history
        SET status = 'cancelled'
        WHERE id IN (SELECT purchase_id FROM unpaid_lots)
    ),
    cancel_lots AS(
        UPDATE lot 
        SET status = 'cancelled' 
        WHERE id IN (SELECT lot_id FROM unpaid_lots)
    )
    UPDATE work w 
    SET status = 'available' 
    FROM lot l 
    WHERE l.work_id = w.id AND l.id IN (SELECT lot_id FROM unpaid_lots);
END;
$$ LANGUAGE PLPGSQL;

--Створення аукціону через конвертацію виставки у нього
CREATE OR REPLACE FUNCTION fn_convert_exhibition_to_auction (
    p_exhibition_id INTEGER,
    p_auction_step NUMERIC,
    p_duration_days INTEGER
) RETURNS VOID AS $$
DECLARE
    v_auction_id INTEGER;
    v_work RECORD;
BEGIN
    INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date)
    VALUES (p_exhibition_id, CURRENT_TIMESTAMP, p_auction_step, 'active', CURRENT_TIMESTAMP + (p_duration_days || ' days')::INTERVAL)
    RETURNING id INTO v_auction_id;

    UPDATE exhibition 
    SET status = 'converted_in_auction' 
    WHERE id = p_exhibition_id;

    WITH works_to_sell AS (
        SELECT id as work_id, start_price 
        FROM work 
        WHERE exhibition_id = p_exhibition_id 
        AND status = 'available'
    ),
    create_lots AS (
        INSERT INTO lot (work_id, auction_id, current_price, end_date, status)
        SELECT 
            work_id, 
            v_auction_id, 
            start_price, 
            CURRENT_TIMESTAMP + (p_duration_days || ' days')::INTERVAL, 
            'available'
        FROM works_to_sell
    )
    UPDATE work 
    SET status = 'in_auction' 
    WHERE id IN (SELECT work_id FROM works_to_sell);
END;
$$ LANGUAGE plpgsql;
