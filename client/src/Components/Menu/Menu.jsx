import React from 'react'
import {Link} from 'react-router-dom'
import { arrayMenu } from '../../Arrays/arrayMenu'

const Menu = () => {
  return (
    <div className='menu__container'>
      <nav className="menu__navigation">
        <ul className="menu__list">
          {arrayMenu.map((item) => {
            <li className="menu__item">
              <Link to={item.link} className="menu__link">{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Menu