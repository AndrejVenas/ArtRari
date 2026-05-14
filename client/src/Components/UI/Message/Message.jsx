import React, { useEffect, useState } from 'react'
import hammer from '../../../Images/hammer.svg'
import './style.css'

const Message = ({flag, setFlag, message}) => {
    const [active, setActive] = useState('')
    useEffect(() => {
        if(flag) {
            setActive('show')
            setTimeout(() => {
                setFlag(false);
                setActive('hide')
            }, 8000)
        }
    }, [flag])
  return (
    <div className='Message'>
        <div className="Message__container">
            <div className={"Message__content" + " " + active}>
                <img src={hammer} alt="hammer" className="Message__image"/>
                <p className="Message__text">{message}</p>
            </div>
        </div>
    </div>
  )
}

export default Message