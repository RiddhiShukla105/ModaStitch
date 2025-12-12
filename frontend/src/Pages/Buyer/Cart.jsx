import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
  import { useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();

  const {
    cartItems,
    setCartItems,
    updateQty,
    removeItem
  } = useContext(CartContext);




const navigate = useNavigate();

  // If coming from product page (location.state), add single item
  useEffect(() => {
    if (location.state) {
      const item = location.state;

      setCartItems((prev) => {
        const exists = prev.find(
          (p) => p.id === item.id && p.size === item.size
        );

        // If already exists → increase qty
        if (exists) {
          return prev.map((p) =>
            p.id === item.id && p.size === item.size
              ? { ...p, qty: p.qty + 1 }
              : p
          );
        }

        // Else add new item
        return [...prev, { ...item, qty: 1 }];
      });
    }
  }, [location.state, setCartItems]);

  // Price calculations
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
                key={`${item.id}-${item.size}`}
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

            <button
  onClick={() => navigate("/order")}
  className="w-full bg-pink-600 mt-6 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition"
>
  PLACE ORDER
</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
