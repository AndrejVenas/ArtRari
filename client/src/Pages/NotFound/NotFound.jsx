import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    return (
        <section className='notFound'>

            <div className="notFound__container">

                <div className="notFound__content">

                    <span className="notFound__code">
                        404
                    </span>

                    <h1 className="notFound__title">
                        Сторінку не знайдено
                    </h1>

                    <p className="notFound__text">
                        Можливо сторінка була видалена,
                        перейменована або тимчасово недоступна
                    </p>

                    <Link
                        to="/"
                        className='notFound__button'
                    >
                        Повернутися на головну
                    </Link>

                </div>

            </div>

        </section>
    )
}

export default NotFound