import React from 'react'
import "./ProfileAction.css";
import Title from "../../UI/title/Title";
import ProfileActionCard from "../../UI/ProfileActionCard/ProfileActionCard";

const ProfileAction = () => {
    return (
        <div className="profile-actions">
            <Title title={"Дії"} />

            <div className="profile-actions-flex">
                <ProfileActionCard
                    title="Тиша, що пам’ятає світло"
                    text="Цей витвір мистецтва — тонка розмова між світлом і спогадами, зафіксована у шарі часу. Полотно ніби дихає спокоєм: м’які переходи кольорів створюють відчуття ранкового туману, в якому губляться силуети минулого. Автор досліджує крихкість моменту — ту межу, де реальність поступається відчуттям."
                    buttonText="Оплатити лот"
                    onClick={() => console.log(1)}
                />

                <ProfileActionCard
                    title="Історія замовлень"
                    text="Переглянути свою історію замовлень за весь час"
                    buttonText="Перейти до історії замовлень"
                    onClick={() => console.log(1)}
                />
            </div>
        </div>
    )
}

export default ProfileAction