import React, { useEffect, useState } from "react";
import "./LotSection.css";
import Title from "../../UI/title/Title";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuctionBid from "../AuctionBid/AuctionBid";

const AuctionPage = () => {
    const [lot, setLot] = useState({})
    const [bids, setBids] = useState([])
    const [work, setWork] = useState({})
    const {title, id, idOfLot, idOfWork} = useParams()

    const getLot = async (id) => {
        const response = await axios.get(`http://localhost:8080/lots/${id}`)
        setLot(response.data)
    }

    const getWork = async (id) => {
        const response = await axios.get(`http://localhost:8080/artworks/${id}`)
        setWork(response.data)
    }

    const getBid = async (id) => {
        const response = await axios.get(`http://localhost:8080/lots/${id}/bids`)
        setBids(response.data)
    }
    
    useEffect(() => {
        if(idOfLot) {
            getLot(idOfLot)
            getBid(idOfLot)
        } else {
            getWork(idOfWork)
        }
    }, [idOfLot, idOfWork])
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
                            src={idOfLot ? lot.artwork?.photoUrl : work.photoUrl}
                            alt={idOfLot ? lot.artwork?.title : work.title}
                        />
                    </div>

                    {/* Правая колонка */}
                    <div className="auction-side">

                        <div className="auction-info">
                            <table>
                                <tbody>
                                {idOfLot ? <tr>
                                    <td>Залишилось часу:</td>
                                    <td>{calculateDate(lot.endDate)}</td>
                                </tr> :
                                <tr>
                                    <td>Автор:</td>
                                    <td>{work.author}</td>
                                </tr>
                                }
                                {idOfLot ? 
                                <>
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
                                </>
                                :
                                <>
                                <tr>
                                    <td>Назва роботи:</td>
                                    <td>{work.title}</td>
                                </tr>
                                <tr>
                                    <td>Дата створення:</td>
                                    <td>{work.creationDate}</td>
                                </tr>
                                <tr>
                                    <td>Техніка:</td>
                                    <td>{work.technique}</td>
                                </tr>
                                </>
                                }
                                </tbody>
                            </table>
                        </div>
                        {idOfLot ? <AuctionBid /> : <div className="auction-description">
                        <Title title={idOfLot ? lot.artwork?.title: work.title}/>

                        <div className="desc-grid">
                            <p>
                                {idOfLot ? lot.artwork?.description : work.title}
                            </p>
                        </div>

                        <div className="tags">
                            {idOfLot ? lot.artwork?.tags.map((item) => {
                                return <span>{item}</span>
                            }) : work?.tags?.map((item) => {
                                return <span>{item}</span>
                            })}
                        </div>
                    </div>}
                    </div>

                    {idOfLot && <div className="auction-description">
                        <Title title={lot.artwork?.title}/>

                        <div className="desc-grid">
                            <p>
                                {lot.artwork?.description}
                            </p>
                        </div>

                        <div className="tags">
                            {lot.artwork?.tags.map((item) => {
                                return <span>{item}</span>
                            })}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default AuctionPage;