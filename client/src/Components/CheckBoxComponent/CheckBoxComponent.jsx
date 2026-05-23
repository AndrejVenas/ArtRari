import React, {useEffect, useState} from 'react'
import CheckBox from '../UI/CheckBox/CheckBox';
import './style.css'

const CheckBoxComponent = ({onChange, tagsServer = []}) => {
    const [workOpen, setWorkOpen] = useState(false);
    const [tags, setTags] = useState([])

    useEffect(() => {
        onChange("checkbox", tags.map((item) => item.id))
        console.log(tags)
    }, [tags])

    useEffect(() => {
        if(tagsServer.length == 0) {
            return
        }
        //console.log(tagsServer)
        setTags(tagsServer)
        console.log(tags)
    }, [tagsServer])
    return (
        <>
            {/*<div className="form__block-checkBox">*/}
            {/*    <p className="form__block-tags">*/}
            {/*        {tags?.length > 0 ? tags.map(item => <span className="form__block-tagsBlock">{item.name + " "}</span>) : "Теги для роботи"}</p>*/}
            {/*    <p className="form__block-plus" onClick={() => setWorkOpen(true)}>+</p>*/}
            {/*    {workOpen && <CheckBox setWorkOpen={setWorkOpen} setTagsArray={setTags}/>}*/}
            {/*</div>*/}

            {/*<div className="form__block-checkBox--wrapper">*/}
            {/*    {tags.map(item => <div className="form__block-tagsBlock">{item.name + " "}</div>)}*/}
            {/*    <div className="form__block-checkBox">*/}
            {/*        <p className="form__block-tags">Теги для роботи</p>*/}
            {/*        <p className="form__block-plus" onClick={() => setWorkOpen(true)}>+</p>*/}
            {/*        {workOpen && <CheckBox setWorkOpen={setWorkOpen} setTagsArray={setTags}/>}*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* test */}

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