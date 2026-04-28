import React from 'react'
import './style.css'
import addFile from '../../../Images/addFile.svg'

const Image = () => {
  return (
    <>
        <label htmlFor="imageDownload" className="imageDownload">
            <input id='imageDownload' className='imageDownload__input' type='file'/>
            <div className='imageDownload__block'>
              <img src={addFile} alt="addFile" className='imageDownload__block-image' />
              <p className="imageDownload__block-text text">Перетягніть зображення або <span className='text__bold'>завантажте</span></p>
            </div>
        </label>
    </>
  )
}

export default Image