import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { WishlistProvider } from './Context/WishlistContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import './index.css'

import App from './App.jsx'

// PRIME REACT IMPORTS
import "primereact/resources/primereact.min.css";
// import "primeflex/primeflex.css";
// import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

createRoot(document.getElementById('root')).render(
   <CartProvider>
  <BrowserRouter>
  <StrictMode>
   <WishlistProvider>
 
    <App />
  
</WishlistProvider>
  </StrictMode>
  </BrowserRouter>
  </CartProvider>,
)
