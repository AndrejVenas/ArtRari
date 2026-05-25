import React, { useEffect, useState } from "react";
import Title from "../../Components/UI/title/Title";
import "./HistoryBuy.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api/axiosInstance";
import Button from "../../Components/UI/Button/Button";

const HistoryBuy = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.Auth);

    const [lot, setLot] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLot = async () => {
        try {
            const response = await api.get("/purchases/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const purchases = response.data.purchases;

            const lotsData = await Promise.all(
                purchases.map(async (item) => {
                    const res = await api.get(`/lots/${item.lotId}`);

                    return {
                        ...res.data,
                        purchaseStatus: item.status,
                    };
                })
            );

            setLot(lotsData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getLot();
        }
    }, [token]);

    if (loading) {
        return (
            <section className="history-page">
                <div className="container">
                    <Title title={"Історія покупок"} />
                    <p>Завантаження...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="history-page">
            <div className="container">

                <Title title={"Історія покупок"} />

                <div className="history-list">

                    {lot.length === 0 ? (
                        <p>У вас поки немає покупок</p>
                    ) : (
                        lot.map((item) => (
                            <div className="history-card" key={item.id}>

                                <img
                                    src={item.artwork.photoUrl}
                                    alt={item.artwork.title}
                                    className="history-image"
                                />

                                <div className="history-left">

                                    <h3 className="history-title">
                                        {item.artwork.title}
                                    </h3>

                                    <div className="history-left-inner">

                                        <div className="history-info">

                                            <div className="history-block">
                                                <p>Ціна: {item.currentPrice} $</p>
                                                <p>Автор: {item.artwork.author}</p>
                                            </div>

                                            <div className="history-block">
                                                <p>
                                                    Категорія:{" "}
                                                    {item.artwork.tags?.join(", ")}
                                                </p>
                                                <p>
                                                    Техніка:{" "}
                                                    {item.artwork.technique}
                                                </p>
                                            </div>

                                            <div className="history-block">
                                                <p>
                                                    Дата:{" "}
                                                    {item.artwork.creationDate}
                                                </p>
                                                <p>
                                                    Статус:{" "}
                                                    {item.purchaseStatus}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="button-block">
                                            {item.purchaseStatus === "pending_payment" && (
                                                <Button
                                                    onClick={() =>
                                                        navigate(`/lotPayment/${item.id}`)
                                                    }
                                                >
                                                    Сплатити товар
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>
        </section>
    );
};

export default HistoryBuy;