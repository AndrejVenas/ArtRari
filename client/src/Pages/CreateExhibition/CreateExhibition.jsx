import React, { useEffect, useState } from 'react'
import './style.css'
import Input from '../../Components/UI/Input/Input'
import Textarea from '../../Components/UI/Textarea/Textarea'
import Button from '../../Components/UI/Button/Button'
import Popup from '../../Components/Popup/Popup'

const CreateExhibition = () => {
    const [close, setClose] = useState('');
    const [workOpen, setWorkOpen] = useState(false);
    const [works, setWorks] = useState([])

    const deleteWork = (work) => {
        setWorkOpen(false);
        setWorks(prevWork => prevWork.filter((item) => item.id != work.id))
    }
    useEffect(() => {
        console.log(workOpen, works);
    }, [workOpen, works])
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
                        
                        {works.length > 0 ?
                        <table className="form__block-table table">
                            <thead>
                                <tr>
                                    <th className="table__th">Назва</th>
                                    <th className="table__th">Країна</th>
                                    <th className="table__th">Ціна</th>
                                </tr>
                            </thead>
                            <tbody>
                            {works.map((item, index) => {
                                return <tr className='table__tr'>
                                    <td className="table__tr-td">{item.title}</td>
                                    <td className="table__tr-td">{item.category}</td>
                                    <td className="table__tr-td">{item.price}</td>
                                    <td className="table__tr-td"><img src={require('../../Images/close.svg').default} alt="закрити" onClick={() => deleteWork(item)}/></td>
                                </tr>
                            })}
                            </tbody>
                            <tfoot>
                                <tr className="table__trFooter">
                                    <td colSpan="4" className="table__trFooter-td" onClick={() => setClose('open')}>Додати ще роботи <span className='table__trFooter-span'>+</span></td>
                                </tr>
                            </tfoot>
                        </table>
                        :
                        <label className="form__block-dropZone dropZone">
                            <div className="dropZone__input" />
                            <div className="dropZone__block">
                                <div className="dropZone__plus" onClick={() => setClose('open')}>+</div>
                                <span className="dropZone__subTitle">Додайте хоча б одну роботу</span>
                            </div>
                        </label>
                        }
                    </div>
                    <div className="form__block">
                        <Button>Зберегти</Button>
                    </div>
                </div>
            </form>
            <Popup close={close} setClose={setClose} workOpen={workOpen} setWorkOpen={setWorkOpen} setWorks={setWorks} />
        </div>
    </div>
  )
}

export default CreateExhibition