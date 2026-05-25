import React, { useRef } from 'react'
import './style.css'
import addFile from '../../../Images/addFile.svg'

const Image = ({ style, height, onChange, value, className }) => {
    const inputRef = useRef(null)

    const getPreview = () => {
        if (!value) return addFile

        if (value instanceof File) {
            return URL.createObjectURL(value)
        }

        if (typeof value === 'string') {
            return value
        }

        return addFile
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) onChange({ target: { files: [file] } })
    }

    return (
        <label
            htmlFor="imageDownload"
            className={`imageDownload ${className || ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input
                ref={inputRef}
                id='imageDownload'
                className='imageDownload__input'
                type='file'
                onChange={onChange}
            />

            <div className='imageDownload__block' style={style}>

                <img
                    src={getPreview()}
                    alt="upload"
                    className='imageDownload__block-image'
                    style={height}
                />

                <p className="imageDownload__block-text text">
                    Перетягніть зображення або{" "}
                    <span className='text__bold'>завантажте</span>
                </p>

            </div>
        </label>
    )
}

export default Image