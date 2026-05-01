import React from "react";
import "./LotSection.css";
import Title from "../../UI/title/Title";

const AuctionPage = () => {
    return (
        <section className="auction-page">
            <div className="container">
                <div className="auction-grid">

                    {/* Левая колонка */}
                    <div className="auction-image">
                        <img
                            src="/images/lot.jpg"
                            alt="Тиша, що пам’ятає світло"
                        />
                    </div>

                    {/* Правая колонка */}
                    <div className="auction-side">

                        <div className="auction-info">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Залишилось часу:</td>
                                    <td>1 день 8 годин</td>
                                </tr>
                                <tr>
                                    <td>Стартова ціна:</td>
                                    <td>$500</td>
                                </tr>
                                <tr>
                                    <td>Поточна ставка:</td>
                                    <td>$545</td>
                                </tr>
                                <tr>
                                    <td>Автор ставки:</td>
                                    <td>Іван П.</td>
                                </tr>
                                <tr>
                                    <td>Назва роботи:</td>
                                    <td>Тиша, що пам’ятає світло</td>
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
                        <Title title={"Тиша, що пам’ятає світло"}/>

                        <div className="desc-grid">
                            <p>
                                Цей витвір мистецтва — тонка розмова між світлом
                                і спогадами, зафіксована у шарі часу. Полотно
                                ніби дихає спокоєм: м’які переходи кольорів
                                створюють відчуття ранкового туману, в якому
                                губляться силуети минулого.
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
                            <span>Тип: Живопис</span>
                            <span>Країна: Італія</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AuctionPage;