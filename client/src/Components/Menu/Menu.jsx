import React from 'react'
import {Link} from 'react-router-dom'
import { arrayMenu } from '../../Arrays/arrayMenu'
import logo from '../../Images/logo.svg'
import './style.css'

const Menu = () => {
  const firstMenu = arrayMenu.slice(0, 2);
  const secondMenu = arrayMenu.slice(2, 4)
  return (
    <div className='menu__container'>
      <nav className="menu__navigation">
        <ul className="menu__list">
          {firstMenu.map((item) => {
            return <li className="menu__item">
              <Link to={item.link} className="menu__link">{item.title}</Link>
            </li>
          })}
          <li className="menu__item">
            <img src={logo} alt="logo" />
          </li>
          {secondMenu.map((item) => {
            return <li className="menu__item">
              <Link to={item.link} className="menu__link">{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Menu