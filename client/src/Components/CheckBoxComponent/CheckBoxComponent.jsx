import React, { useEffect, useRef, useState } from 'react'
import CheckBox from '../UI/CheckBox/CheckBox';
import './style.css'

const CheckBoxComponent = ({
                               onChange,
                               tagsServer = [],
                               returnType = "objects",
                               className
                           }) => {

    const [workOpen, setWorkOpen] = useState(false);
    const [tags, setTags] = useState([])
    const initialized = useRef(false)
    useEffect(() => {
        console.log(tagsServer)
        //if(!tags) return
        let payload = tags;
        if (returnType === "ids") {
            payload = tags.map(item => item.id)
        } else if (returnType === "names") {
            payload = tags.map(item => item.name)
        } else {
            payload = tags
        }
        onChange("checkbox", payload)
    }, [tags])

    useEffect(() => {
        if (!tagsServer || tagsServer.length === 0 || initialized.current) {
            return
        }

        if (typeof tagsServer[0] === 'object') {
            setTags(tagsServer)
            initialized.current = true
        }
    }, [tagsServer])

    return (
        <>
            <div className="form__block-checkBox--wrapper">

                {/* Теги */}
                <div className="form__block-tagsList">
                    {tags.map((item, index) => (
                        <div
                            key={item.id}
                            className="form__block-tagsBlock"
                        >
                            {item?.name}
                        </div>
                    ))}
                </div>

                {/* Кнопка и popup */}
                <div className={`form__block-checkBox ${className || ''}`}>
                    <p className="form__block-tags">
                        Теги для роботи
                    </p>

                    <p
                        className="form__block-plus"
                        onClick={() => setWorkOpen(true)}
                    >
                        +
                    </p>

                    {workOpen && (
                        <CheckBox
                            setWorkOpen={setWorkOpen}
                            tagsArray={tags}
                            setTagsArray={setTags}
                        />
                    )}

                </div>

            </div>
        </>
    )
}

export default CheckBoxComponent