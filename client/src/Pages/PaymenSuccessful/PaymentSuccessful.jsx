import React from 'react'
import './PaymentSuccesful.css'
import Title from "../../Components/UI/title/Title";

const PaymentSuccessful = () => {
    return (
        <>
            <div className="payment-successful-wrapper">
                <div className="container">
                    <div className="payment-successful">
                        <div className="payment-successful-box">
                            <Title title={"Оплата успішна!"} />
                            <p className="payment-successful-text">
                                Вітаємо вас з покупкою!
                            </p>
                            <p className="payment-successful-text">
                                Згодом усі деталі з’являться у вашому особистому кабінеті.
                            </p>
                            <p className="payment-successful-text">
                                А поки що перейти до <a className={"text-link"} href="/">головної сторінки</a> або до <a
                                href="/profile" className="text-link">особистого кабінету</a>.
                            </p>
                        </div>
                        <div className="payment-successful-box">
                            <img className="payment-successful-img" src="/images/icons/money.svg" alt=""/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccessful