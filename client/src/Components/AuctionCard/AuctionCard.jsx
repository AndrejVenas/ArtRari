import React, { useEffect, useState } from "react";
import "./AuctionCard.css";
import { useNavigate } from "react-router-dom";

const AuctionCard = ({ item, onClick }) => {
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState("");

    const calculateTimeLeft = (endDate) => {
        const now = Date.now();
        const end = new Date(endDate).getTime();

        const diff = end - now;

        // Аукцион завершен
        if (diff <= 0) {
            return "Аукціон завершено";
        }

        // Дни
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days >= 1) {
            return `${days} днів`;
        }

        // Часы / минуты / секунды
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const pad = (num) => String(num).padStart(2, "0");

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const calculateStartDate = (endDate) => {
        const now = Date.now();
        const end = new Date(endDate).getTime();

        const diff = end - now;

        // Аукцион завершен
        if (diff <= 0) {
            return "Аукціон розпочато";
        }

        // Дни
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days >= 1) {
            return `${days} днів`;
        }

        // Часы / минуты / секунды
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const pad = (num) => String(num).padStart(2, "0");

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    useEffect(() => {
        const updateTimer = () => {
            setTimeLeft(calculateTimeLeft(item.endDate));
        };
        
        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [item.endDate]);

    return (
        <div className="card" onClick={onClick}>
            <img src={item.thumbnailUrl} alt={item.title} />

            <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.theme}</p>

                <div className="tags">
                    <span>{item.status == "scheduled" ? `До старту: ${calculateStartDate(item.startDate)}`: timeLeft}</span>

                    {item?.tags?.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;