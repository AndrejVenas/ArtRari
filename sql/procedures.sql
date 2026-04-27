--Перевірка лотів по таймеру, якщо вони закінчилися - знайти переможця або поставити статус не продано
CREATE OR REPLACE PROCEDURE sp_process_finished_lots () AS $$
BEGIN
    WITH finished_lots AS (
        SELECT id
        FROM lot
        WHERE status = 'available' AND end_date <= CURRENT_TIMESTAMP
    ),
    highest_bids AS (
        SELECT DISTINCT ON (lot_id) 
            id AS bid_id, 
            lot_id, 
            user_id, 
            amount
        FROM bid
        WHERE lot_id IN (SELECT id FROM finished_lots)
        ORDER BY lot_id, amount DESC
    ),
    mark_winning_bids AS (
        UPDATE bid
        SET is_win = TRUE
        WHERE id IN (SELECT bid_id FROM highest_bids)
    ),
    mark_sold_lots AS (
        UPDATE lot
        SET status = 'sold'
        WHERE id IN (SELECT lot_id FROM highest_bids)
    ),
    create_purchases AS (
        INSERT INTO purchase_history (user_id, lot_id, final_price, status)
        SELECT user_id, lot_id, amount, 'pending_payment'
        FROM highest_bids
    )
    UPDATE lot
    SET status = 'not_sold'
    WHERE id IN (SELECT id FROM finished_lots)
    AND id NOT IN (SELECT lot_id FROM highest_bids);
END;
$$ LANGUAGE PLPGSQL;

--Прибирання неопланеченних після 3 днів вигранних лотів
CREATE OR REPLACE PROCEDURE sp_revoke_unpaid_purchases () AS $$
BEGIN
WITH cancelled_purchases AS (
    UPDATE purchase_history 
    SET status = 'cancelled' 
    WHERE status = 'pending_payment' AND win_date + INTERVAL '3 days' <= CURRENT_TIMESTAMP
    RETURNING lot_id
),
cancelled_lots AS (
    UPDATE lot 
    SET status = 'cancelled' 
    WHERE id IN (SELECT lot_id FROM cancelled_purchases)
    RETURNING work_id
)
UPDATE work 
SET status = 'available' 
WHERE id IN (SELECT work_id FROM cancelled_lots);
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