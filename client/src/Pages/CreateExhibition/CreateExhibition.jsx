import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import Input from '../../Components/UI/Input/Input'
import Textarea from '../../Components/UI/Textarea/Textarea'
import Button from '../../Components/UI/Button/Button'
import Popup from '../../Components/Popup/Popup'
import Image from '../../Components/UI/Image/Image'
import CustomSelect from '../../Components/UI/CustomSelect/CustomSelect'
import {useSelector} from 'react-redux'
import axios from 'axios'
import CheckBox from '../../Components/UI/CheckBox/CheckBox'
import CheckBoxComponent from '../../Components/CheckBoxComponent/CheckBoxComponent'
import { useLocation } from 'react-router-dom'

const CreateExhibition = () => {
    const [close, setClose] = useState('');
    const [works, setWorks] = useState([])
    const [artWorks, setArtWorks] = useState([])
    const [image, setImage] = useState({})
    const [workOpen, setWorkOpen] = useState(false)
    const {token} = useSelector(state => state.Auth)
    const location = useLocation()
    const dataExhibition = location.state?.item
    const theme = location.state?.theme
    const deleteWork = (work) => {
        setWorkOpen(false);
        setWorks(prevWork => prevWork.filter((item) => item.id != work.id))
    }
    useEffect(() => {
        console.log(workOpen, works);
    }, [workOpen, works])
    const [form, setForm] = useState({
        artworksIds: [],
        title: "",
        theme: "",
        description: "",
        backgroundUrl: "bck.com",
        thumbnailUrl: ""
    })

    useEffect(() => {
        if(Object.keys(dataExhibition).length > 0) {
            setForm({
                artworksIds: dataExhibition.artworks.map((item) => item.id),
                title: dataExhibition.title,
                theme: theme,
                thumbnailUrl: dataExhibition.backgroundUrl,
                description: dataExhibition.description,
                backgroundUrl: "bck.com"
            })
            setWorks(dataExhibition.artworks)
            console.log(dataExhibition.backgroundUrl)
            setImage(dataExhibition.backgroundUrl)
        }
    }, [dataExhibition])
    const getArtWorks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artworks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setArtWorks(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(workOpen) {
            getArtWorks()
        }
    }, [workOpen])

    const getImage = async (image) => {
        try {
        const formData = new FormData()
        formData.append('file', image)
        const response = await axios.post('http://localhost:8080/artworks/image', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.imageUrl
        } catch(error) {
            console.log(error)
        }
    }
    const createExhibitionAction = async () => {
        try {

            if(Object.keys(dataExhibition).length > 0) {
                setForm(prev => ({...prev, artworksIds: works.map((item) => item.id)}))

                const data = {
                    ...form,
                    artworksIds: works.map((item) => item.id),
                }
                const response = await axios.put('http://localhost:8080/exhibitions', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            } else {
                setForm(prev => ({...prev, artworksIds: works.map((item) => item.id)}))
                const result = await getImage(image)
                setForm(prev => ({...prev, thumbnailUrl: result}))

                const data = {
                    ...form,
                    artworksIds: works.map((item) => item.id),
                    thumbnailUrl: result
                }
                const response = await axios.post('http://localhost:8080/exhibitions', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <div className="createExhibition">
        <div className="createExhibition__container">
            <h1 className="createExhibition__title">Створення виставки</h1>
            <form className="createExhibition__form form">
            <div className="form__mainBlock">
                <div className="form__block">
                    <Input label='Назва виставки' type='text' placeholder='Грані реальності' value={form.title} onChange={(event) => setForm(prev => ({...prev, title: event.target.value}))}/>
                </div>
                <div className="form__block">
                    <Textarea label='Опис виставки' type='text' placeholder='Грані реальності' value={form.description} onChange={(event) => setForm(prev => ({...prev, description: event.target.value}))}/>
                </div>
                <div className="form__block">
                    <Input label='Тема виставки' type='text' placeholder='Nature & Rebirth' value={form.theme} onChange={(event) => setForm(prev => ({...prev, theme: event.target.value}))}/>
                </div>
                <div className="form__block">
                    <Button onClick={createExhibitionAction}>Зберегти</Button>
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
                                <div className="dropZone__plus" onClick={() => {
                                    setClose('open')
                                    setWorkOpen(true);
                                }}>+</div>
                                <span className="dropZone__subTitle">Додайте хоча б одну роботу</span>
                            </div>
                        </label>
                        }
                        <Image style={{'padding': '60px 0px'}} height={{'height': '118px'}} onChange={(event) => setImage(event.target.files[0])} value={image}/>
                    </div>
                </div>
            </form>
            <Popup close={close} setClose={setClose} workOpen={workOpen} setWorkOpen={setWorkOpen} setWorks={setWorks} artWorks={artWorks}/>
        </div>
    </div>
  )
}

export default CreateExhibition