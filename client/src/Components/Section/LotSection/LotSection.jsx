import React, { useEffect, useState } from "react";
import "./LotSection.css";
import Title from "../../UI/title/Title";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AuctionPage = () => {
    const [lot, setLot] = useState({})
    const [bids, setBids] = useState([])
    const {title, id, idOfLot} = useParams()

    const getLot = async (id) => {
        const response = await axios.get(`http://localhost:8080/lots/${id}`)
        setLot(response.data)
    }

    const getBid = async (id) => {
        const response = await axios.get(`http://localhost:8080/lots/${id}/bids`)
        setBids(response.data)
    }
    
    useEffect(() => {
        getLot(idOfLot)
        getBid(idOfLot)
    }, [idOfLot])
    const navigate = useNavigate()
    const calculateDate = (endDate) => {
        const now = Date.now()
        const end = new Date(endDate)

        const day = Math.floor((end - now) / (1000 * 60 * 60 * 24))
        const hour = Math.floor((end - now) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        return `${day} днів ${hour} години`
    }
    return (
        <section className="auction-page">
            <div className="container">
                <div className="auction-grid">

                    {/* Левая колонка */}
                    <div className="auction-image">
                        <img
                            src={lot.artwork?.photoUrl}
                            alt={lot.artwork?.title}
                        />
                    </div>

                    {/* Правая колонка */}
                    <div className="auction-side">

                        <div className="auction-info">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Залишилось часу:</td>
                                    <td>{calculateDate(lot.endDate)}</td>
                                </tr>
                                <tr>
                                    <td>Стартова ціна:</td>
                                    <td>${lot.currentPrice}</td>
                                </tr>
                                <tr>
                                    <td>Поточна ставка:</td>
                                    <td>${bids[0]?.amount}</td>
                                </tr>
                                <tr>
                                    <td>Автор ставки:</td>
                                    <td>{bids[0]?.user}</td>
                                </tr>
                                <tr>
                                    <td>Назва роботи:</td>
                                    <td>{lot.artwork?.title}</td>
                                </tr>
                                <tr>
                                    <td>Комісія:</td>
                                    <td>10%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Блок ставки */}
                        <div className="auction-bid">
                            <label className="checkbox">
                                <input type="checkbox" />
                                Я прочитав правила використання та згоден з
                                обробкою персональних даних
                            </label>

                            <a href="#" className="text-link auction-link">
                                Правила використання
                            </a>

                            <div className="bid-controls">
                                <input type="text" defaultValue="100$" />
                                <button>Зробити ставку</button>
                            </div>

                            <p className="note">
                                ціна з урахуванням комісії 110$
                            </p>
                        </div>
                    </div>

                    <div className="auction-description">
                        <Title title={lot.artwork?.title}/>

                        <div className="desc-grid">
                            <p>
                                {lot.artwork?.description}
                            </p>

                            <p>
                                Робота запрошує глядача зупинитися, прислухатися
                                до власних думок і знайти особистий сенс у
                                напівпрозорих образах. Вона стане не лише
                                естетичним акцентом простору, а й джерелом
                                внутрішнього діалогу.
                            </p>
                        </div>

                        <div className="tags">
                            {lot.artwork?.tags.map((item) => {
                                return <span>{item}</span>
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AuctionPage;