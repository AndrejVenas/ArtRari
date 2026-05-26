import api from '../../../api/axiosInstance'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Message from '../../UI/Message/Message'
import { useLocation, useNavigate } from 'react-router-dom'
import {AUCTIONS} from '../../../constants'
const AuctionBid = ({id, navigateToPage}) => {
    const [bid, setBid] = useState(100)
    const {token} = useSelector(state => state.Auth)
    const [checked, setChecked] = useState(false)
    const [checkedCheckBox, setCheckedCheckBox] = useState(false)
    const [message, setMessage] = useState('')
    const bidAuction = async (id) => {
        if(!checkedCheckBox) {
            setMessage('Прийміть правила використання.')
            setChecked(true)
        } else {
        try {
            console.log(bid * 1.00)
            const response = await api.post(`/lots/${id}/bids`, {amount: bid}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setChecked(true)
            setMessage('Вітаємо. Ваша ставка була успішно прийнята.')
            setTimeout(() => {
                console.log(navigateToPage)
                // window.location.reload(navigateToPage)
            }, 3000)
        } catch(error) {
            console.log(error.response)
            setChecked(true)
            setMessage(error.response.data.message)
        }
    }
    }

    useEffect(() => {
        console.log(checked)
    }, [checked])
  return (
        <div className="auction-bid">
            <label className="checkbox">
                <input type="checkbox" onChange={(event) => setCheckedCheckBox(event.target.checked)}/>
                    Я прочитав правила використання та згоден з
                    обробкою персональних даних
            </label>

            <a href="#" className="text-link auction-link">
                Правила використання
            </a>

            <div className="bid-controls">
                <input type="text" defaultValue={bid} onChange={(event) => setBid(event.target.value)}/>
                <button onClick={() => bidAuction(id)}>Зробити ставку</button>
            </div>

            <p className="note">
                ціна з урахуванням комісії {Number(bid) + Number(bid) * 0.01} $
                </p>
                <Message flag={checked} setFlag={setChecked} message={message}/>
            </div>
  )
}

export default AuctionBid