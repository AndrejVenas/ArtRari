import React, { useEffect, useState } from 'react'
import CheckBox from '../UI/CheckBox/CheckBox';
import './style.css'

const CheckBoxComponent = ({
                               onChange,
                               tagsServer = [],
                               returnType = "objects"
                           }) => {

    const [workOpen, setWorkOpen] = useState(false);
    const [tags, setTags] = useState([])

    useEffect(() => {

        if (returnType === "ids") {
            onChange(
                "checkbox",
                tags.map(item => item.id)
            )
        } else if (returnType === "names") {
            onChange(
                "checkbox",
                tags.map(item => item.name)
            )
        } else {
            onChange("checkbox", tags)
        }

    }, [tags])

    useEffect(() => {
        if (tagsServer.length === 0) {
            return
        }

        setTags(tagsServer)

    }, [tagsServer])

    return (
        <>
            <div className="form__block-checkBox--wrapper">

                {/* Теги */}
                <div className="form__block-tagsList">
                    {tags.map((item, index) => (
                        <div
                            key={index}
                            className="form__block-tagsBlock"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* Кнопка и popup */}
                <div className="form__block-checkBox">
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