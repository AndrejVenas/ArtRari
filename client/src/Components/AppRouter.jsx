import React, { createContext, useContext, useState } from 'react'
import { authRoute, publicRoute } from '../route'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Message from './UI/Message/Message'

const ActiveContext = createContext()
export const useActiveContext = () => useContext(ActiveContext)
const AppRouter = () => {
  const {isAuth} = useSelector(state => state.Auth)
  const [active, setActive] = useState('')
  const [message, setMessage] = useState('')
  return (
    <main className='main' style={{flex: 1}}>
    <ActiveContext.Provider value={{active, setActive, message, setMessage}}>
        <Routes>
            {isAuth ? authRoute.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })
            :
            publicRoute.map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })}
        </Routes>
    </ActiveContext.Provider>
    {message?.length > 0 && <Message flag={active} setFlag={setActive} message={message}/>}
    </main>
  )
}

export default AppRouter