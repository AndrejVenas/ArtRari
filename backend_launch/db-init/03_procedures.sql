--Перевірка лотів по таймеру, якщо вони закінчилися - знайти переможця або поставити статус не продано
CREATE OR REPLACE PROCEDURE sp_process_finished_lots () AS $$
DECLARE
    v_lot RECORD;
    v_highest_bid RECORD;
BEGIN
    FOR v_lot IN 
        SELECT id, work_id FROM lot WHERE status = 'available' AND end_date <= CURRENT_TIMESTAMP
    LOOP
        BEGIN
            SELECT id, user_id, amount INTO v_highest_bid
            FROM bid
            WHERE lot_id = v_lot.id ORDER BY amount DESC LIMIT 1;

            IF FOUND THEN
                UPDATE bid SET is_win = TRUE WHERE id = v_highest_bid.id;
                UPDATE lot SET status = 'sold' WHERE id = v_lot.id;
                INSERT INTO purchase_history (user_id, lot_id, final_price, status) VALUES
                (v_highest_bid.user_id, v_lot.id, v_highest_bid.amount, 'pending_payment');
            ELSE
                UPDATE lot SET status = 'not_sold' WHERE id = v_lot.id;
            END IF;
            EXCEPTION
                WHEN OTHERS THEN
                    ROLLBACK;
                    RAISE NOTICE 'Помилка закриття лота %: %', v_lot.id, SQLERRM;
        END;
        COMMIT;
    END LOOP;
END;
$$ LANGUAGE PLPGSQL;

SELECT cron.schedule('Close Finished Lots', '* * * * *', 'CALL sp_process_finished_lots();');

--Прибирання неопланеченних після 3 днів вигранних лотів
CREATE OR REPLACE PROCEDURE sp_revoke_unpaid_purchases () AS $$
DECLARE
v_record RECORD;
BEGIN
    FOR v_record IN
        SELECT id, lot_id FROM purchase_history WHERE status = 'pending_payment' AND win_date + INTERVAL '3 days' <= CURRENT_TIMESTAMP
    LOOP
        BEGIN
            UPDATE purchase_history SET status = 'cancelled' WHERE id = v_record.id;
            UPDATE lot SET status = 'cancelled' WHERE id = v_record.lot_id;
            UPDATE work w SET status = 'available' FROM lot l WHERE l.work_id = w.id AND l.id = v_record.lot_id;
        EXCEPTION
            WHEN OTHERS THEN
                ROLLBACK;
                RAISE NOTICE 'Помилка скасування лота %: %', v_record.lot_id, SQLERRM;
        END;
        COMMIT;
    END LOOP;
END;
$$ LANGUAGE PLPGSQL;

SELECT cron.schedule('Revoke Unpaid Purchases', '0 3 * * *', 'CALL sp_revoke_unpaid_purchase();');

--Створення аукціону через конвертацію виставки у нього
CREATE OR REPLACE PROCEDURE sp_convert_exhibition_to_auction (
    p_exhibition_id INTEGER,
    p_auction_step NUMERIC,
    p_duration_days INTEGER
) AS $$
DECLARE
    v_auction_id INTEGER;
    v_work RECORD;
BEGIN
    INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date)
    VALUES (p_exhibition_id, CURRENT_TIMESTAMP, p_auction_step, 'active', CURRENT_TIMESTAMP + (p_duration_days || ' days')::INTERVAL)
    RETURNING id INTO v_auction_id;

    UPDATE exhibition SET status = 'converted_in_auction' WHERE id = p_exhibition_id;

    FOR v_work IN 
        SELECT id, start_price FROM work WHERE exhibition_id = p_exhibition_id AND status = 'available'
    LOOP
        INSERT INTO lot (work_id, auction_id, current_price, end_date, status)
        VALUES (v_work.id, v_auction_id, v_work.start_price, CURRENT_TIMESTAMP + (p_duration_days || ' days')::INTERVAL, 'available');
        
        UPDATE work SET status = 'in_auction' WHERE id = v_work.id;
    END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE EXCEPTION 'Помилка при створенні аукціону: %', SQLERRM;
    COMMIT;
END;
$$ LANGUAGE plpgsql;