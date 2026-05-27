import React, { useEffect, useState } from "react";
import "./LoginSection.css";
import Title from "../../UI/title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../../Actions/authAction";
import { useNavigate } from "react-router-dom";
import { useActiveContext } from "../../AppRouter";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector(state => state.Auth);

    const { active, setActive, message, setMessage } = useActiveContext();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

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

        // PASSWORD
        if (!form.password.trim()) {
            newErrors.password = "Введите пароль";
        } else if (form.password.length < 1) {
            newErrors.password = "Минимум 6 символов";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            setMessage("Заповніть усі поля!");
            setActive(true);
            return;
        }

        try {
            const { result, message } = await dispatch(signin(form));

            setMessage(message);
            setActive(true);

            if (result === 200) {
                navigate("/exhibitions");
            }

        } catch (error) {
            const serverMessage = error?.response?.data?.message || "Сталася помилка";

            setMessage(serverMessage);
            setActive(true);
        }
    };

    useEffect(() => {
        if (isAuth) {
            // navigate("/exhibitions")
        }
    }, []);

    return (
        <section className="login">
            <div className="container login-container">

                <div className="login-left">
                    <Title title="Вже повернулись?" />

                    <form className="login-form" onSubmit={handleSubmit}>

                        <Input
                            label="Поштова скринька *"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            error={errors.email}
                        />

                        <Input
                            label="Пароль *"
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