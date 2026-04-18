import React from 'react'
import profile from '../../Images/profile.svg'

const Profile = () => {
  return (
    <div className="profile__container">
        <img src={profile} alt="profile" className="profile__image" />
    </div>
  )
}

export default Profile