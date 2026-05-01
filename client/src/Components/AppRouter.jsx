import React from 'react'
import { authRoute, publicRoute } from '../route'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const {isAuth} = useSelector(state => state.Auth)
  return (
    <main className='main' style={{flex: 1}}>
        <Routes>
            {isAuth ? authRoute.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })
            :
            publicRoute.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })}
        </Routes>
    </main>
  )
}

export default AppRouter