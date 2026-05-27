import React, { useEffect, useState } from 'react'
import './style.css'
import Input from '../../Components/UI/Input/Input'
import Textarea from '../../Components/UI/Textarea/Textarea'
import Button from '../../Components/UI/Button/Button'
import Popup from '../../Components/Popup/Popup'
import Image from '../../Components/UI/Image/Image'
import { useSelector } from 'react-redux'
import api from '../../api/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'
import { useActiveContext } from "../../Components/AppRouter"
import { EXHIBITIONS } from '../../constants'

const CreateExhibition = () => {

    const [close, setClose] = useState('')
    const [works, setWorks] = useState([])
    const [artWorks, setArtWorks] = useState([])
    const [image, setImage] = useState(null)
    const [workOpen, setWorkOpen] = useState(false)
    const [artWorksServer, setArtWorksServer] = useState([])

    const { token } = useSelector(state => state.Auth)
    const location = useLocation()

    const dataExhibition = location.state?.item
    const theme = location.state?.theme
    const navigate = useNavigate()

    const { setMessage, setActive } = useActiveContext()

    const [form, setForm] = useState({
        artworkIds: [],
        title: "",
        theme: "",
        description: "",
        backgroundUrl: "bck.com",
        thumbnailUrl: ""
    })

    const [errors, setErrors] = useState({
        title: false,
        theme: false,
        image: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }))
    }

    // const validate = () => {
    //     let newErrors = {}
    //
    //     if (!form.title.trim()) {
    //         newErrors.title = "Введите название выставки"
    //     } else if (form.title.trim().length < 3) {
    //         newErrors.title = "Минимум 3 символа"
    //     }
    //
    //     if (!image) {
    //         newErrors.image = "Добавьте изображение"
    //     }
    //
    //     setErrors(newErrors)
    //
    //     return Object.keys(newErrors).length === 0
    // }
    const validate = () => {
        let newErrors = {}
        let messages = []

        if (!form.title.trim()) {
            newErrors.title = true
            messages.push("Введіть назву виставки")
        } else if (form.title.trim().length < 3) {
            newErrors.title = true
            messages.push("Назва повинна містити мінімум 3 символи")
        }

        if (!form.theme.trim()) {
            newErrors.theme = true
            messages.push("Введіть тему виставки")
        } else if (form.theme.trim().length < 3) {
            newErrors.theme = true
            messages.push("Тема повина містити мінімум 3 символи")
        }

        if (!image) {
            newErrors.image = true
            messages.push("Додайте зображення")
        }

        setErrors(newErrors)

        if (messages.length) {
            setMessage(messages[0])
            setActive(true)
            return false
        }

        return true
    }

    useEffect(() => {
        if (!dataExhibition) return

        setForm({
            artworkIds: dataExhibition.artworks?.map(item => item.id),
            title: dataExhibition.title,
            theme: theme,
            description: dataExhibition.description,
            backgroundUrl: "bck.com",
            thumbnailUrl: dataExhibition.thumbnailUrl
        })
        console.log(dataExhibition.artworks)
        setWorks(dataExhibition.artworks)
        setArtWorksServer(dataExhibition.artworks)
        setImage(dataExhibition.thumbnailUrl)

    }, [dataExhibition])

    const getImage = async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await api.post('/artworks/image', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data.imageUrl
    }

    const createExhibitionAction = async () => {

        if (!validate()) {
            // setMessage("Заповніть всі поля!")
            // setActive(true)
            return
        }

        try {

            let resultImage = image

            if (image instanceof File) {
                resultImage = await getImage(image)
            }

            const data = {
                ...form,
                artworkIds: works.map(item => item.id),
                thumbnailUrl: resultImage
            }

            if (dataExhibition) {

                await api.put(`/exhibitions/${dataExhibition.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setMessage("Виставку успішно оновлено!")
                navigate(EXHIBITIONS)
            } else {

                await api.post('/exhibitions', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setMessage("Виставку успішно створено!")
                navigate(EXHIBITIONS)
            }

            setActive(true)

        } catch (error) {
            setMessage(error?.response?.data?.message || "Сталася помилка")
            setActive(true)
        }
    }

    const getArtWorks = async () => {
        try {
            const response = await api.get('/artworks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setArtWorks([...response.data.items, ...artWorksServer])

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArtWorks()
    }, [])

    const deleteWork = (work) => {
        setWorks(prev => prev.filter(item => item.id !== work.id))
        setArtWorks(prev => [...prev, work])
        setArtWorks(prev => [...new Set(prev)])
        //setArtWorksServer(prev => [...new Set(prev)])
    }
    /*const createExhibitionAction = async () => {

    if (!validate()) {
        setMessage("Заповніть всі поля!")
        setActive(true)
        return
    }

    try {

        let resultImage = image

        if (image instanceof File) {
            resultImage = await getImage(image)
        }

        const data = {
            ...form,
            artworkIds: works.map(item => item.id),
            thumbnailUrl: resultImage
        }

        if (dataExhibition) {

            await api.put(`/exhibitions/${dataExhibition.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setMessage("Виставку успішно оновлено!")

        } else {

            await api.post('/exhibitions', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setMessage("Виставку успішно створено!")
        }

        setActive(true)

    } catch (error) {
        setMessage(error?.response?.data?.message || "Сталася помилка")
        setActive(true)
    }
}*/
    useEffect(() => {
        console.log(artWorks)
    }, [artWorks, workOpen])
  /*return (
    <div className="createExhibition">
        <div className="createExhibition__container">
            <h1 className="createExhibition__title">{location.pathname.includes('create') ? 'Створення виставки' : 'Редагування виставки'}</h1>
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

                        {works?.length > 0 ?
                        <table className="form__block-table table">
                            <thead>
                                <tr>
                                    <th className="table__th">Назва</th>
                                    <th className="table__th">Ціна</th>
                                </tr>
                            </thead>
                            <tbody>
                            {works?.map((item, index) => {
                                return <tr className='table__tr'>
                                    <td className="table__tr-td">{item.title}</td>
                                    <td className="table__tr-td">{item.startPrice} $</td>
                                    <td className="table__tr-td"><img src={require('../../Images/close.svg').default} alt="закрити" onClick={() => deleteWork(item)}/></td>
                                </tr>
                            })}
                            </tbody>
                            <tfoot>
                                <tr className="table__trFooter">
                                    <td colSpan="4" className="table__trFooter-td" onClick={() => {
                                    setClose('open')
                                    setWorkOpen(true)}}>Додати ще роботи <span className='table__trFooter-span'>+</span></td>
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
    */return (
        <div className="createExhibition">

            <div className="createExhibition__container">

                <h1 className="createExhibition__title">
                    {location.pathname.includes("edit") ? "Редагування роботи" : "Створення виставки"}
                </h1>

                <form className="createExhibition__form form">

                    <div className="form__mainBlock">

                        <div className="form__block">

                            <Input
                                label='Назва виставки *'
                                name="title"
                                type='text'
                                placeholder='Грані реальності'
                                value={form.title}
                                onChange={handleChange}
                                error={errors.title}
                            />

                        </div>

                        <div className="form__block">

                            <Textarea
                                label='Опис виставки'
                                placeholder='Опис виставки'
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form__block">

                            <Input
                                label='Тема виставки *'
                                placeholder='Японія'
                                error={errors.theme}
                                name="theme"
                                value={form.theme}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form__block">

                            <Button type="button" onClick={createExhibitionAction}>
                                Зберегти
                            </Button>

                        </div>

                    </div>

                    <div className="form__mainBlock">

                        <div className="form__block">

                            <label className="form__block-label">
                                Додавання робіт
                            </label>

                            {works?.length > 0 ? (

                                <table className="form__block-table table">

                                    <thead>
                                    <tr>
                                        <th className="table__th">Назва</th>
                                        <th className="table__th">Ціна</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {works.map(item => (
                                        <tr className='table__tr' key={item.id}>
                                            <td className="table__tr-td">{item.title}</td>
                                            <td className="table__tr-td">{item.startPrice} $</td>
                                            <td className="table__tr-td">
                                                <img
                                                    src={require('../../Images/close.svg').default}
                                                    alt="remove"
                                                    onClick={() => deleteWork(item)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                    <tfoot>
                                    <tr className="table__trFooter">
                                        <td
                                            colSpan="4"
                                            className="table__trFooter-td"
                                            onClick={() => {
                                                setClose('open')
                                                setWorkOpen(true)
                                            }}
                                        >
                                            Додати ще роботи
                                            <span className='table__trFooter-span'>+</span>
                                        </td>
                                    </tr>
                                    </tfoot>

                                </table>

                            ) : (

                                <label
                                    className="form__block-dropZone dropZone"
                                    onClick={() => {
                                        setClose('open')
                                        setWorkOpen(true)
                                    }}
                                >

                                    <div className="dropZone__input" />

                                    <div className="dropZone__block">

                                        <div className="dropZone__plus">+</div>

                                        <span className="dropZone__subTitle">
                                            Додайте хоча б одну роботу
                                        </span>

                                    </div>

                                </label>

                            )}

                            <label className="form__block-label">
                                Додавання фотографії виставки *
                            </label>

                            <Image
                                className={errors.image ? "imageDownload--error" : ""}
                                style={{ padding: '60px 0px' }}
                                height={{ height: '118px' }}
                                value={image}
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                        </div>

                    </div>

                </form>

                <Popup
                    close={close}
                    setClose={setClose}
                    workOpen={workOpen}
                    setWorkOpen={setWorkOpen}
                    setWorks={setWorks}
                    artWorks={artWorks}
                    artWorksServer={artWorksServer}
                    setArtWorks={setArtWorks}
                    works={works}
                />

            </div>

        </div>
    )
}

export default CreateExhibition