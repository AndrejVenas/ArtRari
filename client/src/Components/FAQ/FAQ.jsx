import React, { useState } from "react";
import "./FAQ.css";
import Title from "../title/Title";

const data = [
    {
        question: "Як взяти участь в аукціоні?",
        answer:
            "Зареєструйтесь на платформі, оберіть аукціон та зробіть свою ставку.",
    },
    {
        question: "Чи безпечні платежі?",
        answer:
            "Так, ми використовуємо перевірені платіжні системи та гарантуємо захист даних.",
    },
    {
        question: "Як відбувається доставка?",
        answer:
            "Після завершення аукціону ми організовуємо доставку через надійні служби.",
    },
    {
        question: "Чи можна повернути товар?",
        answer:
            "Умови повернення залежать від конкретного лоту та прописані в описі.",
    },
    {
        question: "Як зв’язатися з підтримкою?",
        answer:
            "Ви можете написати нам через форму зворотного зв’язку або email.",
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq">
            <div className="container faq-container">

                <div className="faq-left">
                    <Title title="Популярні питання"/>

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`faq-item ${
                                activeIndex === index ? "active" : ""
                            }`}
                        >
                            <div
                                className="faq-question"
                                onClick={() => toggle(index)}
                            >
                                {item.question}

                                <img
                                    src="images/icons/angle-down.svg"
                                    alt="arrow"
                                    className={`faq-icon ${
                                        activeIndex === index ? "open" : ""
                                    }`}
                                />
                            </div>

                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-right">
                    <img src="/images/FAQ.png" alt="FAQ" />
                </div>

            </div>
        </section>
    );
};

export default FAQ;