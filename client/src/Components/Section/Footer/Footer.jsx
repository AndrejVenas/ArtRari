import React from 'react'
import logo from '../../../Images/logo.svg'
import SocialLinks from '../../UI/social-links/SocialLinks.jsx'
import { arrayMenu } from '../../../Arrays/arrayMenu.js'
import { Link, useLocation } from 'react-router-dom'
import Search from '../../UI/Search/Search.jsx'
import './style.css'

const Footer = () => {
  const location = useLocation();
  const firstMenu = arrayMenu.slice(0, 2);
  const secondMenu = arrayMenu.slice(2, 4);
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <nav className="footer__nav">
          <img src={logo} alt="logo" className="footer__logo" />
            <ul className="footer__list">
              <div className="footer__list-block block">
              {firstMenu.map((item) => {
                return <li className={item.link == location.pathname ? "block__item activeMenu" : "block__item"}>
              <Link to={item.link} className="block__link">{item.title}</Link>
              </li>
              })}
              </div>
              <div className="footer__list-block block">
              {secondMenu.map((item) => {
                return <li className={item.link == location.pathname ? "block__item activeMenu" : "block__item"}>
              <Link to={item.link} className="block__link">{item.title}</Link>
              </li>
            })}
            </div>
            </ul>
          </nav>
          <SocialLinks />
          <Search />
        </div>
      </div>
    </footer>
  )
}

export default Footer