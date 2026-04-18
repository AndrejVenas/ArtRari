import React from 'react'
import { route } from '../route'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <main className='main' style={{flex: 1}}>
        <Routes>
            {route.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })}
        </Routes>
    </main>
  )
}

export default AppRouter