import React, { useEffect, useMemo, useState } from 'react'
import Image from '../UI/Image/Image'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import './style.css'
import Button from '../UI/Button/Button'
import api from '../../api/axiosInstance'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CheckBox from '../UI/CheckBox/CheckBox'
import CheckBoxComponent from '../CheckBoxComponent/CheckBoxComponent'

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

    const location = useLocation()
    const dataUpdate = location.state?.item
    const getTags = async () => {
        try {
            const response = await api.get('/tags')
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
            const response = await api.post('/artworks/image', formData, {
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
        console.log(form['photoUrl'])
        //setForm(prev => ({...prev, photoUrl: ''})) 
        let data = {}
        if(!form['photoUrl'].includes('picsum')) {
            const photoOfWork = await convertImage(formData.get('photoUrl'))
        data = {
            ...form,
            photoUrl: photoOfWork
        }
        } else {
            
            data = Object.keys(form).reduce((acc, key) => {
                const newKey = "new" + key.charAt(0).toUpperCase() + key.slice(1)
                acc[newKey] = form[key]
                return acc
            }, {})
        }
        if(!form['photoUrl']) {
            return
        } else if(!dataUpdate) {
        try {
        const response = await api.post('/artworks', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        //console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    } else  {
            try {
                const response = await api.put(`/artworks/${dataUpdate.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
       if(!dataUpdate) {
        return
       }
        if(Object.keys(dataUpdate).length > 0) {
            setForm({
                title: dataUpdate.title,
                author: dataUpdate.author,
                description: dataUpdate.description,
                technique: dataUpdate.technique,
                tags: dataUpdate.tags.map((item) => item),
                creationDate: dataUpdate.creationDate,
                photoUrl: dataUpdate.photoUrl,
                startPrice: dataUpdate.startPrice
            })
        }
    }, [dataUpdate])
  return (
    <section className='workDownloadComponent'>
        <div className="workDownloadComponent__container">
            <div className="workDownloadComponent__content">
                <h1 className="workDownloadComponent__title">Завантаження роботи</h1>
                <form action="" className="workDownloadComponent__form formInputs">
                    <Image value={form?.photoUrl} onChange={(event) => setForm(prev => ({...prev, photoUrl: event.target.files[0]}))}/>
                    <div className="formInputs__inputs">
                        <Input value={form?.title} label='Назва роботи' type='text' placeholder='Грані реальності' name='title' onChange={(event) => setForm(prev => ({...prev, title: event.target.value}))}/>
                        <Textarea value={form?.description} label='Опис роботи' placeholder='Грані реальності' name='description' onChange={(event) => setForm(prev => ({...prev, description: event.target.value}))}/>
                        <div className="formInputs__inputs-block">
                            <Input value={form?.creationDate} label='Дата створення' type='date' placeholder='ДД.ММ.РРРР' onChange={(event) => {
                                let value = new Date(event.target.value).toISOString()
                                setForm(prev => ({...prev, creationDate: value}))}
                            }/>
                            <Input value={form?.author} label='Автор' type='text' onChange={(event) => setForm(prev => ({...prev, author: event.target.value}))}/>
                        </div>
                        <Input value={form?.startPrice} label='Стартова ціна' type='number' placeholder='300' onChange={(event) => setForm(prev => ({...prev, startPrice: event.target.value}))}/>
                        <div className="formInputs__inputs-block">
                            <div className="input-group">
                                <label className='input-label'>Теги роботи</label>
                                <CheckBoxComponent onChange={(name, tags) => (setForm(prev => ({
                                    ...prev,
                                    //tags: tags
                                })))} tagsServer={form.tags} dataUpdate={dataUpdate}/>
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