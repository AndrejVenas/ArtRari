import api from '../../../api/axiosInstance'
import React, { useEffect, useState } from 'react'
import './style.css'
const CheckBox = ({setWorkOpen, tagsArray, setTagsArray, onChange}) => {
    const [tags, setTags] = useState([])
    const [close, setClose] = useState('')
    const getTags = async () => {
        try {
            const response = await api.get('/tags')
            setTags(response.data)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTags()
    }, [])
  return (
    <div className={"checkBox" + " " + close}>
        <div className="checkBox__container">
            <div className="checkBox__content">
                <div className="checkBox__top">
                    <h1 className="checkBox__top-title">Оберіть теги для пошуку по відповідним категоріям</h1>
                    <img src={require('../../../Images/close.svg').default} alt="закрити" className="checkBox__top-close" onClick={() => {
                        //setClose('close')
                        setWorkOpen(false)}
                    }/>
                </div>
                <div className="checkBox__cards">
                    {tags.map((item) => {

                        const isChecked = tagsArray.some(
                            tag => tag.name === item.name
                        )

                        return (
                            <div className='checkBox__card' key={item.id}>

                                <input
                                    type="checkbox"
                                    className="checkBox__card-input"
                                    checked={isChecked}
                                    id={item.id}
                                    value={item.name}
                                    onChange={() => {

                                        setTagsArray(prev =>
                                            prev.some(tag => tag.name === item.name)
                                                ? prev.filter(tag => tag.name !== item.name)
                                                : [...prev, item]
                                        )

                                    }}
                                />

                                <label
                                    htmlFor={item.id}
                                    className="checkBox__card-label"
                                >
                                    {item.name}
                                </label>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckBox