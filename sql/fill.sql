-- 1. Користувачі (Адмін, Куратор, два Художники/Продавці, два Покупці)
INSERT INTO users (full_name, phone, email, password_hash, role, is_banned) VALUES
('Данило Адмін', '+380500000001', 'admin@artrari.com', 'hash1', 'admin', FALSE), -- ID 1
('Павло Куратор', '+380500000002', 'curator@artrari.com', 'hash2', 'curator', FALSE), -- ID 2
('Антон Художник', '+380500000003', 'anton@art.com', 'hash3', 'user', FALSE), -- ID 3 (Власник)
('Андрій Продавець', '+380500000004', 'andriy@art.com', 'hash4', 'user', FALSE), -- ID 4 (Власник)
('Марія Покупець', '+380500000005', 'maria@mail.com', 'hash5', 'user', FALSE), -- ID 5 (Учасник)
('Олена Лав', '+380500000006', 'olena@mail.com', 'hash6', 'user', FALSE); -- ID 6 (Учасник)

-- 2. Теги
INSERT INTO tag (name) VALUES 
('#живопис'), ('#скульптура'), ('#цифрове_мистецтво'), ('#мінімалізм'), ('#сучасне_мистецтво');

-- 3. Виставки
-- Одна завершена, одна активна
INSERT INTO exhibition (curator_id, title, theme, description, background_url, start_date, status) VALUES
(2, 'Класика крізь віки', 'Живопис', 'Виставка класичних робіт.', 'bg_classic.jpg', '2026-03-01 10:00:00', 'converted_in_auction'), -- ID 1
(2, 'Цифрові Світи', 'NFT & Digital', 'Майбутнє арту.', 'bg_digital.jpg', '2026-04-10 12:00:00', 'converted_in_auction'); -- ID 2

-- 4. Артоб’єкти (Work)
INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(3, 1, 'Старий Львів', 'Антон Художник', 'Вулички міста.', 'Олія', '2025-10-01', 'old_lviv.jpg', 1200.00, 'sold'), -- ID 1
(3, 2, 'Кіберпанк 2077', 'Антон Художник', 'Неонове місто.', 'Digital', '2026-01-20', 'cyber.png', 500.00, 'in_auction'), -- ID 2
(4, 2, 'Абстракція №5', 'Андрій Продавець', 'Гра форм.', 'Акрил', '2025-12-15', 'abs5.jpg', 800.00, 'in_auction'); -- ID 3

-- 5. Прив’язка тегів до робіт
INSERT INTO tag_work (tag_id, work_id) VALUES 
(1, 1), (5, 1), -- Старий Львів: #живопис, #сучасне_мистецтво
(3, 2), -- Кіберпанк: #цифрове_мистецтво
(4, 3), (5, 3); -- Абстракція: #мінімалізм, #сучасне_мистецтво

-- 6. Аукціони
INSERT INTO auction (exhibition_id, start_date, auction_step, status) VALUES
(1, '2026-03-05 10:00:00', 100.00, 'finished'), -- ID 1
(2, '2026-04-12 12:00:00', 50.00, 'active'); -- ID 2

-- 7. Лоти (Lot)
-- Лот 1 вже закритий (час вичерпано), Лот 2 і 3 активні
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
(1, 1, 1500.00, '2026-03-10 18:00:00', 'sold'), -- ID 1 (Завершений)
(2, 2, 600.00, current_timestamp + INTERVAL '5 days', 'available'), -- ID 2 (Активний)
(3, 2, 800.00, current_timestamp + INTERVAL '5 days', 'available'); -- ID 3 (Активний, ставок ще немає)

-- 8. Ставки (Bid)
-- Ставки для завершеного Лота 1 (Марія виграла)
INSERT INTO bid (user_id, lot_id, amount, created_at, is_win) VALUES
(5, 1, 1300.00, '2026-03-06 12:00:00', FALSE),
(6, 1, 1400.00, '2026-03-07 15:00:00', FALSE),
(5, 1, 1500.00, '2026-03-09 10:00:00', TRUE);

-- Ставки для активного Лота 2 (Змагаються Марія та Олена)
INSERT INTO bid (user_id, lot_id, amount, created_at, is_win) VALUES
(6, 2, 550.00, '2026-04-13 09:00:00', FALSE),
(5, 2, 600.00, '2026-04-14 14:00:00', FALSE); -- Поточний лідер

-- 9. Історія покупок (Purchase History)
-- Запис для проданого Лота 1
INSERT INTO purchase_history (user_id, lot_id, final_price, win_date, status) VALUES
(5, 1, 1500.00, '2026-03-10 18:00:01', 'completed');