import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";
import Title from "../../Components/UI/title/Title";
import ProfileNavigation from "../../Components/Section/ProfileNavigation/ProfileNavigation";
import ProfileAction from "../../Components/Section/ProfileAction/ProfileAction";
import ProfileField from "../../Components/UI/ProfileField/ProfileField";
import { useSelector } from "react-redux";

const USE_API = false;

const ProfilePage = () => {
    const {firstName, lastName, email} = useSelector(state => state.Auth)
    const [user, setUser] = useState({
        firstName: firstName?.length > 0 ? firstName : "",
        lastName: lastName?.length > 0 ? lastName : "",
        email: email?.length > 0 ? email : ""
    });

    const [stats, setStats] = useState({
        bids: 0,
        wins: 0,
        works: 0,
        exhibitions: 0,
        auctions: 0
    });

    const mockUser = {
        firstName: "Іван",
        lastName: "Петренко",
        email: "example@gmail.com"
    };

    const mockStats = {
        bids: 10,
        wins: 2,
        works: 2,
        exhibitions: 2,
        auctions: 2
    };

    useEffect(() => {
        if (USE_API) {
            getProfile();
            getStats();
        } else {
            // 🔥 работаем без сервера
            //setUser(mockUser);
            setStats(mockStats);
        }
    }, []);

    // 🔸 заготовки под backend
    const getProfile = async () => {
        try {
            const res = await axios.get("/api/profile");
            setUser(res.data);
        } catch (e) {
            console.error("Profile API error:", e);
        }
    };

    const getStats = async () => {
        try {
            const res = await axios.get("/api/profile/stats");
            setStats(res.data);
        } catch (e) {
            console.error("Stats API error:", e);
        }
    };

    return (
        <section className="profile-page">
            <div className="container">

                <div className="profile-grid">

                    {/* Левая колонка */}
                    <div>
                        <Title title={"Особистий кабінет"}/>

                        <ProfileField
                            label="Ім'я"
                            name="firstName"
                            value={user.firstName}
                            onSave={(name, value) => {
                                setUser(prev => ({ ...prev, [name]: value }));
                            }}
                        />

                        <ProfileField
                            label="Прізвище"
                            name="lastName"
                            value={user.lastName}
                            onSave={(name, value) => {
                                setUser(prev => ({ ...prev, [name]: value }));
                            }}
                        />

                        <ProfileField
                            label="Пошта"
                            name="email"
                            value={user.email}
                            onSave={(name, value) => {
                                setUser(prev => ({ ...prev, [name]: value }));
                            }}
                        />

                    </div>

                    {/* Правая колонка */}
                    <div>
                        <Title title={"Статистика"}/>

                        <div className="stats-box">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Кількість ставок:</td>
                                    <td>{stats.bids}</td>
                                </tr>
                                <tr>
                                    <td>Кількість перемог:</td>
                                    <td>{stats.wins}</td>
                                </tr>
                                <tr>
                                    <td>Кількість робіт:</td>
                                    <td>{stats.works}</td>
                                </tr>
                                <tr>
                                    <td>Виставки:</td>
                                    <td>{stats.exhibitions}</td>
                                </tr>
                                <tr>
                                    <td>Аукціони:</td>
                                    <td>{stats.auctions}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <ProfileNavigation/>
                <ProfileAction/>

            </div>
        </section>
    );
};

export default ProfilePage;