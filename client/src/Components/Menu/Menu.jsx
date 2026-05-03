import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { arrayMenu } from '../../Arrays/arrayMenu'
import logo from '../../Images/logo.svg'
import './style.css'
import { AUCTIONS, EXHIBITIONS } from '../../constants'

const Menu = () => {
  const location = useLocation()
  const firstMenu = arrayMenu.slice(0, 2);
  const secondMenu = arrayMenu.slice(2, 4)
  return (
    <div className='menu__container'>
      <nav className="menu__navigation">
        <ul className="menu__list">
          {firstMenu.map((item) => {
            return <li className={item.link == location.pathname ? "menu__item activeMenu" : "menu__item"}>
              <Link to={item.link} className="menu__link">{item.title}</Link>
            </li>
          })}
          </ul>
          <li className="menu__item">
            <img src={logo} alt="logo" />
          </li>
        <ul className="menu__list">
          {secondMenu.map((item) => {
            return <li className={item.link == location.pathname ? "menu__item activeMenu" : "menu__item"}>
              <Link to={item.link} className="menu__link">{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Menu