import React from "react";
import "./ProfileNavigation.css";
import Link from "../../UI/link/Link";
import Title from "../../UI/title/Title";
import { ABOUT_US, AUCTIONS, CREATE_EXHIBITION, EXHIBITIONS, MAIN, WORK_UPLOAD } from "../../../constants";

const ProfileNavigation = () => {
    return (
        <div className={"ProfileNavigation-wrapper"}>
            <Title title={"Навігація"}/>
            <div className="ProfileNavigation">
                <div className="ProfileNavigation-col">
                    <Link href={CREATE_EXHIBITION} text={"Перейти до створення виставки"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Перейти до перегляду та редагування своїх робот"}
                          className={"ProfileNavigation-link"}/>
                    <Link href={WORK_UPLOAD} text={"Завантажити роботу"} className={"ProfileNavigation-link"}/>
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