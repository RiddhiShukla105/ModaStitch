import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const CartContext=createContext();

export const CartProvider=({children})=>{
    const[cartItems,setCartItems]=useState([])

    useEffect(()=>{
        const fetchCart=async()=>{
            try{
                const res=await axios.get("")
                setCartItems(res.data.items||[])
                localStorage.setItem("cartItems", JSON.stringify(res.data.items || []));
            }catch(error){
                console.log(error)
            }
        }
        fetchCart();
    },[])

}



return(
    <CartContext.Provider value={{cartItems}}>
        {children}
    </CartContext.Provider>
)