import React from "react";
import "./ProfileNavigation.css";
import Link from "../../UI/link/Link";
import Title from "../../UI/title/Title";
import {
    ABOUT_US, AUCTIONS, CREATE_EXHIBITION, EXHIBITIONS,
    HISTORY_BUY, MAIN, MY_AUCTIONS, MY_EXHIBITIONS, MY_WORK, WORK_UPLOAD
} from "../../../constants";
import { useSelector } from "react-redux";

const ProfileNavigation = () => {
    const {role} = useSelector(state => state.Auth)
    return (
        <div className={"ProfileNavigation-wrapper"}>
            <Title title={"Навігація"}/>
            <div className="ProfileNavigation">
                <div className="ProfileNavigation-col">
                    {role == "curator" ? 
                    <>
                    <Link href={CREATE_EXHIBITION} text={"Перейти до створення виставки"} className={"ProfileNavigation-link"}/>
                    <Link href={MY_EXHIBITIONS} text={"Перейти до перегляду та редагування своїх виставок"} className={"ProfileNavigation-link"}/>
                    <Link href={MY_AUCTIONS} text={"Перейти до перегляду та редагування своїх аукціонів"} className={"ProfileNavigation-link"}/>
                    </>
                    :
                    <>
                    <Link href={MY_WORK} text={"Перейти до перегляду та редагування своїх робот"}
                          className={"ProfileNavigation-link"}/>
                    <Link href={WORK_UPLOAD} text={"Завантажити роботу"} className={"ProfileNavigation-link"}/>
                    <Link href={HISTORY_BUY} text={"Мої замовлення"} className={"ProfileNavigation-link"}/>
                    </>
                    }
                </div>
                <div className="ProfileNavigation-col">
                    <Link href={MAIN} text={"Головна"} className={"ProfileNavigation-link"}/>
                    <Link href={ABOUT_US} text={"Про нас"} className={"ProfileNavigation-link"}/>
                    <Link href={AUCTIONS} text={"Аукціони"} className={"ProfileNavigation-link"}/>
                    <Link href={EXHIBITIONS} text={"Виставки"} className={"ProfileNavigation-link"}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileNavigation;