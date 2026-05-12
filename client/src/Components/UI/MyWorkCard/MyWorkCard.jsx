import React from "react";
import "./MyWorkCard.css";

const MyWorkCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="my-work-card">
            <img
                src={item.image}
                alt={item.title}
                className="my-work-card__image"
            />

            <div className="my-work-card__content">
                <h3 className="my-work-card__title">
                    {item.title}
                </h3>

                <div className="my-work-card__actions">
                    <button
                        className="my-work-card__button"
                        onClick={() => onEdit(item)}
                    >
                        <img className={"image-icon"} src="/images/icons/check.svg" alt=""/>
                    </button>

                    <button
                        className="my-work-card__button"
                        onClick={() => onDelete(item.id)}
                    >
                        <img className={"image-icon"} src="/images/icons/trash.svg" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyWorkCard;