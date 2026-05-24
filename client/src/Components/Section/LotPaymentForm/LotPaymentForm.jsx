import api from "../../../api/axiosInstance";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Message from "../../UI/Message/Message";
import { useNavigate } from "react-router-dom";
import { PAYMENT_SUCCESSFUL } from "../../../constants";
import Input from "../../UI/Input/Input";
import "./LotPaymentForm.css";

const AuctionBid = ({ id }) => {
    const [card, setCard] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiry, setExpiry] = useState("");

    const { token } = useSelector((state) => state.Auth);

    const [checked, setChecked] = useState(false);
    const [checkedCheckBox, setCheckedCheckBox] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleCardChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.substring(0, 16);

        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

        setCard(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }

        setExpiry(value);
    };

    const bidAuction = async (id) => {
        if (!checkedCheckBox) {
            setMessage("Прийміть правила використання.");
            setChecked(true);
            return;
        }

        if (!card || !cvv || !expiry) {
            setMessage("Заповніть всі поля.");
            setChecked(true);
            return;
        }

        if (card.length !== 19) {
            setMessage("Номер карти повинен містити 16 цифр.");
            setChecked(true);
            return;
        }

        if (cvv.length !== 3) {
            setMessage("CVV повинен містити 3 цифри.");
            setChecked(true);
            return;
        }

        if (expiry.length !== 5) {
            setMessage("Термін дії повинен бути у форматі MM/YY.");
            setChecked(true);
            return;
        }

        try {
            await api.post(
                `/pay/lots/${id}`,
                {
                    card,
                    cvv,
                    expiry,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChecked(true);
            setMessage("Оплата пройшла успішно.");

            setTimeout(() => {
                navigate(PAYMENT_SUCCESSFUL);
            }, 3000);
        } catch (error) {
            console.log(error.response);

            setChecked(true);
            setMessage("Помилка при оплаті.");
        }
    };

    return (
        <div className="auction-bid">

            <label className="checkbox">
                <input
                    type="checkbox"
                    onChange={(event) =>
                        setCheckedCheckBox(event.target.checked)
                    }
                />

                Я прочитав правила використання та згоден з
                обробкою персональних даних
            </label>

            <a href="#" className="text-link auction-link">
                Правила використання
            </a>

            <div className="payment-grid">

                <Input
                    label="Карта"
                    placeholder="**** **** **** ****"
                    value={card}
                    onChange={handleCardChange}
                />

                <Input
                    label="CVV"
                    placeholder="***"
                    value={cvv}
                    onChange={handleCvvChange}
                />

                <Input
                    label="Термін дії"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                />

                <button
                    className="pay-button"
                    onClick={() => bidAuction(id)}
                >
                    Сплатити
                </button>

            </div>

            <Message
                flag={checked}
                setFlag={setChecked}
                message={message}
            />
        </div>
    );
};

export default AuctionBid;