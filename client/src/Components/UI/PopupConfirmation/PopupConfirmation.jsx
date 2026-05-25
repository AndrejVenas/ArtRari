import React, {useState} from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './style.css'

const PopupConfirmation = ({close, setClose, onDate, setOpen, title}) => {
    const [data, setData] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        step: 0
    })
    const convertToISO = (date, time) => {
        const dateTime = new Date(`${date}T${time}`)
        if(!dateTime.getTime()) return ""
        const offset = dateTime.getTimezoneOffset()
        const absOffset = Math.abs(offset)
        const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0')
        const offsetMinutes = String(absOffset % 60).padStart(2, '0')
        const offsetSign = offset <= 0 ? '+' : '-'
        return `${date}T${time}:00${offsetSign}${offsetHours}:${offsetMinutes}`
    }
    const getData = () => {
        console.log(data)
        onDate({
            startDate: convertToISO(data.startDate, data.startTime),
            endDate: convertToISO(data.endDate, data.endTime),
            step: data.step
        })
    }
    return (
        <div className={"popup" + " " + close}>
            <div className="popup__container confirmation">
                <div className="popup__content">
                    <div className="popup__top">
                        <h1 className="popup__top-title">{title}</h1>
                        <img src={require('../../../Images/close.svg').default} alt="закрити"
                             className="popup__top-close" onClick={() => {
                                //setClose('close')
                                setOpen(false)
                             }}/>
                    </div>
                    <div className="popup__cards">
                        <form action="" className="popupConfirmation__form">
                            <div className="form__block">
                                <label className='label'>Дата початку</label>
                                <Input type="date" onChange={(event) => setData(prev => ({
                                    ...prev,
                                    startDate: event.target.value
                                }))}/>
                            </div>
                            <div className="form__block">
                                <label className='label'>Час початку</label>
                                <Input type="time" onChange={(event) => setData(prev => ({
                                    ...prev,
                                    startTime: event.target.value
                                }))}/>
                            </div>
                            <div className="form__block">
                                <label className='label'>Дата закінчення</label>
                                <Input type="date"
                                       onChange={(event) => setData(prev => ({...prev, endDate: event.target.value}))}/>
                            </div>
                            <div className="form__block">
                                <label className='label'>Час закінчення</label>
                                <Input type="time"
                                       onChange={(event) => setData(prev => ({...prev, endTime: event.target.value}))}/>
                            </div>
                            <div className="form__block">
                                <label className='label'>Шаг аукціону</label>
                                <Input type="number"
                                       onChange={(event) => setData(prev => ({...prev, step: event.target.value}))}/>
                            </div>
                            <Button onClick={getData}>Зберегти</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupConfirmation