import { useState } from 'react'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import "primeicons/primeicons.css";
import appRoute from './Components/appRoute'




function App() {
  
  return (
   <>
    <Routes>
      {appRoute.map((item,id)=>(
        <Route
          key={id}
          path={item.path}
          element={<item.Component/>}
        />
      ))}
    </Routes>
   </>
  )
}

export default App
