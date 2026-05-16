import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'

const PopupConfirmation = ({close, setClose, onDate}) => {
    const [data, setData] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        step: 0
    })
    const convertToISO = (date, time) => {
        const dateTime = new Date(`${date}T${time}`)
        return dateTime.toISOString()
    }
    const getData = () => {
        console.log(data)
        onDate({startDate: convertToISO(data.startDate, data.startTime), endDate: convertToISO(data.endDate, data.endTime), step: data.step})
    }
  return (
    <div className={"popup" + " " + close}>
        <div className="popup__container">
            <div className="popup__content">
                <div className="popup__top">
                    <h1 className="popup__top-title">Оберіть роботи</h1>
                    <img src={require('../../../Images/close.svg').default} alt="закрити" className="popup__top-close" onClick={() => setClose('close')}/>
                </div>
                <div className="popup__cards">
                    <form action="" className="popupConfirmation__form">
                        <Input type="date" onChange={(event) => setData(prev => ({...prev, startDate: event.target.value}))}/>
                        <Input type="time" onChange={(event) => setData(prev => ({...prev, startTime: event.target.value}))}/>
                        <Input type="date" onChange={(event) => setData(prev => ({...prev, endDate: event.target.value}))}/>
                        <Input type="time" onChange={(event) => setData(prev => ({...prev, endTime: event.target.value}))}/>
                        <Input type="number" onChange={(event) => setData(prev => ({...prev, step: event.target.value}))}/>
                        <Button onClick={getData} />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopupConfirmation