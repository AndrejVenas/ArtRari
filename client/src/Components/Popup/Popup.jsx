import React, { useEffect, useState } from 'react'
import { auctionsArray } from '../../Arrays/arrayMenu'
import './style.css'
import '../../Images/auction.svg'
import Button from '../UI/Button/Button'

const Popup = ({close, setClose, workOpen, setWorkOpen, setWorks}) => {
    const addWork = (item) => {
        setWorkOpen(true);
        setWorks(prev => [...prev, {...item}])
        setClose('close')
    }
  return (
    <div className={"popup" + " " + close}>
        <div className="popup__container">
            <div className="popup__content">
                <div className="popup__top">
                    <h1 className="popup__top-title">Аукціон "Назва аукціону"</h1>
                    <img src={require('../../Images/close.svg').default} alt="закрити" className="popup__top-close" onClick={() => setClose('close')}/>
                </div>
                <div className="popup__cards">
                    {auctionsArray.map((item, index) => {
                        return <div className={'popup__card' + (index % 2 == 0 ? ' active' : '')} key={index}>
                                <img src={require(`../../Images/${item.image}`)} alt={item.title} className="popup__image" />
                                <div className="popup__description">
                                    <h3 className="popup__description-title">{item.title}</h3>
                                    <div className="popup__description-information information">
                                        <div className="information__block">
                                            <p className="information__block-price">Ціна: {item.price}</p>
                                            <p className="information__block-author">Автор: {item.author}</p>
                                        </div>
                                        <div className="information__block">
                                            <p className="information__block-category">Категорія: {item.category}</p>
                                            <p className="information__block-dateOfCreating">Дата створення: {item.dateOfCreating}</p>
                                        </div>
                                        <div className="information__button">
                                            <Button onClick={() => addWork(item)}>Додати</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Popup