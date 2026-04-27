--TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;
INSERT INTO users (full_name, phone, email, password_hash, role, is_banned) VALUES
('Главный Админ', '+380000000000', 'admin@art.com', 'hash', 'admin', FALSE),          
('Куратор Анна', '+380111111111', 'anna@art.com', 'hash', 'curator', FALSE),         
('Куратор Олег', '+380222222222', 'oleg@art.com', 'hash', 'curator', FALSE),         
('Художник Да Винчи', '+380333333333', 'artist1@art.com', 'hash', 'user', FALSE),    
('Художник Пикассо', '+380444444444', 'artist2@art.com', 'hash', 'user', FALSE),     
('Богатый Покупатель', '+380555555555', 'buyer1@art.com', 'hash', 'user', FALSE),    
('Хитрый Снайпер', '+380666666666', 'buyer2@art.com', 'hash', 'user', FALSE),        
('Забаненный Должник', '+380777777777', 'banned@art.com', 'hash', 'user', TRUE);     

INSERT INTO tag (name) VALUES 
('Масло'), ('Акварель'), ('Современное искусство'), ('Классика'), ('Скульптура');

INSERT INTO exhibition (curator_id, title, theme, start_date, status) VALUES 
(2, 'Будущая выставка', 'Авангард', CURRENT_TIMESTAMP + INTERVAL '10 days', 'waiting'),               
(2, 'Текущая выставка', 'Ренессанс', CURRENT_TIMESTAMP - INTERVAL '2 days', 'running'),               
(3, 'Конвертированная 1', 'Модерн', CURRENT_TIMESTAMP - INTERVAL '10 days', 'converted_in_auction'), 
(3, 'Конвертированная 2', 'Сюрреализм', CURRENT_TIMESTAMP - INTERVAL '20 days', 'converted_in_auction'); 

INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES 
(3, CURRENT_TIMESTAMP - INTERVAL '5 days', 100.00, 'active', CURRENT_TIMESTAMP + INTERVAL '5 days'),   
(4, CURRENT_TIMESTAMP - INTERVAL '15 days', 50.00, 'finished', CURRENT_TIMESTAMP - INTERVAL '5 days');

INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(4, 2, 'Мона Лиза 2.0', 'Да Винчи', 'Описание', 'Масло', '2023-01-01', 'url', 5000, 'available'),       
(5, 1, 'Кубы', 'Пикассо', 'Описание', 'Акварель', '2023-01-01', 'url', 3000, 'available'),           
(4, 3, 'Активный Лот 1', 'Да Винчи', 'Долгий лот', 'Масло', '2023-01-01', 'url', 1000, 'in_auction'),   
(5, 3, 'Лот для Снайпера', 'Пикассо', 'Заканчивается!', 'Акварель', '2023-01-01', 'url', 2000, 'in_auction'),
(4, 3, 'Ждет закрытия (С победителем)', 'Да Винчи', 'Окончен', 'Масло', '2023-01-01', 'url', 1500, 'in_auction'),
(5, 3, 'Ждет закрытия (Без ставок)', 'Пикассо', 'Никому не нужен', 'Акварель', '2023-01-01', 'url', 1000, 'in_auction'),
(4, 4, 'Проданная работа 1', 'Да Винчи', 'Свежий долг', 'Масло', '2023-01-01', 'url', 5000, 'sold'),
(5, 4, 'Проданная работа 2', 'Пикассо', 'Старый долг', 'Акварель', '2023-01-01', 'url', 4000, 'sold'),
(4, 4, 'Доставленная работа', 'Да Винчи', 'Успех', 'Масло', '2023-01-01', 'url', 8000, 'sold'); 

INSERT INTO tag_work (tag_id, work_id) VALUES (1, 1), (3, 1), (2, 2), (1, 3), (2, 4), (1, 7), (2, 8);

INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
-- Для Аукциона 1 (Активный)
(3, 1, 1200.00, CURRENT_TIMESTAMP + INTERVAL '3 days', 'available'),      
(4, 1, 2000.00, CURRENT_TIMESTAMP + INTERVAL '5 minutes', 'available'),   
(5, 1, 1700.00, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),      
(6, 1, 1000.00, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),      
(7, 2, 5500.00, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),           
(8, 2, 4500.00, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),           
(9, 2, 8000.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'sold');          

INSERT INTO bid (user_id, lot_id, amount, created_at, is_win) VALUES
-- Ставки на активный Лот 1
(6, 1, 1100.00, CURRENT_TIMESTAMP - INTERVAL '1 day', FALSE),
(7, 1, 1200.00, CURRENT_TIMESTAMP - INTERVAL '12 hours', FALSE),
(6, 3, 1600.00, CURRENT_TIMESTAMP - INTERVAL '2 hours', FALSE),
(7, 3, 1700.00, CURRENT_TIMESTAMP - INTERVAL '1.5 hours', FALSE),
(6, 5, 5500.00, CURRENT_TIMESTAMP - INTERVAL '6 days', TRUE),
(7, 6, 4500.00, CURRENT_TIMESTAMP - INTERVAL '6 days', TRUE),
(6, 7, 8000.00, CURRENT_TIMESTAMP - INTERVAL '11 days', TRUE);

INSERT INTO purchase_history (user_id, lot_id, final_price, win_date, status) VALUES
(6, 5, 5500.00, CURRENT_TIMESTAMP - INTERVAL '1 day', 'pending_payment'),
(7, 6, 4500.00, CURRENT_TIMESTAMP - INTERVAL '4 days', 'pending_payment'), 
(6, 7, 8000.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'completed'); 

SELECT jobid, runid, job_pid, status, return_message, start_time, end_time 
FROM cron.job_run_details 
ORDER BY start_time DESC 
LIMIT 10;