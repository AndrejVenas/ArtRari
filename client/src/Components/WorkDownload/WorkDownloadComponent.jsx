import React from 'react'
import Image from '../UI/Image/Image'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import './style.css'
import Button from '../UI/Button/Button'

const WorkDownloadComponent = () => {
    const filter = {
        name: "type",
        label: "Оберіть тип роботи",
        type: "select",
        options: ["Живопис", "Скульптура"],
    }
  return (
    <section className='workDownloadComponent'>
        <div className="workDownloadComponent__container">
            <div className="workDownloadComponent__content">
                <h1 className="workDownloadComponent__title">Завантаження роботи</h1>
                <form action="" className="workDownloadComponent__form formInputs">
                    <Image />
                    <div className="formInputs__inputs">
                        <Input label='Назва роботи' type='text' placeholder='Грані реальності'/>
                        <Textarea label='Опис роботи' placeholder='Грані реальності'/>
                        <div className="formInputs__inputs-block">
                            <Input label='Дата створення' type='date' placeholder='ДД.ММ.РРРР' />
                            <Input label='Автор' type='text' />
                        </div>
                        <div className="formInputs__inputs-block">
                            <Input label='Стартова ціна' type='number' placeholder='300' />
                            <div className="input-group">
                                <label className='input-label'>Тип роботи</label>
                                <CustomSelect filter={filter} />
                            </div>
                        </div>
                        <Button>Завантажити</Button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default WorkDownloadComponent