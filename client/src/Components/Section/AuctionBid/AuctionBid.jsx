import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Message from '../../UI/Message/Message'
import { useNavigate } from 'react-router-dom'
import {AUCTIONS} from '../../../constants'
const AuctionBid = ({id}) => {
    const [bid, setBid] = useState(100)
    const {token} = useSelector(state => state.Auth)
    const [checked, setChecked] = useState(false)
    const [checkedCheckBox, setCheckedCheckBox] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const bidAuction = async (id) => {
        if(!checkedCheckBox) {
            setMessage('Прийміть правила використання.')
            setChecked(true)
        } else {
        try {
            console.log(bid * 1.00)
            const response = await axios.post(`http://localhost:8080/lots/${id}/bids`, {amount: bid}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setChecked(true)
            setMessage('Вітаємо. Ваша ставка була успішно прийнята.')
            setTimeout(() => {
                navigate(AUCTIONS)
            }, 3000)
        } catch(error) {
            console.log(error.response)
            setChecked(true)
            setMessage('Ваша ставка на прийнята. Ставка не може бути меншою за максимальну.')
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
                ціна з урахуванням комісії {Number(bid) + Number(bid) * 0.1} $
                </p>
                <Message flag={checked} setFlag={setChecked} message={message}/>
            </div>
  )
}

export default AuctionBid