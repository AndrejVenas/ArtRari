import React from "react";
import "./AuctionCard.css";
import { useNavigate } from "react-router-dom";

const AuctionCard = ({ item, onClick}) => {
    const calculateDate = (startDate, endDate) => {
        const start = Date.now()
        const end = new Date(endDate)
        console.log(start, end)
        return Math.round((end - start) / (1000 * 60 * 60 * 24))
    }
    const navigate = useNavigate()
    return (
        <div className="card" onClick={onClick}>
            <img src={item.thumbnailUrl} alt={item.title} />

            <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.theme}</p>
                <div className="tags">
                    <span>{item.tags?.length > 0 ? item.tags[0] : item.category}</span>
                    <span>{item.tags?.length > 0 ? item.tags[1] : item.country}</span>
                    <span>{calculateDate(item.startDate, item.endDate)} днів</span>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;