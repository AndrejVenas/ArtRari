import React, { useEffect, useMemo, useState } from 'react'
import Image from '../UI/Image/Image'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import './style.css'
import Button from '../UI/Button/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'

const WorkDownloadComponent = () => {
    const {token} = useSelector(state => state.Auth)
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        technique: "oil",
        tags: [],
        creationDate: "",
        photoUrl: "",
        startPrice: 0
    })
    const getTags = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tags')
            setTags(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    
    const filter = {
        name: "type",
        label: "Оберіть тег роботи",
        type: "select",
        options: []
        /*tags: [],
        idOfTags: []
        */
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        console.log(form)
    }, [form])
    const newFilter = useMemo(() => {
        const newTags = tags.map((item) => item.name)
        console.log(newTags)  
        return {
                ...filter,
                options: tags.map((item) => item.name)
            }
    }, [tags])

    const convertImage = async (image) => {
        const formData = new FormData()
        formData.append('file', image)
        try {
            console.log(image)
            const response = await axios.post('http://localhost:8080/artworks/image', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            //setForm(prev => ({...prev, photoUrl: response.data.imageUrl}))    
            return response.data.imageUrl
        //console.log(response.data)
        } catch(error) {
            console.log(error.response)
        }
    }
    const handleClick = async () => {
        const formData = new FormData()
        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })
        //setForm(prev => ({...prev, photoUrl: ''})) 
        const photoOfWork = await convertImage(formData.get('photoUrl'))
        const data = {
            ...form,
            photoUrl: photoOfWork
        }
        if(!form['photoUrl']) {
            return
        } else {
        try {
        const response = await axios.post('http://localhost:8080/artworks', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        //console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    }
  return (
    <section className='workDownloadComponent'>
        <div className="workDownloadComponent__container">
            <div className="workDownloadComponent__content">
                <h1 className="workDownloadComponent__title">Завантаження роботи</h1>
                <form action="" className="workDownloadComponent__form formInputs">
                    <Image onChange={(event) => setForm(prev => ({...prev, photoUrl: event.target.files[0]}))}/>
                    <div className="formInputs__inputs">
                        <Input label='Назва роботи' type='text' placeholder='Грані реальності' name='title' onChange={(event) => setForm(prev => ({...prev, title: event.target.value}))}/>
                        <Textarea label='Опис роботи' placeholder='Грані реальності' name='description' onChange={(event) => setForm(prev => ({...prev, description: event.target.value}))}/>
                        <div className="formInputs__inputs-block">
                            <Input label='Дата створення' type='date' placeholder='ДД.ММ.РРРР' onChange={(event) => {
                                let value = new Date(event.target.value).toISOString()
                                setForm(prev => ({...prev, creationDate: value}))}
                            }/>
                            <Input label='Автор' type='text' onChange={(event) => setForm(prev => ({...prev, author: event.target.value}))}/>
                        </div>
                        <div className="formInputs__inputs-block">
                            <Input label='Стартова ціна' type='number' placeholder='300' onChange={(event) => setForm(prev => ({...prev, startPrice: event.target.value}))}/>
                            <div className="input-group">
                                <label className='input-label'>Тип роботи</label>
                                <CustomSelect filter={newFilter} onChange={(value) => setForm(prev => ({...prev, tags: [...prev.tags, value + 1]}))}/>
                            </div>
                        </div>
                        <Button onClick={handleClick}>Завантажити</Button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default WorkDownloadComponent