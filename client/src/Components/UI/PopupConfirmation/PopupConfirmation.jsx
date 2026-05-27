import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './style.css'
import { useActiveContext } from "../../AppRouter"

const PopupConfirmation = ({ close, setClose, onDate, setOpen, title }) => {
    const [data, setData] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        step: ""
    })

    const [errors, setErrors] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        step: ""
    })

    const { setActive, setMessage } = useActiveContext()

    const convertToISO = (date, time) => {
        if (!date || !time) return ""

        const dateTime = new Date(`${date}T${time}`)
        if (isNaN(dateTime.getTime())) return ""

        const offset = dateTime.getTimezoneOffset()
        const absOffset = Math.abs(offset)
        const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0')
        const offsetMinutes = String(absOffset % 60).padStart(2, '0')
        const offsetSign = offset <= 0 ? '+' : '-'

        return `${date}T${time}:00${offsetSign}${offsetHours}:${offsetMinutes}`
    }

    const validate = () => {
        let newErrors = {}

        if (!data.startDate) newErrors.startDate = "Введіть дату почтаку"
        if (!data.startTime) newErrors.startTime = "Введіть час почтаку"
        if (!data.endDate) newErrors.endDate = "Введіть дату завершення"
        if (!data.endTime) newErrors.endTime = "Введіть час завершення"

        if (!data.step) {
            newErrors.step = "Введіть крок"
        } else if (Number(data.step) <= 0) {
            newErrors.step = "Крок повинен бути додатним"
        }

        const start = new Date(`${data.startDate}T${data.startTime}`)
        const end = new Date(`${data.endDate}T${data.endTime}`)

        if (
            data.startDate &&
            data.startTime &&
            data.endDate &&
            data.endTime &&
            start >= end
        ) {
            newErrors.endDate = "Дата завершення повинна бути пізнішою за дату початку"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    // const getData = async (e) => {
    //     e.preventDefault()
    //
    //     if (!validate()) {
    //         setMessage("Заповніть коректно всі поля!")
    //         setActive(true)
    //         return
    //     }
    //
    //     try {
    //         const result = await onDate({
    //             startDate: convertToISO(data.startDate, data.startTime),
    //             endDate: convertToISO(data.endDate, data.endTime),
    //             step: Number(data.step)
    //         })
    //
    //         if (result?.status === 200 || result?.status === 201) {
    //             setMessage("Роботу успішно додано!")
    //             setActive(true)
    //         }
    //
    //     } catch (error) {
    //         const msg =
    //             error?.response?.data?.message || "Помилка при створенні аукціону"
    //         setMessage(msg)
    //         setActive(true)
    //     }
    // }
    const getData = async (e) => {
        e.preventDefault()

        if (!validate()) {
            setMessage("Заповніть коректно всі поля!")
            setActive(true)
            return
        }

        try {
            const result = await onDate({
                startDate: convertToISO(data.startDate, data.startTime),
                endDate: convertToISO(data.endDate, data.endTime),
                step: Number(data.step)
            })

            setMessage("Аукціон успішно створено!")
            setActive(true)

        } catch (error) {
            if (error?.response?.status === 409) {
                setMessage("Аукціон вже існує для цієї виставки")
            } else {
                setMessage("Помилка при створенні аукціону")
            }

            setActive(true)
        }
    }

    return (
        <div className={"popup " + close}>
            <div className="popup__container confirmation">
                <div className="popup__content">

                    <div className="popup__top">
                        <h1 className="popup__top-title">{title}</h1>
                        <img
                            src={require('../../../Images/close.svg').default}
                            alt="закрити"
                            className="popup__top-close"
                            onClick={() => setOpen(false)}
                        />
                    </div>

                    <div className="popup__cards">
                        <form className="popupConfirmation__form" onSubmit={getData}>

                            <div className="form__block">
                                <label className='label'>Дата початку</label>
                                <Input
                                    type="date"
                                    value={data.startDate}
                                    error={errors.startDate}
                                    onChange={(e) => setData(prev => ({ ...prev, startDate: e.target.value }))}
                                />
                            </div>

                            <div className="form__block">
                                <label className='label'>Час початку</label>
                                <Input
                                    type="time"
                                    value={data.startTime}
                                    error={errors.startTime}
                                    onChange={(e) => setData(prev => ({ ...prev, startTime: e.target.value }))}
                                />
                            </div>

                            <div className="form__block">
                                <label className='label'>Дата закінчення</label>
                                <Input
                                    type="date"
                                    value={data.endDate}
                                    error={errors.endDate}
                                    onChange={(e) => setData(prev => ({ ...prev, endDate: e.target.value }))}
                                />
                            </div>

                            <div className="form__block">
                                <label className='label'>Час закінчення</label>
                                <Input
                                    type="time"
                                    value={data.endTime}
                                    error={errors.endTime}
                                    onChange={(e) => setData(prev => ({ ...prev, endTime: e.target.value }))}
                                />
                            </div>

                            <div className="form__block">
                                <label className='label'>Крок аукціону</label>
                                <Input
                                    type="number"
                                    value={data.step}
                                    error={errors.step}
                                    onChange={(e) => setData(prev => ({ ...prev, step: e.target.value }))}
                                />
                            </div>

                            <Button type="submit">
                                Зберегти
                            </Button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PopupConfirmation