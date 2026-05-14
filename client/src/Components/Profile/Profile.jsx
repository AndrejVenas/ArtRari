import React from 'react'
import profile from '../../Images/profile.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigation = useNavigate();
  const {isAuth} = useSelector(state => state.Auth)
  return (
    <div className="profile__container">
        <img src={profile} onClick={() => {isAuth ? navigation('/profile') : navigation('registration')}} style={{cursor: "pointer"}} alt="profile" className="profile__image" />
    </div>
  )
}

export default Profile