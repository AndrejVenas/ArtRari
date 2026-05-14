import React from 'react'
import './style.css'
import searchImage from '../../../Images/search.svg'

const Search = ({onChange}) => {
  return (
    <div className="search">
        <form action="" className="form__search">
            <input type="text" className="form__search-input" placeholder='Наприклад: Японія' onChange={(event) => onChange("search", event.target.value)}/>
            <button className="form__search-button"><img src={searchImage} alt="search" /></button>
        </form>
    </div>
  )
}

export default Search