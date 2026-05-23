import React, { useEffect, useState } from "react";
import Title from "../../Components/UI/title/Title";
import "./HistoryBuy.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const HistoryBuy = () => {
    const navigate = useNavigate();
    const {state} = useLocation()
    const [lot, setLot] = useState([])
    const getLot = async () => {
        try {
            console.log(state.history)
            const ids = state.history?.map((item) => item.id)
            for(let id of ids) {
                const response = await api.get(`/lots/${id}`)
                console.log(response.data)
                setLot(prev => ([...prev, response.data]))
            }
        } catch(error) {
            console.log(error)
        }
    }
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
    useEffect(() => {
        getLot()
    }, [])
    return (
        <section className="history-page">
            <div className="container">

                <Title title={"Історія покупок"} />

                <div className="history-list">

                    {lot.map((item) => (
                        <div className="history-card" key={item.id}>
                            <img
                                src={item.artwork.photoUrl}
                                alt={item.artwork.title}
                                className="history-image"
                            />
                            {/* ТЕКСТ */}
                            <div className="history-left">

                                <h3 className="history-title">
                                    {item.artwork.title}
                                </h3>

                                <div className="history-info">

                                    <div className="history-block">
                                        <p>Ціна: {item.currentPrice} $</p>
                                        <p>Автор: {item.artwork.author}</p>
                                    </div>

                                    <div className="history-block">
                                        <p>Категорія: {item.artwork.tags.join(", ")}</p>
                                        <p>Техніка: {item.artwork.technique}</p>
                                    </div>

                                    <div className="history-block">
                                        <p>Дата: {item.artwork.creationDate}</p>
                                        <p>Статус: {item.artwork.status}</p>
                                    </div>

                                </div>

                            </div>

                            {/* КНОПКА СПРАВА */}
                            {/*<div className="history-action">

                                <button
                                    className="view-btn"
                                    onClick={() => navigate(`/lot/${item.id}`)}
                                >
                                    Переглянути роботу
                                </button>

                            </div>*/}

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default HistoryBuy;