TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;
SELECT id, end_date, status FROM lot WHERE status = 'available' AND end_date <= CURRENT_TIMESTAMP;
-- Юзери
INSERT INTO users (full_name, phone, email, password_hash, role) VALUES
('Художник', '+380111', 'art@test.com', 'h', 'user'),
('Покупець 1', '+380222', 'b1@test.com', 'h', 'user'),
('Покупець 2', '+380333', 'b2@test.com', 'h', 'user');

-- Виставка та Аукціон
INSERT INTO exhibition (title, start_date, status) VALUES ('Тест', CURRENT_TIMESTAMP, 'converted_in_auction');
INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES (1, CURRENT_TIMESTAMP, 100, 'active', CURRENT_TIMESTAMP + INTERVAL '10 days');

-- Роботи
INSERT INTO work (owner_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(1, 'Для закриття (з переможцем)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Для закриття (без ставок)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Активний (не чіпати)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Борг 4 дні', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'sold'),
(1, 'Борг 1 день', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'sold');

-- Лоти
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(1, 1, 1200, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),  -- Лот 1: Завершився годину тому
(2, 1, 1000, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),  -- Лот 2: Завершився, але ставок немає
(3, 1, 1000, CURRENT_TIMESTAMP + INTERVAL '5 days', 'available'),  -- Лот 3: Ще триває
(4, 1, 1500, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),       -- Лот 4: Проданий давно
(5, 1, 1500, CURRENT_TIMESTAMP - INTERVAL '2 days', 'sold');       -- Лот 5: Проданий вчора

-- Ставки (тільки для Лоту 1, бо він має успішно закритися з переможцем)
INSERT INTO bid (user_id, lot_id, amount, created_at) VALUES
(2, 1, 1100, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(3, 1, 1200, CURRENT_TIMESTAMP - INTERVAL '1.5 hours'); -- Це переможна ставка

-- Історія покупок (Імітуємо борги для Процедури 2)
INSERT INTO purchase_history (user_id, lot_id, final_price, status, win_date) VALUES
(2, 4, 1500, 'pending_payment', CURRENT_TIMESTAMP - INTERVAL '4 days'), -- Борг 4 дні (має скасуватися)
(3, 5, 1500, 'pending_payment', CURRENT_TIMESTAMP - INTERVAL '1 day');  -- Борг 1 день (ще має час)

CALL sp_process_finished_lots();

-- 1. Лот 1 має бути 'sold', Лот 2 'cancelled', Лот 3 залишитись 'available'
SELECT id, status FROM lot WHERE id IN (1, 2, 3) ORDER BY id;

-- 2. Ставка на 1200 від Покупця 3 має стати переможною (is_win = true)
SELECT amount, is_win FROM bid WHERE lot_id = 1 ORDER BY amount DESC;

-- 3. В історії покупок має з'явитися НОВИЙ запис для Лоту 1 зі статусом 'pending_payment'
SELECT lot_id, user_id, final_price, status FROM purchase_history WHERE lot_id = 1;

CALL sp_revoke_unpaid_purchases();

-- 1. Історія: Покупка для Лоту 4 (борг 4 дні) має стати 'cancelled', а для Лоту 5 (1 день) залишитися 'pending_payment'
SELECT lot_id, status FROM purchase_history WHERE lot_id IN (4, 5) ORDER BY lot_id;

-- 2. Статус Лоту 4 має стати 'cancelled', Лот 5 залишитись 'sold'
SELECT id, status FROM lot WHERE id IN (4, 5) ORDER BY id;

-- 3. Робота для Лоту 4 має повернутися автору (статус 'available')
SELECT id, status FROM work WHERE id = 4;

TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;

INSERT INTO users (full_name, phone, email, password_hash, role) VALUES
('Адмін', '+380111111111', 'admin@test.com', 'hash', 'admin'),
('Куратор', '+380222222222', 'curator@test.com', 'hash', 'curator'),
('Художник', '+380333333333', 'artist@test.com', 'hash', 'user'),
('Покупець 1', '+380444444444', 'buyer1@test.com', 'hash', 'user'),
('Покупець 2 (Штрафник)', '+380555555555', 'buyer2@test.com', 'hash', 'user');

-- 2. Створюємо виставку (куратор_id = 2)
INSERT INTO exhibition (curator_id, title, start_date, status) VALUES
(2, 'Тестова виставка', CURRENT_TIMESTAMP - INTERVAL '1 day', 'converted_in_auction');

-- 3. Створюємо аукціон (exhibition_id = 1, крок 100)
INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES
(1, CURRENT_TIMESTAMP - INTERVAL '1 day', 100.00, 'active', CURRENT_TIMESTAMP + INTERVAL '3 days');

-- 4. Створюємо роботи (owner_id = 3)
INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(3, 1, 'Робота для валідації', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url1', 1000.00, 'in_auction'),
(3, 1, 'Робота для антиснайпера', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url2', 2000.00, 'in_auction'),
(3, 1, 'Робота для бану', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url3', 3000.00, 'sold');

-- 5. Створюємо лоти
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(1, 1, 1000.00, CURRENT_TIMESTAMP + INTERVAL '1 day', 'available'), -- Лот 1 (Звичайний)
(2, 1, 2000.00, CURRENT_TIMESTAMP + INTERVAL '5 minutes', 'available'), -- Лот 2 (Закінчується через 5 хв)
(3, 1, 3500.00, CURRENT_TIMESTAMP - INTERVAL '1 day', 'sold'); -- Лот 3 (Проданий)

-- 7. Історія покупок для Покупця 2 (для перевірки бану)
INSERT INTO purchase_history (user_id, lot_id, final_price, status) VALUES
(5, 3, 3500.00, 'pending_payment');

UPDATE lot SET current_price = 1200.00 WHERE id = 1;

-- ПРОВАЛ: Художник (id=3) ставить на свою роботу. Має бути помилка.
INSERT INTO bid (user_id, lot_id, amount) VALUES (3, 1, 1500.00);

-- ПРОВАЛ: Куратор (id=2) ставить на лот своєї виставки. Має бути помилка.
INSERT INTO bid (user_id, lot_id, amount) VALUES (2, 1, 1500.00);

-- ПРОВАЛ: Ставка замала (поточна 1200 + крок 100 = мінімум 1300).
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 1, 1250.00);

-- УСПІХ: Покупець 1 робить валідну ставку.
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 1, 1300.00);

-- Дивимося час до:
SELECT id, end_date FROM lot WHERE id = 2;

-- Робимо ставку на Лот 2 (якому лишилося 5 хвилин).
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 2, 2100.00);

-- Дивимося час після (має додатися 10 хвилин до end_date):
SELECT id, end_date FROM lot WHERE id = 2;

-- Викликаємо функцію для Лота 2
SELECT fn_cancel_lot(2);

-- Перевіряємо (Лот має бути 'cancelled', а Робота 2 — 'available'):
SELECT l.status as lot_status, w.status as work_status 
FROM lot l JOIN work w ON l.work_id = w.id WHERE l.id = 2;

-- Лот 1 зараз має ціну 1300 (після успіху в Тесті 1).
-- Ставка на 1300 має id = 4 (якщо ти виконував все по порядку). 
-- Скасовуємо цю найвищу ставку:
SELECT fn_cancel_bid(2);

-- Перевіряємо: ціна Лота 1 має повернутися до попередньої (1200.00).
SELECT current_price FROM lot WHERE id = 1;

-- Блокуємо Покупця 2 (id = 5), у якого є ставка на Лот 1 і несплачений Лот 3.
SELECT fn_ban_user(5);

-- Перевіряємо статус юзера (має бути is_banned = true):
SELECT is_banned FROM users WHERE id = 5;

-- Перевіряємо його ставки на активні лоти (мають зникнути, запит поверне 0 рядків):
SELECT * FROM bid WHERE user_id = 5;

-- Перевіряємо його історію покупок (має стати 'cancelled'):
SELECT status FROM purchase_history WHERE user_id = 5 AND lot_id = 3;

-- Перевіряємо статус неоплаченої роботи (Робота 3 має стати 'available'):
SELECT status FROM work WHERE id = 3;

