import React, { useState } from "react";
import "./RegisterSection.css";
import Title from "../../UI/title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import CodeInput from "../../UI/CodeInput/CodeInput";
import { signup } from "../../../Actions/authAction";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Message from "../../UI/Message/Message";
import { useActiveContext } from "../../AppRouter";

const stepAssets = {
    1: "/images/register-step1.png",
    2: "/images/register-step2.png",
    3: "/images/register-step3.png",
};

const Register = () => {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        //code: "",
    });
    const {active, setActive, message, setMessage} = useActiveContext()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const setCode = (val) => {
        setForm((prev) => ({
            ...prev,
            //code: val,
        }));
    };

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 2) {
            console.log("REGISTER DATA:", form);
        } else {
            nextStep();
        }
    };

    const clickRegistration = async () => {
        if(step == 2) {
            const {message, result} = await dispatch(signup(form))
            if(result == 200) {
                navigate("/login")
                setMessage(message)
                setActive(true)
            } else {
                setMessage(message)
                setActive(true)
            }
            console.log(message, result)
        }
    }
    return (
        <section className="register">
            <div className="container register-container">

                {/* LEFT SIDE */}
                <div className="register-left">

                    <form className="register-form" onSubmit={handleSubmit}>

                        {/* STEP 1 */}
                        {step === 1 && (
                            <>
                                <Title title="Ласкаво просимо до нашого клубу!" />

                                <p className="register-step">
                                    Крок {step} з 2
                                </p>


                                <Input
                                    label="Ім'я"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="Іван"
                                />

                                <Input
                                    label="Прізвище"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Іванов"
                                />

                                <p className="register-text">
                                    Вже є акаунт?{" "}
                                    <a className="text-link" href="/login">
                                        Увійти
                                    </a>
                                </p>
                            </>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <>
                                <Title title="Залишилось ще трохи" />

                                <p className="register-step">
                                    Крок {step} з 2
                                </p>

                                <Input
                                    label="Поштова скринька"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                />

                                <Input
                                    label="Номер телефону"
                                    name="phone"
                                    type="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+380671234678"
                                />

                                <Input
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />

                                <p className="register-text">
                                    Вже є акаунт?{" "}
                                    <a className="text-link" href="/login">
                                        Увійти
                                    </a>
                                </p>
                            </>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <>
                                <Title title="Введіть отриманий код із пошти" />

                                <p className="register-step">
                                    Крок {step} з 3
                                </p>


                                <CodeInput
                                    length={6}
                                    value={0}
                                    onChange={setCode}
                                />

                                <p className="register-text">
                                    Не отримали пароль?{" "}
                                    <a className="text-link" href="#">
                                        Відправити ще раз
                                    </a>
                                </p>
                            </>
                        )}

                        {/* BUTTONS */}
                        <div className="register-buttons">

                            {step > 1 && (
                                <Button type="button" onClick={prevStep}>
                                    Назад
                                </Button>
                            )}

                            <Button type="submit" onClick={clickRegistration}>
                                {step === 2 ? "Зареєструватись" : "Далі"}
                            </Button>

                        </div>

                    </form>
                </div>

                {/* RIGHT SIDE */}
                <div className="register-right">
                    <img
                        src={stepAssets[step]}
                        alt="register step"
                        className="register-img"
                    />
                </div>

            </div>
        </section>
    );
};

export default Register;