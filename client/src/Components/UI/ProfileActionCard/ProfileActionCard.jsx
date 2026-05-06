import React from "react";
import "./ProfileActionCard.css";
import Button from "../Button/Button";

const ProfileActionCard = ({ title, text, buttonText, onClick }) => {
    return (
        <div className="action-card">
            <h3>{title}</h3>
            <p>{text}</p>

            <Button type="button" onClick={onClick}>
                {buttonText}
            </Button>
        </div>
    );
};

export default ProfileActionCard;