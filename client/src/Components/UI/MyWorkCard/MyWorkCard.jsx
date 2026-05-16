import React, { useState } from "react";
import "./MyWorkCard.css";
import PopupConfirmation from "../PopupConfirmation/PopupConfirmation";

const MyWorkCard = ({ item, onEdit, onDelete, location, onDate }) => {
    const [close, setClose] = useState('open')
    const [open, setOpen] = useState(false)
    const openCalendar = (data, id) => {
        setOpen(true)
        //data['exhibitionId'] = id
        //onDate(data)
    }
    return (
        <div className="my-work-card">
            <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="my-work-card__image"
            />

            <div className="my-work-card__content">
                <h3 className="my-work-card__title">
                    {item.title}
                </h3>
                <p className="my-work-card__theme">{item.theme}</p>
                <div className="my-work-card__actions">
                    <button
                        className="my-work-card__button"
                        onClick={() => onEdit(item)}
                    >
                        <img className={"image-icon"} src="/images/icons/check.svg" alt=""/>
                    </button>
                    {location.pathname.toLowerCase().includes('exhibitions') && <button className="my-work-card__button">
                        <img className={"image-icon"} src={"/images/calendar.webp"} alt="" onClick={() => openCalendar(item.id)}/>
                    </button>
                    }
                    <button
                        className="my-work-card__button"
                        onClick={() => onDelete(item.id)}
                    >
                        <img className={"image-icon"} src="/images/icons/trash.svg" alt=""/>
                    </button>
                </div>
            </div>
            {open && <PopupConfirmation close={close} setClose={setClose} onDate={(data) => onDate(data, item.id)}/>}
        </div>
    );
};

export default MyWorkCard;