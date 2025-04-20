import React from 'react'
import Signup from './signup'
import App from '../App'
import { useState } from 'react'
import { createContext } from 'react'

export const logContext=createContext();

const Home = () => {
const [isLog,setisLog]=useState(false)   

    return (
    <logContext.Provider value={{setlog:setisLog}}>
    {
        isLog ? 
        <App />
        :
        <Signup />
    }
    </logContext.Provider>
  )
}

export default Home