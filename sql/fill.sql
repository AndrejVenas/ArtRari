-- 0. Глобальная очистка базы со сбросом всех счетчиков ID
--TRUNCATE TABLE users, tag, exhibition, work, tag_work, auction, lot, bid, purchase_history RESTART IDENTITY CASCADE;

-- ==========================================
-- 1. ПОЛЬЗОВАТЕЛИ (Все возможные роли и статусы)
-- ==========================================
INSERT INTO users (full_name, phone, email, password_hash, role, is_banned) VALUES
('Главный Админ', '+380000000000', 'admin@art.com', 'hash', 'admin', FALSE),          -- id 1
('Куратор Анна', '+380111111111', 'anna@art.com', 'hash', 'curator', FALSE),         -- id 2
('Куратор Олег', '+380222222222', 'oleg@art.com', 'hash', 'curator', FALSE),         -- id 3
('Художник Да Винчи', '+380333333333', 'artist1@art.com', 'hash', 'user', FALSE),    -- id 4
('Художник Пикассо', '+380444444444', 'artist2@art.com', 'hash', 'user', FALSE),     -- id 5
('Богатый Покупатель', '+380555555555', 'buyer1@art.com', 'hash', 'user', FALSE),    -- id 6
('Хитрый Снайпер', '+380666666666', 'buyer2@art.com', 'hash', 'user', FALSE),        -- id 7
('Забаненный Должник', '+380777777777', 'banned@art.com', 'hash', 'user', TRUE);     -- id 8

-- ==========================================
-- 2. ТЕГИ
-- ==========================================
INSERT INTO tag (name) VALUES 
('Масло'), ('Акварель'), ('Современное искусство'), ('Классика'), ('Скульптура');

-- ==========================================
-- 3. ВЫСТАВКИ (Разные стадии)
-- ==========================================
INSERT INTO exhibition (curator_id, title, theme, start_date, status) VALUES 
(2, 'Будущая выставка', 'Авангард', CURRENT_TIMESTAMP + INTERVAL '10 days', 'waiting'),               -- id 1 (Только планируется)
(2, 'Текущая выставка', 'Ренессанс', CURRENT_TIMESTAMP - INTERVAL '2 days', 'running'),               -- id 2 (Идет прямо сейчас)
(3, 'Конвертированная 1', 'Модерн', CURRENT_TIMESTAMP - INTERVAL '10 days', 'converted_in_auction'),  -- id 3 (Стала аукционом 1)
(3, 'Конвертированная 2', 'Сюрреализм', CURRENT_TIMESTAMP - INTERVAL '20 days', 'converted_in_auction'); -- id 4 (Стала аукционом 2)

-- ==========================================
-- 4. АУКЦИОНЫ
-- ==========================================
INSERT INTO auction (exhibition_id, start_date, auction_step, status, end_date) VALUES 
(3, CURRENT_TIMESTAMP - INTERVAL '5 days', 100.00, 'active', CURRENT_TIMESTAMP + INTERVAL '5 days'),   -- id 1 (Активный аукцион)
(4, CURRENT_TIMESTAMP - INTERVAL '15 days', 50.00, 'finished', CURRENT_TIMESTAMP - INTERVAL '5 days'); -- id 2 (Завершенный аукцион)

-- ==========================================
-- 5. РАБОТЫ (И привязка тегов)
-- ==========================================
INSERT INTO work (owner_id, exhibition_id, title, author, description, technique, creation_date, photo_url, start_price, status) VALUES
(4, 2, 'Мона Лиза 2.0', 'Да Винчи', 'Описание', 'Масло', '2023-01-01', 'url', 5000, 'available'),       -- id 1 (Просто на выставке)
(5, 1, 'Кубы', 'Пикассо', 'Описание', 'Акварель', '2023-01-01', 'url', 3000, 'available'),            -- id 2 (Ждет будущей выставки)
(4, 3, 'Активный Лот 1', 'Да Винчи', 'Долгий лот', 'Масло', '2023-01-01', 'url', 1000, 'in_auction'),   -- id 3 (Для обычных ставок)
(5, 3, 'Лот для Снайпера', 'Пикассо', 'Заканчивается!', 'Акварель', '2023-01-01', 'url', 2000, 'in_auction'), -- id 4 (Осталось 5 мин)
(4, 3, 'Ждет закрытия (С победителем)', 'Да Винчи', 'Окончен', 'Масло', '2023-01-01', 'url', 1500, 'in_auction'), -- id 5 (Завершился час назад)
(5, 3, 'Ждет закрытия (Без ставок)', 'Пикассо', 'Никому не нужен', 'Акварель', '2023-01-01', 'url', 1000, 'in_auction'), -- id 6 (Завершился час назад)
(4, 4, 'Проданная работа 1', 'Да Винчи', 'Свежий долг', 'Масло', '2023-01-01', 'url', 5000, 'sold'),    -- id 7 (Ждет оплаты 1 день)
(5, 4, 'Проданная работа 2', 'Пикассо', 'Старый долг', 'Акварель', '2023-01-01', 'url', 4000, 'sold'),  -- id 8 (Ждет оплаты 4 дня -> штраф)
(4, 4, 'Доставленная работа', 'Да Винчи', 'Успех', 'Масло', '2023-01-01', 'url', 8000, 'sold');         -- id 9 (Успешная сделка)

INSERT INTO tag_work (tag_id, work_id) VALUES (1, 1), (3, 1), (2, 2), (1, 3), (2, 4), (1, 7), (2, 8);

-- ==========================================
-- 6. ЛОТЫ
-- ==========================================
INSERT INTO lot (work_id, auction_id, current_price, end_date, status) VALUES
-- Для Аукциона 1 (Активный)
(3, 1, 1200.00, CURRENT_TIMESTAMP + INTERVAL '3 days', 'available'),      -- id 1 (Активный, уже есть ставки)
(4, 1, 2000.00, CURRENT_TIMESTAMP + INTERVAL '5 minutes', 'available'),   -- id 2 (Цель для проверки функции Анти-снайпер)
(5, 1, 1700.00, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),      -- id 3 (Время вышло, ждет вызова sp_process_finished_lots)
(6, 1, 1000.00, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'available'),      -- id 4 (Время вышло, ставок нет, ждет sp_process_finished_lots)
(7, 2, 5500.00, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),           -- id 5 (Уже обработан)
(8, 2, 4500.00, CURRENT_TIMESTAMP - INTERVAL '5 days', 'sold'),           -- id 6 (Уже обработан)
(9, 2, 8000.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'sold');          -- id 7 (Уже обработан)

-- ==========================================
-- 7. ИСТОРИЯ СТАВОК
-- ==========================================
INSERT INTO bid (user_id, lot_id, amount, created_at, is_win) VALUES
-- Ставки на активный Лот 1
(6, 1, 1100.00, CURRENT_TIMESTAMP - INTERVAL '1 day', FALSE),
(7, 1, 1200.00, CURRENT_TIMESTAMP - INTERVAL '12 hours', FALSE),
(6, 3, 1600.00, CURRENT_TIMESTAMP - INTERVAL '2 hours', FALSE),
(7, 3, 1700.00, CURRENT_TIMESTAMP - INTERVAL '1.5 hours', FALSE), -- Этот парень должен победить при вызове процедуры
(6, 5, 5500.00, CURRENT_TIMESTAMP - INTERVAL '6 days', TRUE),
(7, 6, 4500.00, CURRENT_TIMESTAMP - INTERVAL '6 days', TRUE),
(6, 7, 8000.00, CURRENT_TIMESTAMP - INTERVAL '11 days', TRUE);

-- ==========================================
-- 8. ИСТОРИЯ ПОКУПОК (Наш "отдел финансов")
-- ==========================================
INSERT INTO purchase_history (user_id, lot_id, final_price, win_date, status) VALUES
(6, 5, 5500.00, CURRENT_TIMESTAMP - INTERVAL '1 day', 'pending_payment'),   -- Свежий долг (оплатит позже)
(7, 6, 4500.00, CURRENT_TIMESTAMP - INTERVAL '4 days', 'pending_payment'),  -- ПРОСРОЧЕНО! (Цель для sp_revoke_unpaid_purchase)
(6, 7, 8000.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'completed');       -- Идеально закрытая сделка

SELECT jobid, runid, job_pid, status, return_message, start_time, end_time 
FROM cron.job_run_details 
ORDER BY start_time DESC 
LIMIT 10;