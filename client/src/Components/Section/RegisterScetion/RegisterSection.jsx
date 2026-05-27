import React, { useState } from "react";
import "./RegisterSection.css";
import Title from "../../UI/title/Title";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import CodeInput from "../../UI/CodeInput/CodeInput";
import { signup } from "../../../Actions/authAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useActiveContext } from "../../AppRouter";

const stepAssets = {
    1: "/images/register-step1.png",
    2: "/images/register-step2.png",
    3: "/images/register-step3.png",
};

const Register = () => {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        code: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        code: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setActive, setMessage } = useActiveContext();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const setCode = (val) => {
        setForm((prev) => ({
            ...prev,
            code: val,
        }));

        setErrors((prev) => ({
            ...prev,
            code: "",
        }));
    };

    const validateStep = () => {
        let newErrors = {};

        // STEP 1
        if (step === 1) {
            if (!form.firstName.trim()) {
                newErrors.firstName = "Введіть ім'я";
            }

            if (!form.lastName.trim()) {
                newErrors.lastName = "Введіть прізвище";
            }
        }

        // STEP 2
        if (step === 2) {
            if (!form.email.trim()) {
                newErrors.email = "Введіть email";
            } else if (!form.email.includes("@")) {
                newErrors.email = "Некоректний email";
            }

            if (!form.phone.trim()) {
                newErrors.phone = "Введіть номер телефону";
            }

            if (!form.password.trim()) {
                newErrors.password = "Введіть пароль";
            } else if (form.password.length < 2) {
                newErrors.password = "Мінімум 6 символів";
            }
        }

        // STEP 3
        if (step === 3) {
            if (!form.code || form.code.length < 6) {
                newErrors.code = "Введіть код із 6 символів";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) {
            setMessage("Будь ласка, заповніть усі поля правильно");
            setActive(true);
            return;
        }

        // STEP 1
        if (step === 1) {
            setStep(2);
            return;
        }

        // STEP 2
        if (step === 2) {
            const { message, result } = await dispatch(signup(form));

            setMessage(message);
            setActive(true);

            navigate("/login");
            // setStep(3);

            return;
        }

        // STEP 3
        if (step === 3) {
            setMessage("Код підтверджено");
            setActive(true);
            navigate("/login");
        }
    };

    return (
        <section className="register">
            <div className="container register-container">

                <div className="register-left">

                    <form className="register-form" onSubmit={handleSubmit}>

                        {/* STEP 1 */}
                        {step === 1 && (
                            <>
                                <Title title="Ласкаво просимо до нашого клубу!" />

                                <p className="register-step">Крок 1 з 3</p>

                                <Input
                                    label="Ім'я"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    placeholder="Іван"
                                    error={errors.firstName}
                                />

                                <Input
                                    label="Прізвище"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    placeholder="Іванов"
                                    error={errors.lastName}
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

                                <p className="register-step">Крок 2 з 3</p>

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
                                    label="Номер телефону"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+380671234678"
                                    error={errors.phone}
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
                            </>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <>
                                <Title title="Введіть код із пошти" />

                                <p className="register-step">Крок 3 з 3</p>

                                <CodeInput
                                    length={6}
                                    value={form.code}
                                    onChange={setCode}
                                />

                                {errors.code && (
                                    <p className="error-text">{errors.code}</p>
                                )}

                                <p className="register-text">
                                    Не отримали код?{" "}
                                    <a className="text-link" href="#">
                                        Надіслати ще раз
                                    </a>
                                </p>
                            </>
                        )}

                        <div className="register-buttons">

                            {step > 1 && (
                                <Button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                >
                                    Назад
                                </Button>
                            )}

                            <Button type="submit">
                                {step === 2 ? "Зареєструватись" : "Далі"}
                            </Button>

                        </div>

                    </form>
                </div>

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