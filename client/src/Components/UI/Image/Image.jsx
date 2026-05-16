import React from 'react'
import './style.css'
import addFile from '../../../Images/addFile.svg'

const Image = ({style, height, onChange, value}) => {
  return (
    <>
        <label htmlFor="imageDownload" className="imageDownload">
            <input id='imageDownload' className='imageDownload__input' type='file' onChange={onChange}/>
            <div className='imageDownload__block' style={style}>
              <img src={value ? value : addFile} alt="addFile" className='imageDownload__block-image' style={height}/>
              <p className="imageDownload__block-text text">Перетягніть зображення або <span className='text__bold'>завантажте</span></p>
            </div>
        </label>
    </>
  )
}

export default Image