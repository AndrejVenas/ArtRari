import React from "react";
import "./AuctionCard.css";

const AuctionCard = ({ item }) => {
    return (
        <div className="card">
            <img src={item.image} alt={item.title} />

            <div className="card-content">
                <h3>{item.title}</h3>

                <div className="tags">
                    <span>{item.category}</span>
                    <span>{item.country}</span>
                    <span>{item.time}</span>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;