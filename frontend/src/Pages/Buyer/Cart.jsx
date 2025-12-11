import React, { useState,useEffect } from "react";
import Header from "../../Components/Header";
import { useLocation,useParams,Link,useNavigate } from 'react-router-dom';

const Cart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Men Black Oversized T-Shirt",
  //     price: 799,
  //     mrp: 1299,
  //     size: "L",
  //     qty: 1,
  //     image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27384146/2024/3/12/fakeimg.jpg"
  //   },
  //   {
  //     id: 2,
  //     name: "Blue Regular Fit Shirt",
  //     price: 999,
  //     mrp: 1499,
  //     size: "M",
  //     qty: 1,
  //     image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/28419157/shirtfake.jpg"
  //   }
  // ]);


  const location = useLocation();
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  if (location.state) {
    setCartItems([location.state]);
  }
}, [location.state]);
  //  const token = localStorage.getItem("token");


  const updateQty = (id, diff) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + diff) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalMRP = cartItems.reduce((t, i) => t + i.mrp * i.qty, 0);
  const totalPrice = cartItems.reduce((t, i) => t + i.price * i.qty, 0);
  const discount = totalMRP - totalPrice;

  return (
    <>
      <Header />

      <div className="bg-gray-100 min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT — CART ITEMS */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 flex gap-5"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-36 object-cover rounded-lg"
                />

                {/* ITEM DETAILS */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Size: <span className="font-semibold">{item.size}</span>
                  </p>

                  {/* PRICE */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl font-bold">₹{item.price}</span>
                    <span className="line-through text-gray-400">
                      ₹{item.mrp}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                    </span>
                  </div>

                  {/* QUANTITY */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="border w-7 h-7 rounded flex items-center justify-center"
                    >
                      –
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="border w-7 h-7 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 flex gap-6 text-sm font-semibold">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-700 hover:text-black"
                    >
                      REMOVE
                    </button>
                    <button className="text-gray-700 hover:text-black">
                      MOVE TO WISHLIST
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT — PRICE DETAILS */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <h2 className="text-lg font-semibold pb-3 border-b">
              PRICE DETAILS
            </h2>

            <div className="mt-4 flex justify-between text-gray-600">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="mt-3 flex justify-between text-green-600">
              <span>Discount</span>
              <span>−₹{discount}</span>
            </div>

            <div className="mt-3 flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>

            <button className="w-full bg-pink-600 mt-6 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
