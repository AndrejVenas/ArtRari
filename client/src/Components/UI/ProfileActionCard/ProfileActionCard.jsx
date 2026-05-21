import React from "react";
import "./ProfileActionCard.css";
import Button from "../Button/Button";

const ProfileActionCard = ({ title, img, text, finalPrice, buttonText, onClick }) => {
    return (
        <div className="action-card">
            <h3>{title}</h3>
            {img && <img src={img} alt={title} style={{'height': '200px', margin: '10px 0px', 'border-radius': '10px'}}/>}
            {finalPrice && <p>Фінальна ціна: {finalPrice} $</p>}
            <p>{text}</p>
            <Button type="button" onClick={onClick}>
                {buttonText}
            </Button>
        </div>
    );
};

export default ProfileActionCard;