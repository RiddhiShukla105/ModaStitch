// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(
//     JSON.parse(localStorage.getItem("cartItems")) || []
//   );

//   // Save cart to localStorage
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add item
//   const addToCart = async (item) => {
//     const currentToken = localStorage.getItem("token");

//     if (!currentToken) {
//       alert("Please login first");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/cart/add",
//         {
//           productId: item.id,
//           name: item.name,
//           image: item.image,
//           price: item.price,
//           size: item.size,
//         },
//         {
//           headers: { Authorization: `Bearer ${currentToken}` },
//         }
//       );

//       // LOCAL UPDATE (your original logic)
//       setCartItems((prev) => {
//         const exists = prev.find(
//           (p) => p.id === item.id && p.size === item.size
//         );

//         if (exists) {
//           return prev.map((p) =>
//             p.id === item.id && p.size === item.size
//               ? { ...p, qty: p.qty + 1 }
//               : p
//           );
//         }

//         return [...prev, { ...item, qty: item.qty || 1 }];
//       });
//     } catch (error) {
//       console.error("Error adding to cart:", error.response?.data || error);

//       if (error.response?.status === 401) {
//         localStorage.removeItem("token");
//         setCartItems([]);
//         alert("Session expired. Please login again.");
//         window.location.href = "/login";
//       }
//     }
//   };

//   // Update Qty
//  const updateQty = (id, size, diff) => {
//   setCartItems((prev) =>
//     prev.map((item) =>
//       item.id === id && item.size === size
//         ? { ...item, qty: Math.max(1, item.qty + diff) }
//         : item
//     )
//   );
// };

//   // Remove item
// const removeItem = async (id, size) => {
//   try {
//     const token = localStorage.getItem("token");

//     await axios.post(
//       "http://localhost:5000/api/cart/remove",
//       { productId: id, size },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setCartItems((prev) =>
//       prev.filter((item) => !(item.id === id && item.size === size))
//     );
//   } catch (error) {
//     console.log("Error removing item:", error);
//   }
// };


//   // Clear whole cart
//   const clearCart = async () => {
//     const currentToken = localStorage.getItem("token");
//     if (!currentToken) return;

//     try {
//       await axios.post(
//         "http://localhost:5000/api/cart/clear",
//         {},
//         {
//           headers: { Authorization: `Bearer ${currentToken}` },
//         }
//       );

//       setCartItems([]);
//       localStorage.removeItem("cartItems");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         updateQty,
//         removeItem,
//         clearCart,
//         setCartItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/api/cart/fetch", {
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
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
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
        "http://localhost:5000/api/cart/update",
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
        "http://localhost:5000/api/cart/remove",
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
