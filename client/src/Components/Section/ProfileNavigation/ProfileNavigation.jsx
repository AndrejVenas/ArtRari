import React from "react";
import "./ProfileNavigation.css";
import Link from "../../UI/link/Link";
import Title from "../../UI/title/Title";

const ProfileNavigation = () => {
    return (
        <div className={"ProfileNavigation-wrapper"}>
            <Title title={"Навігація"}/>
            <div className="ProfileNavigation">
                <div className="ProfileNavigation-col">
                    <Link href={"#"} text={"Перейти до створення аукціону"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Перейти до створення виставки"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Перейти до перегляду та редагування своїх робот"}
                          className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Завантажити роботу"} className={"ProfileNavigation-link"}/>
                </div>
                <div className="ProfileNavigation-col">
                    <Link href={"#"} text={"Головна"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Про нас"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Аукціони"} className={"ProfileNavigation-link"}/>
                    <Link href={"#"} text={"Виставки"} className={"ProfileNavigation-link"}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileNavigation;