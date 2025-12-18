
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
    loadCart();
  }, []);

  // 🔹 Load cart from backend
  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/fetch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Load cart failed", err);
    }
  };


  // 🔹 ADD TO CART (BACKEND FIRST, THEN STATE)
  const addToCart = async ({ id, name, image, price, size }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // alert("Please login first");
      toast.warn("Please login first",{
        position:"top-right",
        autoClose:2000
      })
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          productId: id,   // ✅ MATCH SCHEMA
          name,
          image,
          price,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend returns FULL updated cart
      setCartItems(res.data);
      await loadCart();
    } catch (err) {
      console.error("Add to cart failed", err.response?.data || err);
    }
  };

  // 🔹 UPDATE QTY
  const updateQty = async (id, size, diff) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/update`,
        { productId: id, size, diff },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Qty update failed", err);
    }
  };

  // 🔹 REMOVE ITEM
  const removeItem = async (id, size) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/remove`,
        { productId: id, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeItem,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
