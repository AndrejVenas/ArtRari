import React, { useState } from "react";
import "./LoginSection.css";
import Title from "../../UI/title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        // убираем ошибку при вводе
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    const validate = () => {
        const newErrors = {
            email: !form.email.includes("@"),
            password: form.password.length < 6,
        };

        setErrors(newErrors);

        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log(form);
        } else {
            console.log("Ошибка валидации");
        }
    };

    return (
        <section className="login">
            <div className="container login-container">

                <div className="login-left">
                    <Title title="Вже повернулись?" />

                    <form className="login-form" onSubmit={handleSubmit}>

                        <Input
                            label="Поштова скринька"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            error={errors.email}
                        />

                        <Input
                            label="Пароль"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                        />

                        <p className="login-text">
                            Немає акаунту?{" "}
                            <a className="text-link" href="/registration">
                                Зареєструватися
                            </a>
                        </p>

                        <Button type="submit">
                            Увійти
                        </Button>
                    </form>

                </div>

                <div className="login-right">
                    <img
                        className="autorization-img"
                        src="/images/login-img.png"
                        alt="login img decorative"
                    />
                </div>

            </div>
        </section>
    );
};

export default Login;