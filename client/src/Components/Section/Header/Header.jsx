import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Menu from '../../Menu/Menu'
import Profile from '../../Profile/Profile'
import light from '../../../Images/light.svg'
import './style.css'

const Header = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // закрываем меню при смене маршрута
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // блокировка скролла без прыжка
    useEffect(() => {
        if (open) {
            const scrollBarWidth =
                window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [open]);

    return (
        <header className="header">

            {/* Подложка */}
            <div
                className={`header-overlay ${open ? "active" : ""}`}
                onClick={() => setOpen(false)}
            />

            <div className="header__container">
                <div className="header__items items">

                    {/* Бургер */}
                    <button
                        className={`burger ${open ? "active" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="items_light light">
                        <img src={light} alt="light" className="light__image" />
                    </div>

                    {/* Меню */}
                    <div className={`mobile-menu ${open ? "active" : ""}`}>
                        <Menu />
                    </div>

                    <div className="items__profile profile">
                        <Profile />
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header