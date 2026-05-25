import React from 'react'
import './style.css'
import searchImage from '../../../Images/search.svg'

const Search = ({onChange, onClick}) => {
  return (
    <div className="search">
        <form action="" className="form__search">
            <input type="search" className="form__search-input" placeholder='Наприклад: Японія' onChange={(event) => onChange("search", event.target.value)}/>
        </form>
    </div>
  )
}

export default Search