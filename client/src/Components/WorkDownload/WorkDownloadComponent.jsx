import React, { useEffect, useMemo, useState } from 'react'
import Image from '../UI/Image/Image'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import './style.css'
import Button from '../UI/Button/Button'
import api from '../../api/axiosInstance'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CheckBox from '../UI/CheckBox/CheckBox'
import CheckBoxComponent from '../CheckBoxComponent/CheckBoxComponent'
import { useActiveContext } from "../../Components/AppRouter"
import { MY_WORK } from '../../constants'

const WorkDownloadComponent = () => {

    const { token } = useSelector(state => state.Auth)

    const { setMessage, setActive } = useActiveContext()

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

    // ================= ERRORS =================
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        creationDate: "",
        author: "",
        startPrice: "",
        tags: "",
        photoUrl: ""
    })

    const location = useLocation()
    const dataUpdate = location.state?.item
    const navigate = useNavigate()

    // ================= HANDLE CHANGE =================
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

    // ================= VALIDATION =================
    // const validate = () => {
    //
    //     let newErrors = {}
    //
    //     // TITLE
    //     if (!form.title.trim()) {
    //         newErrors.title = "Введите название работы"
    //     } else if (form.title.trim().length < 3) {
    //         newErrors.title = "Минимум 3 символа"
    //     }
    //
    //     // DESCRIPTION
    //     if (!form.description.trim()) {
    //         newErrors.description = "Введите описание"
    //     } else if (form.description.trim().length < 10) {
    //         newErrors.description = "Минимум 10 символов"
    //     }
    //
    //     // CREATION DATE
    //     if (!form.creationDate) {
    //         newErrors.creationDate = "Введите дату"
    //     }
    //
    //     // AUTHOR
    //     if (!form.author.trim()) {
    //         newErrors.author = "Введите автора"
    //     }
    //
    //     // START PRICE
    //     if (!form.startPrice || Number(form.startPrice) <= 0) {
    //         newErrors.startPrice = "Введите корректную цену"
    //     }
    //
    //     // TAGS
    //     if (!form.tags.length) {
    //         newErrors.tags = "Выберите хотя бы один тег"
    //     }
    //
    //     // IMAGE
    //     const isEmptyImage =
    //         !form.photoUrl ||
    //         (typeof form.photoUrl === "string" &&
    //             form.photoUrl.trim() === "")
    //
    //     if (isEmptyImage) {
    //         newErrors.photoUrl = "Добавьте изображение"
    //     }
    //
    //     setErrors(newErrors)
    //
    //     return Object.keys(newErrors).length === 0
    // }
    const validate = () => {

        const newErrors = {}

        // ================= TITLE =================
        const title = form.title.trim()

        if (!title) {

            newErrors.title =
                "Введіть назву роботи"

        } else if (title.length < 3) {

            newErrors.title =
                "Назва повинна містити мінімум 3 символи"

        } else if (title.length > 100) {

            newErrors.title =
                "Назва не повинна перевищувати 100 символів"
        }

        // ================= DESCRIPTION =================
        const description = form.description.trim()

        if (!description) {

            newErrors.description =
                "Введіть опис роботи"

        } else if (description.length < 10) {

            newErrors.description =
                "Опис повинен містити мінімум 10 символів"

        } else if (description.length > 2000) {

            newErrors.description =
                "Опис занадто довгий"
        }

        // ================= AUTHOR =================
        const author = form.author.trim()

        if (!author) {

            newErrors.author =
                "Вкажіть автора"

        } else if (author.length < 2) {

            newErrors.author =
                "Ім’я автора занадто коротке"

        } else if (
            !/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/.test(author)
        ) {

            newErrors.author =
                "Автор може містити лише літери"
        }

        // ================= DATE =================
        if (!form.creationDate) {

            newErrors.creationDate =
                "Вкажіть дату створення"

        } else {

            const selectedDate =
                new Date(form.creationDate)

            const currentDate = new Date()

            if (selectedDate > currentDate) {

                newErrors.creationDate =
                    "Дата створення не може бути у майбутньому"
            }
        }

        // ================= PRICE =================
        const price = Number(form.startPrice)

        if (!form.startPrice) {

            newErrors.startPrice =
                "Вкажіть стартову ціну"

        } else if (isNaN(price)) {

            newErrors.startPrice =
                "Ціна повинна бути числом"

        } else if (price <= 0) {

            newErrors.startPrice =
                "Ціна повинна бути більшою за 0"

        } else if (price > 10000000) {

            newErrors.startPrice =
                "Занадто велика стартова ціна"
        }

        // ================= TAGS =================
        if (!form.tags.length) {

            newErrors.tags =
                "Оберіть хоча б один тег"
        }

        // ================= IMAGE =================
        const isEmptyImage =
            !form.photoUrl ||
            (
                typeof form.photoUrl === "string" &&
                form.photoUrl.trim() === ""
            )

        if (isEmptyImage) {

            newErrors.photoUrl =
                "Завантажте зображення"

        } else if (typeof form.photoUrl !== "string") {

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ]

            if (
                !allowedTypes.includes(form.photoUrl.type)
            ) {

                newErrors.photoUrl =
                    "Дозволені лише JPG, PNG або WEBP"
            }

            const maxSize = 5 * 1024 * 1024

            if (form.photoUrl.size > maxSize) {

                newErrors.photoUrl =
                    "Розмір файлу не повинен перевищувати 5MB"
            }
        }

        setErrors(newErrors)

        // первое уведомление сверху
        if (Object.keys(newErrors).length > 0) {

            setMessage(
                Object.values(newErrors)[0]
            )

            setActive(true)
        }

        return Object.keys(newErrors).length === 0
    }

    // ================= GET TAGS =================
    const getTags = async () => {
        try {

            const response = await api.get('/tags')
            setTags(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const filter = {
        name: "type",
        label: "Оберіть тег роботи",
        type: "select",
        options: []
    }

    useEffect(() => {
        getTags()
    }, [])

    const newFilter = useMemo(() => {
        return {
            ...filter,
            options: tags.map((item) => item.name)
        }
    }, [tags])

    // ================= IMAGE UPLOAD =================
    const convertImage = async (image) => {

        const formData = new FormData()
        formData.append('file', image)

        try {

            const response = await api.post('/artworks/image', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return response.data.imageUrl

        } catch (error) {
            console.log(error.response)
        }
    }

    // ================= SUBMIT =================
    const handleClick = async () => {

        if (!validate()) {
            // setMessage("Заповніть всі поля!")
            // setActive(true)
            return
        }

        try {

            let data = {}
            let photoOfWork = form.photoUrl

            if (typeof form.photoUrl !== 'string') {
                photoOfWork = await convertImage(form.photoUrl)
            }

            data = {
                ...form,
                photoUrl: photoOfWork
            }

            // UPDATE
            if (dataUpdate) {

                data = Object.keys(data).reduce((acc, key) => {

                    const newKey =
                        "new" +
                        key.charAt(0).toUpperCase() +
                        key.slice(1)

                    acc[newKey] = data[key]

                    return acc

                }, {})

                await api.put(`/artworks/${dataUpdate.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setMessage("Роботу успішно оновлено!")
                navigate(MY_WORK)
            }

            // CREATE
            else {

                await api.post('/artworks', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setMessage("Роботу успішно створено!")
                navigate(MY_WORK)
            }

            setActive(true)

        } catch (error) {

            const serverData = error?.response?.data

            // FIELD ERRORS
            if (serverData?.fieldErrors) {

                setErrors(prev => ({
                    ...prev,
                    ...serverData.fieldErrors
                }))

                // берем первую ошибку для Message
                const firstError = Object.values(
                    serverData.fieldErrors
                )[0]

                setMessage(firstError)

            } else {

                setMessage(
                    serverData?.message ||
                    "Сталася помилка"
                )
            }

            setActive(true)
        }
    }

    // ================= EDIT INIT =================
    useEffect(() => {

        if (!dataUpdate) return

        if (Object.keys(dataUpdate).length > 0) {

            setForm({
                title: dataUpdate.title,
                author: dataUpdate.author,
                description: dataUpdate.description,
                technique: dataUpdate.technique,
                tags: (dataUpdate.tags || []).map((item) => ({
                    id: item.id,
                    name: item.name
                })),
                creationDate: dataUpdate.creationDate,
                photoUrl: dataUpdate.photoUrl,
                startPrice: dataUpdate.startPrice
            })
        }

    }, [dataUpdate])
  /*return (
    <section className='workDownloadComponent'>
        <div className="workDownloadComponent__container">
            <div className="workDownloadComponent__content">
                <h1 className="workDownloadComponent__title">{location.pathname.includes('edit') ? 'Редагування роботи' : 'Завантаження роботи'}</h1>
                <form action="" className="workDownloadComponent__form formInputs">
                    <Image value={form?.photoUrl} onChange={(event) => setForm(prev => ({...prev, photoUrl: event.target.files[0]}))}/>
                    <div className="formInputs__inputs">
                        <Input value={form?.title} label='Назва роботи' type='text' placeholder='Грані реальності' name='title' onChange={(event) => setForm(prev => ({...prev, title: event.target.value}))}/>
                        <Textarea value={form?.description} label='Опис роботи' placeholder='Грані реальності' name='description' onChange={(event) => setForm(prev => ({...prev, description: event.target.value}))}/>
                        <div className="formInputs__inputs-block">
                            <Input value={form?.creationDate.slice(0, 10)} label='Дата створення' type='date' placeholder='ДД.ММ.РРРР' onChange={(event) => {
                                let value = new Date(event.target.value).toISOString()
                                setForm(prev => ({...prev, creationDate: value}))}
                            }/>
                            <Input value={form?.author} label='Автор' type='text' onChange={(event) => setForm(prev => ({...prev, author: event.target.value}))}/>
                        </div>
                        <Input value={form?.startPrice} label='Стартова ціна' type='number' placeholder='300' onChange={(event) => setForm(prev => ({...prev, startPrice: event.target.value}))}/>
                        <div className="formInputs__inputs-block">
                            <div className="input-group">
                                <label className='input-label'>Теги роботи</label>
                                <CheckBoxComponent
                                    returnType="ids"
                                    onChange={(name, tags) =>*/

    return (
        <section className='workDownloadComponent'>

            <div className="workDownloadComponent__container">

                <div className="workDownloadComponent__content">

                    <h1 className="workDownloadComponent__title">
                        {location.pathname.includes("edit") ? "Редагування роботи" : "Завантаження роботи"}
                    </h1>

                    <form
                        action=""
                        className="workDownloadComponent__form formInputs"
                    >

                        {/* IMAGE */}
                        <Image
                            className={
                                errors.photoUrl
                                    ? "imageDownload--error"
                                    : ""
                            }
                            value={form?.photoUrl}
                            onChange={(event) =>
                                setForm(prev => ({
                                    ...prev,
                                    photoUrl: event.target.files[0]
                                }))
                            }
                        />

                        <div className="formInputs__inputs">

                            {/* TITLE */}
                            <Input
                                value={form?.title}
                                label='Назва роботи'
                                type='text'
                                placeholder='Грані реальності'
                                name='title'
                                onChange={handleChange}
                                error={errors.title}
                            />

                            {/* DESCRIPTION */}
                            <Textarea
                                value={form?.description}
                                label='Опис роботи'
                                placeholder='Грані реальності'
                                name='description'
                                onChange={handleChange}
                                error={errors.description}
                            />

                            <div className="formInputs__inputs-block">

                                {/* DATE */}
                                <Input
                                    value={form?.creationDate?.slice(0, 10)}
                                    label='Дата створення'
                                    type='date'
                                    placeholder='ДД.ММ.РРРР'
                                    error={errors.creationDate}
                                    onChange={(event) => {

                                        let value =
                                            new Date(event.target.value)
                                                .toISOString()

                                        setForm(prev => ({
                                            ...prev,
                                            creationDate: value
                                        }))
                                    }}
                                />

                                {/* AUTHOR */}
                                <Input
                                    value={form?.author}
                                    label='Автор'
                                    type='text'
                                    name='author'
                                    onChange={handleChange}
                                    error={errors.author}
                                />

                            </div>

                            {/* PRICE */}
                            <Input
                                value={form?.startPrice}
                                label='Стартова ціна'
                                type='number'
                                placeholder='300'
                                name='startPrice'
                                onChange={handleChange}
                                error={errors.startPrice}
                            />

                            {/* TAGS */}
                            <div className="formInputs__inputs-block">

                                <div
                                    className={`input-group`}
                                >

                                    <label className='input-label'>
                                        Теги роботи
                                    </label>

                                    <CheckBoxComponent
                                        className={`${errors.tags ? 'imageDownload--error' : ''}`}
                                        returnType="ids"
                                        onChange={(name, tags) =>
                                            setForm(prev => ({
                                                ...prev,
                                                tags
                                            }))
                                        }
                                        tagsServer={form.tags}
                                    />

                                </div>

                            </div>

                            {/* BUTTON */}
                            <Button onClick={handleClick}>
                                Завантажити
                            </Button>

                        </div>

                    </form>

                </div>

            </div>

        </section>
    )
}

export default WorkDownloadComponent