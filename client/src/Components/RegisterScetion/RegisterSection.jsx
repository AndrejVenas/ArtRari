import React, { useState } from "react";
import "./RegisterSection.css";
import Title from "../title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import CodeInput from "../CodeInput/CodeInput";

const stepAssets = {
    1: "/images/register-step1.png",
    2: "/images/register-step2.png",
    3: "/images/register-step3.png",
};

const Register = () => {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        code: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const setCode = (val) => {
        setForm((prev) => ({
            ...prev,
            code: val,
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

        if (step === 3) {
            console.log("REGISTER DATA:", form);
        } else {
            nextStep();
        }
    };

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
                                    Крок {step} з 3
                                </p>


                                <Input
                                    label="Ім'я"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Іван"
                                />

                                <Input
                                    label="Прізвище"
                                    name="surname"
                                    value={form.surname}
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
                                    Крок {step} з 3
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
                                    value={form.code}
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

                            <Button type="submit">
                                {step === 3 ? "Зареєструватись" : "Далі"}
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