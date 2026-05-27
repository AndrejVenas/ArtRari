import React from 'react'
import logo from '../../../Images/logo.svg'
import SocialLinks from '../../UI/social-links/SocialLinks.jsx'
import {arrayMenu} from '../../../Arrays/arrayMenu.js'
import {Link, useLocation} from 'react-router-dom'
import Search from '../../UI/Search/Search.jsx'
import './style.css'
import {MAIN} from "../../../constants";

const Footer = () => {
    const location = useLocation();
    const firstMenu = arrayMenu.slice(0, 2);
    const secondMenu = arrayMenu.slice(2, 4);
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <nav className="footer__nav">
                        <Link to={MAIN}>
                            <img src={logo} alt="logo" className="footer__logo"/>
                        </Link>
                        <ul className="footer__list">
                            {firstMenu.map((item) => {
                                return <li
                                    className={item.link == location.pathname ? "block__item activeMenu" : "block__item"}>
                                    <Link to={item.link} className="block__link">{item.title}</Link>
                                </li>
                            })}
                            {secondMenu.map((item) => {
                                return <li
                                    className={item.link == location.pathname ? "block__item activeMenu" : "block__item"}>
                                    <Link to={item.link} className="block__link">{item.title}</Link>
                                </li>
                            })}
                        </ul>
                    </nav>
                    <SocialLinks isFooter />
                    <Search/>
                </div>
            </div>
        </footer>
    )
}

export default Footer