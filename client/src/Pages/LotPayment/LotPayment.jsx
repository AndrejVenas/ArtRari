import React, { useEffect, useState } from "react";
import "./LotPayment.css";
import axios from "axios";
import LotPaymentForm from "../../Components/Section/LotPaymentForm/LotPaymentForm";
import { useParams } from "react-router-dom";

const LotPayment = () => {
    const [lot, setLot] = useState({});
    const [bids, setBids] = useState([]);
    const {id} = useParams()

    const getLot = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/lots/${id}`);
            console.log("LOT:", response.data);
            setLot(response.data);
        } catch (e) {
            console.error("LOT ERROR:", e.response?.data || e.message);
        }
    };

    const getBid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/lots/${id}/bids`);
            console.log("BIDS:", response.data);
            setBids(response.data);
        } catch (e) {
            console.error("BIDS ERROR:", e.response?.data || e.message);
        }
    };

    useEffect(() => {
        getLot(id);
        getBid(id);
    }, []);

    return (
        <section className="auction-page">
            <div className="container">
                <div className="auction-grid">

                    <div className="auction-image">
                        <img
                            src={lot.artwork?.photoUrl}
                            alt={lot.artwork?.title}
                        />
                    </div>

                    <div className="auction-side">

                        <div className="auction-info">
                            <table>
                                <tbody>

                                <tr>
                                    <td>Ціна:</td>
                                    <td>${lot.currentPrice}</td>
                                </tr>

                                <tr>
                                    <td>Покупець:</td>
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

                        <LotPaymentForm id={id} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LotPayment;