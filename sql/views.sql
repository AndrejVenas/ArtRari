--Views
--Список робіт у історії покупок усіх користувачів
CREATE OR REPLACE VIEW vw_user_purchase_history AS
SELECT
    w.id,
    ph.id,
    w.photo_url,
    w.title,
    ph.final_price,
    ph.status,
    ph.win_date,
    string_agg(t.name, ', ') tags
FROM
    purchase_history as ph
    JOIN lot AS l ON ph.lot_id = l.id
    JOIN work AS w ON l.work_id = w.id
    JOIN tag_work tw ON w.id = tw.work_id
    JOIN tag t ON tw.tag_id = t.id
GROUP BY
    w.id,
    ph.id,
    w.photo_url,
    w.title,
    ph.final_price,
    ph.status,
    ph.win_date;

--Список завантажених робіт усіх користувачів
CREATE OR REPLACE VIEW vw_user_uploaded_works AS
SELECT
    w.id,
    l.id,
    w.owner_id,
    w.title,
    w.author,
    w.creation_date,
    w.description,
    w.photo_url,
    w.start_price,
    w.status,
    w.technique,
    l.current_price,
    string_agg(t.name, ', ') tags
FROM
    work AS w
    JOIN tag_work tw ON w.id = tw.work_id
    JOIN tag t ON tw.tag_id = t.id
    LEFT JOIN lot as l ON l.work_id = w.id
GROUP BY
    w.id,
    l.id,
    w.owner_id,
    w.title,
    w.author,
    w.creation_date,
    w.description,
    w.photo_url,
    w.start_price,
    w.status,
    w.technique,
    l.current_price;

--Список активних лотів
CREATE OR REPLACE VIEW vw_active_lots AS
SELECT
    l.id AS lot_id,
    a.id AS auction_id,
    w.id AS work_id,
    w.title,
    w.author,
    w.photo_url,
    l.current_price,
    l.end_date,
    l.status,
    a.auction_step
FROM
    lot as l
    JOIN work as w ON w.id = l.work_id
    JOIN auction as a ON a.id = l.auction_id;

--Список виставок
CREATE OR REPLACE VIEW vw_exhibitions AS
SELECT
    e.id AS exhibition_id,
    e.curator_id,
    e.title,
    e.description,
    e.start_date AS exhibition_start_date,
    e.status AS exhibition_status,
    e.theme,
    a.status AS auction_status,
    count(w.id) AS amount_works
FROM
    exhibition AS e
    JOIN auction AS a ON a.exhibition_id = e.id
    JOIN work AS w ON w.exhibition_id = e.id
GROUP BY
    e.id,
    e.curator_id,
    e.title,
    e.description,
    e.start_date,
    e.status,
    e.theme,
    a.status
    --Список ставок
CREATE OR REPLACE VIEW vw_bids AS
SELECT
    b.id AS bid_id,
    b.lot_id,
    b.user_id,
    b.amount,
    b.created_at,
    u.email,
    u.full_name
FROM
    bid AS b
    JOIN users AS u ON u.id = b.user_id
    --Список виставок та аукціонів до них для пошуку(не впевнений як ми це будемо конкретно імплементувати, тому просто все сюди закину)
CREATE OR REPLACE VIEW vw_search_exhibitions_auctions AS
SELECT
    e.id AS exhibition_id,
    e.curator_id,
    a.id AS auction_id,
    e.title,
    e.description,
    e.start_date AS exhibition_start_date,
    e.status,
    e.theme,
    u.full_name,
    a.start_date AS auction_start_date,
    a.end_date AS auction_end_date,
    string_agg(t.name, ', ') tags
FROM
    exhibition AS e
    JOIN users AS u ON u.id = e.curator_id
    JOIN work AS w ON w.exhibition_id = w.id
    JOIN tag_work tw ON w.id = tw.work_id
    JOIN tag t ON tw.tag_id = t.id
    JOIN auction a ON a.exhibition_id = w.id
GROUP BY
    e.id,
    e.curator_id,
    a.id,
    e.title,
    e.description,
    e.start_date,
    e.status,
    e.theme,
    u.full_name,
    a.start_date,
    a.end_date