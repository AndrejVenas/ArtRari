import React, { useState } from "react";
import "./ContactFormSection.css";
import Title from "../../UI/title/Title";
import Input from "../../UI/Input/Input";
import Textarea from "../../UI/Textarea/Textarea";
import Button from "../../UI/Button/Button";
import { useActiveContext } from "../../AppRouter";

const Contact = () => {
    const [form, setForm] = useState({
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        message: "",
    });

    const { setActive, setMessage } = useActiveContext();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        // очищаем ошибку при вводе
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validate = () => {
        let newErrors = {};

        // EMAIL
        if (!form.email.trim()) {
            newErrors.email = "Введите email";
        } else if (!form.email.includes("@")) {
            newErrors.email = "Некорректный email";
        }

        // MESSAGE
        if (!form.message.trim()) {
            newErrors.message = "Введите сообщение";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            setMessage("Заповніть усі поля!");
            setActive(true);
            return;
        }

        console.log(form);

        setMessage("Повідомлення успішно відправлено!");
        setActive(true);

        // очистка формы
        setForm({
            email: "",
            message: "",
        });
    };

    return (
        <section
            className="contact"
            style={{ backgroundImage: `url("images/contactForm-bg.png")` }}
        >
            <div className="container contact-container">
                <Title title="Залишились питання?" />

                <form className="contact-form" onSubmit={handleSubmit}>

                    <Input
                        label="Поштова скринька"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        error={errors.email}
                    />

                    <Textarea
                        label="Повідомлення"
                        name="message"
                        placeholder="Ваше питання..."
                        value={form.message}
                        onChange={handleChange}
                        error={errors.message}
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