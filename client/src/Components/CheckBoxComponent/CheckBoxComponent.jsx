import React, { useEffect, useState } from 'react'
import CheckBox from '../UI/CheckBox/CheckBox';
import './style.css'
const CheckBoxComponent = ({onChange}) => {
    const [workOpen, setWorkOpen] = useState(false);
    const [tags, setTags] = useState([])

    useEffect(() => {
      onChange("checkbox", tags.map((item) => item))
    }, [tags])
  return (
    <>
    <div className="form__block-checkBox">
        <p className="form__block-tags">
        {tags?.length > 0 ? tags.map(item => <span className="form__block-tagsBlock">{item.name + " "}</span>) : "Теги для роботи"}</p>
        <p className="form__block-plus" onClick={() => setWorkOpen(true)}>+</p>
        {workOpen && <CheckBox setWorkOpen={setWorkOpen} setTagsArray={setTags}/>}
    </div>
    </>
  )
}

export default CheckBoxComponent