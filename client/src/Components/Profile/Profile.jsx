import React from 'react'
import profile from '../../Images/profile.svg'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigation = useNavigate();
  return (
    <div className="profile__container">
        <img src={profile} onClick={() => navigation('registration')} style={{cursor: "pointer"}} alt="profile" className="profile__image" />
    </div>
  )
}

export default Profile