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
        email: false,
        password: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuth} = useSelector(state => state.Auth)
    const {active, setActive, message, setMessage} = useActiveContext()
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

<<<<<<< HEAD
    const login = async () => {
        const {result, message} = await dispatch(signin(form))
        if(result == 200) {
            setMessage(message)
            navigate("/exhibitions")
            setActive(true)
        } else {
            setMessage(message)
            setActive(true)
=======
    const login = () => {
        dispatch(signin(form))
    }

    useEffect(() => {
        if(isAuth) {
            // navigate("/exhibitions")
>>>>>>> b0d189066856ab552dbea74389cd5ba1c9e224d9
        }
    }
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

                        <Button type="submit" onClick={login}>
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