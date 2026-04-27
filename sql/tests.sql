TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;

INSERT INTO users (full_name, phone, email, password_hash, role) VALUES
('Художник', '+380111', 'art@test.com', 'h', 'user'),
('Покупець 1', '+380222', 'b1@test.com', 'h', 'user'),
('Покупець 2', '+380333', 'b2@test.com', 'h', 'user');

INSERT INTO exhibition (title, start_date, status) VALUES ('Тест', CURRENT_TIMESTAMP, 'converted_in_auction');

INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES (1, CURRENT_TIMESTAMP, 100, 'active', CURRENT_TIMESTAMP + INTERVAL '10 days');

INSERT INTO work (owner_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(1, 'Для закриття (з переможцем)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Для закриття (без ставок)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Активний (не чіпати)', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'in_auction'),
(1, 'Борг 4 дні', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'sold'),
(1, 'Борг 1 день', 'А', 'О', 'Т', '2023-01-01', 'U', 1000, 'sold');

-- Лот 1 і 2 вже завершилися за часом
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(1, 1, 1200, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),
(2, 1, 1000, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),  
(3, 1, 1000, CURRENT_TIMESTAMP + INTERVAL '5 days', 'available'),  
(4, 1, 1500, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),       
(5, 1, 1500, CURRENT_TIMESTAMP - INTERVAL '2 days', 'sold');       

-- Робимо 2 ставки на Лот 1. Найбільша ставка від Покупця 2 (id=3)
INSERT INTO bid (user_id, lot_id, amount, created_at) VALUES
(2, 1, 1100, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(3, 1, 1200, CURRENT_TIMESTAMP - INTERVAL '1.5 hours');

-- Створюємо історію покупок: один борг прострочений на 4 дні, інший на 1 день
INSERT INTO purchase_history (user_id, lot_id, final_price, status, win_date) VALUES
(2, 4, 1500, 'pending_payment', CURRENT_TIMESTAMP - INTERVAL '4 days'),
(3, 5, 1500, 'pending_payment', CURRENT_TIMESTAMP - INTERVAL '1 day');

CALL sp_process_finished_lots();

-- Лот 1 має стати 'sold', Лот 2 — 'cancelled', Лот 3 лишається 'available'
SELECT id, status FROM lot WHERE id IN (1, 2, 3) ORDER BY id;

-- Ставка на 1200 має отримати is_win = true
SELECT amount, is_win FROM bid WHERE lot_id = 1 ORDER BY amount DESC;

-- Має з'явитися новий борг 'pending_payment' для Лота 1 за 1200
SELECT lot_id, user_id, final_price, status FROM purchase_history WHERE lot_id = 1;

CALL sp_revoke_unpaid_purchases();

-- Борг за Лот 4 має стати 'cancelled' (минуло 4 дні). Борг за Лот 5 лишається 'pending_payment'
SELECT lot_id, status FROM purchase_history WHERE lot_id IN (4, 5) ORDER BY lot_id;

-- Статус Лоту 4 має змінитися на 'cancelled'. Лот 5 лишається 'sold'
SELECT id, status FROM lot WHERE id IN (4, 5) ORDER BY id;

-- Робота для Лота 4 має знову стати 'available' (повертається художнику)
SELECT id, status FROM work WHERE id = 4;


-- =========================================================================

TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;

INSERT INTO users (full_name, phone, email, password_hash, role) VALUES
('Адмін', '+380111111111', 'admin@test.com', 'hash', 'admin'),
('Куратор', '+380222222222', 'curator@test.com', 'hash', 'curator'),
('Художник', '+380333333333', 'artist@test.com', 'hash', 'user'),
('Покупець 1', '+380444444444', 'buyer1@test.com', 'hash', 'user'),
('Покупець 2 (Штрафник)', '+380555555555', 'buyer2@test.com', 'hash', 'user');

INSERT INTO exhibition (curator_id, title, start_date, status) VALUES
(2, 'Тестова виставка', CURRENT_TIMESTAMP - INTERVAL '1 day', 'converted_in_auction');

INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES
(1, CURRENT_TIMESTAMP - INTERVAL '1 day', 100.00, 'active', CURRENT_TIMESTAMP + INTERVAL '3 days');

INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(3, 1, 'Робота для валідації', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url1', 1000.00, 'in_auction'),
(3, 1, 'Робота для антиснайпера', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url2', 2000.00, 'in_auction'),
(3, 1, 'Робота для бану', 'Автор', 'Опис', 'Олія', '2023-01-01', 'url3', 3000.00, 'sold');

-- Створюємо лоти. Лот 2 закінчується через 5 хв
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(1, 1, 1000.00, CURRENT_TIMESTAMP + INTERVAL '1 day', 'available'),
(2, 1, 2000.00, CURRENT_TIMESTAMP + INTERVAL '5 minutes', 'available'),
(3, 1, 3500.00, CURRENT_TIMESTAMP - INTERVAL '1 day', 'sold'); 

-- Створюємо неоплачений борг для Покупця 2 (id=5), щоб потім його забанити
INSERT INTO purchase_history (user_id, lot_id, final_price, status) VALUES
(5, 3, 3500.00, 'pending_payment');

-- Штучно піднімаємо ціну Лоту 1
UPDATE lot SET current_price = 1200.00 WHERE id = 1;

-- Ставка від власника роботи. БД має видати помилку: "Ви не можете ставити на власну роботу"
INSERT INTO bid (user_id, lot_id, amount) VALUES (3, 1, 1500.00);

-- Ставка від куратора виставки. БД має видати помилку: "Куратор не може робити ставки..."
INSERT INTO bid (user_id, lot_id, amount) VALUES (2, 1, 1500.00);

-- Замала ставка (менше за крок). БД має видати помилку: "Ставка замала"
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 1, 1250.00);

-- Валідна ставка. Запит має пройти успішно
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 1, 1300.00);

-- Фіксуємо поточний час Лоту 2
SELECT id, end_date FROM lot WHERE id = 2;

-- Робимо ставку на Лот 2 за 5 хвилин до його кінця
INSERT INTO bid (user_id, lot_id, amount) VALUES (4, 2, 2100.00);

-- Перевірка анти-снайпера: час Лоту 2 має збільшитися на 10 хвилин
SELECT id, end_date FROM lot WHERE id = 2;

-- Скасовуємо Лот 2 через адмін-функцію
SELECT fn_cancel_lot(2);

-- Лот 2 має отримати статус 'cancelled', а його Робота знову стати 'available'
SELECT l.status as lot_status, w.status as work_status 
FROM lot l 
JOIN work w ON l.work_id = w.id 
WHERE l.id = 2;

-- Скасовуємо єдину ставку на Лот 1 через адмін-функцію
SELECT fn_cancel_bid(1);

-- Ціна лоту 1 має повернутися до попередньої (1200)
SELECT current_price FROM lot WHERE id = 1;

-- Банимо Покупця 2 (id=5)
SELECT fn_ban_user(5);

-- Поле is_banned для користувача 5 має стати 'true'
SELECT is_banned FROM users WHERE id = 5;

-- У забаненого юзера не має залишитися активних ставок (результат порожній)
SELECT * FROM bid WHERE user_id = 5;

-- Неоплачена покупка забаненого юзера (Лот 3) має отримати статус 'cancelled'
SELECT status FROM purchase_history WHERE user_id = 5 AND lot_id = 3;

-- Робота з Лота 3 має повернутися у статус 'available'
SELECT status FROM work WHERE id = 3;