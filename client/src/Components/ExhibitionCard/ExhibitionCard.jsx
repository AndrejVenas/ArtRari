import React from "react";
import "./ExhibitionCard.css";
import { useNavigate } from "react-router-dom";

const ExhibitionCard = ({ item, onClick }) => {
    const navigate = useNavigate()
    return (
        <div className="exhibition-card" onClick={onClick}>
            <div className="image-wrapper">
                <img src={item.thumbnailUrl} alt={item.title} />
            </div>

            <div className="exhibition-content">
                <h3>{item.title}</h3>
                <p>{item.theme}</p>
                {item?.tags?.length > 0 && <div className="tags">
                {item?.tags.map(item => {
                    return <span>{item}</span>
                })}
                </div>}
            </div>
        </div>
    );
};

export default ExhibitionCard;