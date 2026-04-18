import React from 'react'
import Menu from '../Menu/Menu'
import Profile from '../Profile/Profile'
import light from '../../Images/light.svg'
import './style.css'

const Header = () => {
  return (
    <div class="header">
        <div className="header__container">
            <div className="header__items items">
                <div className="items_light light">
                    <img src={light} alt="light" className="light__image" />
                </div>
                <div className="items__menu menu">
                    <Menu />
                </div>
                <div className="items__profile profile">
                    <Profile />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header