import React from "react";
import Title from "../../Components/UI/title/Title";
import "./HistoryBuy.css";
import { useNavigate } from "react-router-dom";

const HistoryBuy = () => {
    const navigate = useNavigate();

    const mockHistory = [
        {
            id: 1,
            thumbnailUrl: "images/exhibition.png",
            title: "Impression Sunrise",
            price: 1200,
            author: "Claude Monet",
            tags: ["Impressionism", "Oil"],
            technique: "Oil on canvas",
            date: "2025-01-10",
            status: "Покупка успішна"
        },
        {
            id: 2,
            thumbnailUrl: "images/exhibition.png",
            title: "Starry Night",
            price: 3000,
            author: "Vincent van Gogh",
            tags: ["Post-Impressionism"],
            technique: "Oil on canvas",
            date: "2025-02-18",
            status: "Покупка успішна"
        },
        {
            id: 3,
            thumbnailUrl: "images/exhibition.png",
            title: "The Scream",
            price: 1800,
            author: "Edvard Munch",
            tags: ["Expressionism"],
            technique: "Oil, tempera",
            date: "2025-03-05",
            status: "Очікує підтвердження"
        }
    ];

    return (
        <section className="history-page">
            <div className="container">

                <Title title={"Історія покупок"} />

                <div className="history-list">

                    {mockHistory.map((item) => (
                        <div className="history-card" key={item.id}>
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="history-image"
                            />
                            {/* ТЕКСТ */}
                            <div className="history-left">

                                <h3 className="history-title">
                                    {item.title}
                                </h3>

                                <div className="history-info">

                                    <div className="history-block">
                                        <p>Ціна: {item.price} $</p>
                                        <p>Автор: {item.author}</p>
                                    </div>

                                    <div className="history-block">
                                        <p>Категорія: {item.tags.join(", ")}</p>
                                        <p>Техніка: {item.technique}</p>
                                    </div>

                                    <div className="history-block">
                                        <p>Дата: {item.date}</p>
                                        <p>Статус: {item.status}</p>
                                    </div>

                                </div>

                            </div>

                            {/* КНОПКА СПРАВА */}
                            <div className="history-action">

                                <button
                                    className="view-btn"
                                    onClick={() => navigate(`/work/${item.id}`)}
                                >
                                    Переглянути роботу
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default HistoryBuy;