import React, { useState } from "react";
import "./ContactFormSection.css";
import Title from "../title/Title";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";

const Contact = () => {
    const [form, setForm] = useState({
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form); // пока просто вывод
    };

    return (
        <section
            className="contact"
            style={{ backgroundImage: `url("images/contactForm-bg.png")` }}
        >
            <div className="container contact-container">
                <Title title="Залишились питання?" />

                <form className="contact-form" onSubmit={handleSubmit}>
                    <Input label="Поштова скринька" name="email" type="email" value={form.email} onChange={handleChange} placeholder={"example@gmail.com"}/>

                    <Textarea
                        label="Повідомлення"
                        name="message"
                        placeholder="Ваше питання..."
                        value={form.message}
                        onChange={handleChange}
                    />

                    <Button type="submit">
                        Відправити
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Contact;