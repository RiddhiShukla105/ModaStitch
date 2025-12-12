import { useState } from 'react'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import "primeicons/primeicons.css";
import appRoute from './Components/appRoute'
import ProtectedRoute from './Components/ProtectedRoute';





function App() {
  
  return (
   <>
    <Routes>
      {/* {appRoute.map((item,id)=>(
        <Route
          key={id}
          path={item.path}
          element={<item.Component/>}
        />
      ))} */}

      {appRoute.map((route, index) => {
  const Page = route.Component;

  return (
    <Route
      key={index}
      path={route.path}
      element={
        route.role ? (
          <ProtectedRoute roleRequired={route.role}>
            <Page />
          </ProtectedRoute>
        ) : (
          <Page />
        )
      }
    />
  );
})}

    </Routes>
   </>
  )
}

export default App
