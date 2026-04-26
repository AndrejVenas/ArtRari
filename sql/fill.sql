-- 1. Користувачі (Актори: 1 Адмін, 2 Куратори, 3 Звичайні користувачі)
INSERT INTO users (full_name, phone, email, password_hash, role, is_banned) VALUES
('Адмін Адмінов', '+380501111111', 'admin@artrari.com', 'hash_admin', 'admin', false),
('Олена Куратор', '+380502222222', 'olena@artrari.com', 'hash_curator1', 'curator', false),
('Іван Куратор', '+380503333333', 'ivan@artrari.com', 'hash_curator2', 'curator', false),
('Марія Художниця', '+380504444444', 'maria@gmail.com', 'hash_user1', 'user', false),
('Василь Колекціонер', '+380505555555', 'vasyl@gmail.com', 'hash_user2', 'user', false),
('Петро Покупець', '+380506666666', 'petro@gmail.com', 'hash_user3', 'user', false);

-- 2. Теги (для класифікації робіт)
INSERT INTO tag (name) VALUES
('Сучасне мистецтво'),
('Живопис'),
('Скульптура'),
('Фотографія'),
('Мінімалізм');

-- 3. Виставки (у різних статусах: очікує, конвертована в аукціон)
INSERT INTO exhibition (curator_id, title, theme, description, background_url, start_date, status, thumbnail_url) VALUES
(2, 'Барви осені', 'Осінні пейзажі', 'Виставка присвячена красі природи.', 'bg_autumn.jpg', NOW() - INTERVAL '5 days', 'waiting', 'thumb_autumn.jpg'),
(3, 'Сучасний погляд', 'Абстракція', 'Нові форми та кольори в сучасному мистецтві.', 'bg_modern.jpg', NOW() - INTERVAL '2 days', 'converted_in_auction', 'thumb_modern.jpg'),
(2, 'Минулі епохи', 'Ретро', 'Історичні мотиви у фотографіях.', 'bg_retro.jpg', NOW() - INTERVAL '10 days', 'converted_in_auction', 'thumb_retro.jpg');

-- 4. Роботи (Артоб'єкти)
INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(4, 1, 'Осінній ліс', 'Марія Художниця', 'Полотно, олія.', 'Олійний живопис', '2023-09-15', 'work1.jpg', 500.00, 'available'),
(4, 2, 'Абстракція 1', 'Марія Художниця', 'Графіка на папері.', 'Графіка', '2023-10-01', 'work2.jpg', 1000.00, 'in_auction'),
(5, 2, 'Старе місто', 'Невідомий', 'Фотографія старого Києва.', 'Ч/Б Фото', '2020-05-20', 'work3.jpg', 1500.00, 'in_auction'),
(4, 3, 'Кіт на вікні', 'Марія Художниця', 'Акварель.', 'Акварель', '2022-01-10', 'work4.jpg', 800.00, 'sold');

-- 5. Зв'язок робіт і тегів
INSERT INTO tag_work (tag_id, work_id) VALUES
(2, 1), (1, 2), (4, 3), (2, 4), (5, 2);

-- 6. Аукціони (активний та вже завершений)
INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES
(2, NOW() - INTERVAL '1 day', 100.00, 'active', NOW() + INTERVAL '3 days'), -- Активний
(3, NOW() - INTERVAL '8 days', 50.00, 'finished', NOW() - INTERVAL '1 day'); -- Завершений

-- 7. Лоти
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(2, 1, 1000.00, NOW() + INTERVAL '3 days', 'available'), -- Для Абстракції 1
(3, 1, 1500.00, NOW() + INTERVAL '3 days', 'available'), -- Для Старого міста
(4, 2, 950.00, NOW() - INTERVAL '1 day', 'sold');        -- Проданий лот

-- 8. Ставки (Враховано тригер: ставлять не автори, аукціон активний, сума >= current_price + step)
INSERT INTO bid (user_id, lot_id, amount, created_at, is_win) VALUES
(5, 1, 1100.00, NOW() - INTERVAL '2 hours', false), -- Василь(5) ставить на роботу Марії(4)
(6, 2, 1600.00, NOW() - INTERVAL '1 hour', false);  -- Петро(6) ставить на роботу Василя(5)

-- 9. Історія покупок (для лота 3, який прив'язаний до завершеного аукціону)
INSERT INTO purchase_history (user_id, lot_id, final_price, win_date, status) VALUES
(6, 3, 950.00, NOW() - INTERVAL '1 day', 'pending_payment');

INSERT INTO tag_work (tag_id, work_id) VALUES
(3, 4), (1, 4)

INSERT INTO purchase_history(user_id, lot_id, final_price, win_date, status) VALUES
(6, 2, 54220.00, NOW() - INTERVAL '5 day', 'completed')