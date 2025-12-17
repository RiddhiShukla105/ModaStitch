// import { useState } from 'react'
// import viteLogo from '/vite.svg'
// import {Routes,Route} from 'react-router-dom'
// import './App.css'
// import "primeicons/primeicons.css";
// import appRoute from './Components/appRoute'
// import ProtectedRoute from './Components/ProtectedRoute';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";





// function App() {
  
//   return (
//    <>
//    <PayPalScriptProvider
//       options={{
//         "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//         currency: "USD"
//       }}
//     >
//     <Routes>
//       {/* {appRoute.map((item,id)=>(
//         <Route
//           key={id}
//           path={item.path}
//           element={<item.Component/>}
//         />
//       ))} */}

//       {appRoute.map((route, index) => {
//   const Page = route.Component;

//   return (
//     <Route
//       key={index}
//       path={route.path}
//       element={
//         route.role ? (
//           <ProtectedRoute roleRequired={route.role}>
//             <Page />
//           </ProtectedRoute>
//         ) : (
//           <Page />
//         )
//       }
//     />
//   );
// })}

//     </Routes>
//     </PayPalScriptProvider>
//    </>
//   )
// }

// export default App

import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import appRoute from "./Components/appRoute";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture"
      }}
    >
      <Routes>
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
    </PayPalScriptProvider>
  );
}

export default App;

