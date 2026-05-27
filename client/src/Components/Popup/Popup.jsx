import React, { useEffect, useState } from 'react'
import { auctionsArray } from '../../Arrays/arrayMenu'
import './style.css'
import '../../Images/auction.svg'
import Button from '../UI/Button/Button'

const Popup = ({close, setClose, workOpen, setWorkOpen, setWorks, artWorks, artWorksServer = [], setArtWorks = [], works}) => {
    const addWork = (item) => {
        console.log(item)
        setWorks(prev => [...prev, item])
        setArtWorks(prev => prev.filter((element) => element.id != item.id))
        //setArtWorksServer(prev => prev.filter((element) => element.id != item.id))
        setClose('close')
    }

    console.log(artWorks)
  return (
    <div className={"popup" + " " + close}>
        <div className="popup__container">
            <div className="popup__content">
                <div className="popup__top">
                    <h1 className="popup__top-title">Оберіть роботи</h1>
                    <img src={require('../../Images/close.svg').default} alt="закрити" className="popup__top-close" onClick={() => setClose('close')}/>
                </div>
                <div className="popup__cards">
                    {artWorks.length == 0 ? <p>Поки що тут немає робіт</p> : artWorks?.map((item, index) => {
                        return works.every(element => element.id != item.id) && <div className={'popup__card' + (index % 2 == 0 ? ' active' : '')} key={index}>
                                <img src={item.thumbnailUrl} alt={item.title} className="popup__image" />
                                <div className="popup__description">
                                    <h3 className="popup__description-title">{item.title}</h3>
                                    <div className="popup__description-information information">
                                        <div className="information__block">
                                            <p className="information__block-price">Ціна: {item.startPrice} $</p>
                                            <p className="information__block-author">Автор: {item.author}</p>
                                        </div>
                                        <div className="information__block">
                                            <p className="information__block-category">Категорія: {item.tags?.join(", ")}</p>
                                            <p className="information__block-dateOfCreating">Техніка: {item.technique}</p>
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