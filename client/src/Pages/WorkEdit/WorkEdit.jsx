import React, { useState } from 'react'
import './WorkEdit.css'
import Input from "../../Components/UI/Input/Input";
import Textarea from "../../Components/UI/Textarea/Textarea";
import Button from "../../Components/UI/Button/Button";
import Image from "../../Components/UI/Image/Image";
import CustomSelect from "../../Components/UI/CustomSelect/CustomSelect";
import Title from "../../Components/UI/title/Title";

const EditWork = () => {

    const [form, setForm] = useState({
        title: 'Тиша, що пам’ятає світло',
        author: 'Іван Петров Іванович',
        description: 'Цей витвір мистецтва — тонка розмова між світлом і спогадами, зафіксована у шарі часу. Полотно ніби дихає спокоєм: м’які переходи кольорів створюють відчуття ранкового туману, в якому губляться силуети минулого. Автор досліджує крихкість моменту — ту межу, де реальність поступається відчуттям.',
        creationDate: '2026-04-14',
        photoUrl: '',
        startPrice: 300,
        type: 'Живопис'
    })

    const workTypes = {
        name: 'type',
        label: 'Тип роботи',
        type: 'select',
        options: [
            'Живопис',
            'Скульптура',
            'Графіка',
            'Фотографія'
        ]
    }

    const handleSave = () => {
        console.log('Оновлені дані:', form)
    }

    return (
        <section className='workDownloadComponent'>
            <div className="workDownloadComponent__container">
                <div className="workDownloadComponent__content">

                    <Title title={"Редагування роботи"}/>

                    <form
                        className="workDownloadComponent__form formInputs"
                        onSubmit={(event) => event.preventDefault()}
                    >

                        <Image
                            onChange={(event) =>
                                setForm(prev => ({
                                    ...prev,
                                    photoUrl: event.target.files[0]
                                }))
                            }
                        />

                        <div className="formInputs__inputs">

                            <Input
                                label='Назва роботи'
                                type='text'
                                value={form.title}
                                onChange={(event) =>
                                    setForm(prev => ({
                                        ...prev,
                                        title: event.target.value
                                    }))
                                }
                            />

                            <Textarea
                                label='Опис роботи'
                                value={form.description}
                                onChange={(event) =>
                                    setForm(prev => ({
                                        ...prev,
                                        description: event.target.value
                                    }))
                                }
                            />

                            <div className="formInputs__inputs-block">

                                <Input
                                    label='Дата створення'
                                    type='date'
                                    value={form.creationDate}
                                    onChange={(event) =>
                                        setForm(prev => ({
                                            ...prev,
                                            creationDate: event.target.value
                                        }))
                                    }
                                />

                                <Input
                                    label='Автор'
                                    type='text'
                                    value={form.author}
                                    onChange={(event) =>
                                        setForm(prev => ({
                                            ...prev,
                                            author: event.target.value
                                        }))
                                    }
                                />

                            </div>

                            <div className="formInputs__inputs-block">

                                <Input
                                    label='Стартова ціна'
                                    type='number'
                                    value={form.startPrice}
                                    onChange={(event) =>
                                        setForm(prev => ({
                                            ...prev,
                                            startPrice: event.target.value
                                        }))
                                    }
                                />

                                <div className="input-group">

                                    <label className='input-label'>
                                        Тип роботи
                                    </label>

                                    <CustomSelect
                                        filter={workTypes}
                                        value={form.type}
                                        onChange={(value) =>
                                            setForm(prev => ({
                                                ...prev,
                                                type: value
                                            }))
                                        }
                                    />

                                </div>

                            </div>

                            {/* Кнопка */}
                            <Button onClick={handleSave}>
                                Зберегти
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditWork