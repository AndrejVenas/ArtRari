import React from 'react'
import './style.css'
import Input from '../../Components/Input/Input'
import Textarea from '../../Components/Textarea/Textarea'
import Button from '../../Components/Button/Button'

const CreateExhibition = () => {
  return (
    <div className="createExhibition">
        <div className="createExhibition__container">
            <h1 className="createExhibition__title">Створення виставки</h1>
            <form className="createExhibition__form form">
            <div className="form__mainBlock">
                <div className="form__block">
                    <Input label='Назва виставки' type='text' placeholder='Грані реальності'/>
                </div>
                <div className="form__block">
                    <Textarea label='Опис виставки' type='text' placeholder='Грані реальності'/>
                </div>
                <div className="form__block">
                    <label htmlFor="" className="form__block-label">Оберіть категорію</label>
                    <select className="form__block-input">
                        <option value="Категорія" disabled>Категорія</option>
                    </select>
                </div>
                </div>
                <div className="form__mainBlock">
                    <div className="form__block">
                        <label htmlFor="" className="form__block-label">Додавання робіт</label>
                        <label className="form__block-dropZone dropZone">
                            <div className="dropZone__input" />
                            <div className="dropZone__block">
                                <div className="dropZone__plus">+</div>
                                <span className="dropZone__subTitle">Додайте хоча б одну роботу</span>
                            </div>
                        </label>
                    </div>
                    <div className="form__block">
                        <Button>Зберегти</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateExhibition