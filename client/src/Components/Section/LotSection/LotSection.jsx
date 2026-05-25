import React, { useEffect, useMemo, useState } from "react";
import "./LotSection.css";
import Title from "../../UI/title/Title";
import { useLocation, useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";
import AuctionBid from "../AuctionBid/AuctionBid";
import { subscribeToLotBids } from "../../../socketClient";
import { useSelector } from "react-redux";

const AuctionPage = () => {
    const [lot, setLot] = useState({});
    const [bids, setBids] = useState([]);
    const [work, setWork] = useState({});
    const [timeLeft, setTimeLeft] = useState("");

    const { idOfLot, idOfWork } = useParams();
    const location = useLocation();
    const {token, role} = useSelector(state => state.Auth)

    const getLot = async (id) => {
        const res = await api.get(`/lots/${id}`);
        setLot(res.data);
        setLot(prev => ({...prev, startDate: res.data.endDate}))
    };

    const getWork = async (id) => {
        const res = await api.get(`/artworks/${id}`);
        setWork(res.data);
        setWork(prev => ({...prev, startDate: res.data.endDate}))
    };

    const getBids = async (id) => {
        const res = await api.get(`/lots/${id}/bids`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setBids(res.data || []);
    };

    useEffect(() => {
        if (!idOfLot) {
            getWork(idOfWork);
            return;
        }

        getLot(idOfLot);
        getBids(idOfLot);
    }, [idOfLot, idOfWork]);

    useEffect(() => {
        if (!idOfLot) return;

        const disconnect = subscribeToLotBids(idOfLot, (newBid) => {
            setBids((prev) => {
                const normalizedNew = {
                    ...newBid,
                    amount: Number(newBid.amount),
                };

                const exists = prev.some(b =>
                    b.amount === normalizedNew.amount &&
                    b.user === normalizedNew.user
                );

                if (exists) return prev;

                return [...prev, normalizedNew];
            });
        });

        return () => disconnect();
    }, [idOfLot]);

    const currentPrice = useMemo(() => {
        if (!bids.length) return Number(lot.currentPrice) || 0;

        return Math.max(
            ...bids.map(b => Number(b.amount) || 0)
        );
    }, [bids, lot.currentPrice]);

    const topBid = useMemo(() => {
        if (!bids.length) return null;

        return [...bids].sort(
            (a, b) => Number(b.amount) - Number(a.amount)
        )[0];
    }, [bids]);

    useEffect(() => {
        if (!lot?.endDate) return;

        const updateTimer = () => {
            const now = Date.now();
            const end = new Date(lot.status == "scheduled" ? lot.startDate : lot.endDate).getTime();
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft("Аукціон завершено");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            if (days < 2) {
                setTimeLeft(
                    `${String(hours).padStart(2, "0")}:` +
                    `${String(minutes).padStart(2, "0")}:` +
                    `${String(seconds).padStart(2, "0")}`
                );
            } else {
                setTimeLeft(`${days} днів ${hours} годин`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [lot?.endDate]);

    return (
        <section className="auction-page">
            <div className="container">
                <div className="auction-grid">

                    {/* IMAGE */}
                    <div className="auction-image">
                        <img
                            src={idOfLot ? lot.artwork?.photoUrl : work.photoUrl}
                            alt={idOfLot ? lot.artwork?.title : work.title}
                        />
                    </div>

                    {/* INFO */}
                    <div className="auction-side">

                        <div className="auction-info">
                            <table>
                                <tbody>
                                {work.status == "scheduled" && 
                                <tr>
                                    <td>Старт аукціону:</td>
                                    <td>{work.startDate}</td>
                                </tr>
                                }
                                {idOfLot && lot.status != "scheduled" ? (
                                    <tr>
                                        <td>Залишилось часу:</td>
                                        <td>{timeLeft}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td>Автор:</td>
                                        <td>{work.author}</td>
                                    </tr>
                                )}

                                {idOfLot ? (
                                    <>
                                        <tr>
                                            <td>Стартова ціна:</td>
                                            <td>${Number(lot.startPrice) || 0}</td>
                                        </tr>

                                        <tr>
                                            <td>Поточна ставка:</td>
                                            <td>${currentPrice}</td>
                                        </tr>

                                        <tr>
                                            <td>Автор ставки:</td>
                                            <td>{topBid?.user || "-"}</td>
                                        </tr>

                                        <tr>
                                            <td>Назва роботи:</td>
                                            <td>{lot.artwork?.title}</td>
                                        </tr>

                                        <tr>
                                            <td>Комісія:</td>
                                            <td>10%</td>
                                        </tr><tr>
                                            <td>Крок:</td>
                                            <td>{lot.step} $</td>
                                        </tr>
                                    </>
                                ) : (
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
                                )}

                                </tbody>
                            </table>
                        </div>

                        {/* BID FORM */}
                        {idOfLot && ((role != "curator" && role == "user") && lot.status != "scheduled") ? (
                            <AuctionBid
                                id={idOfLot}
                                navigateToPage={location.pathname}
                            />
                        ) : (
                            <div className="auction-description">
                                <Title title={Object.keys(work).length == 0 ? lot.artwork?.title : work.title} />

                                <div className="desc-grid">
                                    <p>{Object.keys(work).length == 0 ? lot.artwork?.description : work.description}</p>
                                </div>

                                <div className="tags">
                                {Object.keys(work).length == 0 ?
                                    lot.artwork?.tags?.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))
                                :
                                    work.tags?.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    {idOfLot && role != "curator" && (
                        <div className="auction-description">
                            <Title title={lot.artwork?.title} />

                            <div className="desc-grid">
                                <p>{lot.artwork?.description}</p>
                            </div>

                            <div className="tags">
                                {lot.artwork?.tags?.map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default AuctionPage;