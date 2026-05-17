import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Message from "../../UI/Message/Message";
import { useNavigate } from "react-router-dom";
import { AUCTIONS } from "../../../constants";
import Input from "../../UI/Input/Input";
import "./LotPaymentForm.css";

const AuctionBid = ({ id }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [pin, setPin] = useState("");

    const { token } = useSelector((state) => state.Auth);

    const [checked, setChecked] = useState(false);
    const [checkedCheckBox, setCheckedCheckBox] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleCardChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

        setCardNumber(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 4) {
            setPin(value);
        }
    };

    const bidAuction = async (id) => {
        if (!checkedCheckBox) {
            setMessage("Прийміть правила використання.");
            setChecked(true);
            return;
        }

        if (!cardNumber || !cvv || !pin) {
            setMessage("Заповніть всі поля.");
            setChecked(true);
            return;
        }

        if (cardNumber.length !== 16) {
            setMessage("Номер карти повинен містити 16 цифр.");
            setChecked(true);
            return;
        }

        if (cvv.length !== 3) {
            setMessage("CVV повинен містити 3 цифри.");
            setChecked(true);
            return;
        }

        if (pin.length !== 4) {
            setMessage("PIN код повинен містити 4 цифри.");
            setChecked(true);
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/lots/${id}/bids`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChecked(true);
            setMessage("Оплата пройшла успішно.");

            setTimeout(() => {
                navigate(AUCTIONS);
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
                    value={cardNumber}
                    onChange={handleCardChange}
                />

                <Input
                    label="CVV"
                    placeholder="***"
                    value={cvv}
                    onChange={handleCvvChange}
                />

                <Input
                    label="Пін код"
                    placeholder="****"
                    value={pin}
                    onChange={handlePinChange}
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