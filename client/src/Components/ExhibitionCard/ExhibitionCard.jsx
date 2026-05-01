import React from "react";
import "./ExhibitionCard.css";

const ExhibitionCard = ({ item }) => {
    return (
        <div className="exhibition-card">
            <div className="image-wrapper">
                <img src={item.image} alt={item.title} />
            </div>

            <div className="exhibition-content">
                <h3>{item.title}</h3>
                <p>{item.country}</p>
                <p>{item.date}</p>
            </div>
        </div>
    );
};

export default ExhibitionCard;