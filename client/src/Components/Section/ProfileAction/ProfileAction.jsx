import React, { useEffect, useState } from 'react'
import "./ProfileAction.css";
import Title from "../../UI/title/Title";
import ProfileActionCard from "../../UI/ProfileActionCard/ProfileActionCard";
import { useSelector } from 'react-redux';
import api from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { HISTORY_BUY } from '../../../constants';

const ProfileAction = () => {
    const {token} = useSelector(state => state.Auth)
    const [lot, setLot] = useState([])
    const [history, setHistory] = useState([])
    const getLot = async () => {
        try {
            const response = await api.get('/purchases/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLot(response.data.purchases.filter((item) => item.status == 'pending_payment'))
            setHistory(response.data.purchases.filter((item) => item.status != 'pending_payment'))
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getLot()
    }, [])
    const navigate = useNavigate()
    return (
        <div className="profile-actions">
            <Title title={"Дії"} />

            <div className="profile-actions-flex">
            {lot.map((item) => {
                return <ProfileActionCard
                    title={item.title}
                    img={item.thumbnailUrl}
                    finalPrice={item.finalPrice}
                    buttonText="Оплатити лот"
                    onClick={() => navigate(`/lotPayment/${item.id}`)}
                />
            })}
                <ProfileActionCard
                    title="Історія замовлень"
                    text="Переглянути свою історію замовлень за весь час"
                    buttonText="Перейти до історії замовлень"
                    onClick={() => navigate(HISTORY_BUY, {state: {history}})}
                />
                
            </div>
        </div>
    )
}

export default ProfileAction