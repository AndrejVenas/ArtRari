import React, { createContext, useContext, useState } from 'react'
import { authRoute, curatorRoute, publicRoute } from '../route'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Message from './UI/Message/Message'

const ActiveContext = createContext()
export const useActiveContext = () => useContext(ActiveContext)
const AppRouter = () => {
  const {isAuth, role} = useSelector(state => state.Auth)
  const [active, setActive] = useState('')
  const [message, setMessage] = useState('')
  const checkRoute = (role) => {
    if(role == "user") {
        return authRoute
    } else if(role == "curator") {
        return curatorRoute
    } else {
        return publicRoute
    }
  }
  return (
    <main className='main' style={{flex: 1}}>
    <ActiveContext.Provider value={{active, setActive, message, setMessage}}>
        <Routes>
            {checkRoute(role).map(({path, Element}, index) => {
                return <Route key={index} path={path} element={<Element />} />
            })}
        </Routes>
    </ActiveContext.Provider>
    {message?.length > 0 && <Message flag={active} setFlag={setActive} message={message}/>}
    </main>
  )
}

export default AppRouter