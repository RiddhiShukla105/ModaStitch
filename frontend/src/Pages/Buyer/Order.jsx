import React, { useContext, useState, useEffect } from "react";
import Header from "../../Components/Header";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Order = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const emptyUserDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: ""
};

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orders, setOrders] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/order/user-order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch Orders Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const placeOrder = async (e,method = paymentMethod) => {
    e.target.preventDefault();
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      alert("Please fill all required fields!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again!");
        return;
      }

      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          mrp: item.mrp,
          qty: item.qty,
          size: item.size,
          image: item.image
        })),
        ...userDetails,
        paymentMethod: method,
        totalAmount: cartItems.reduce((t, i) => t + i.price * i.qty, 0)
      };

      await axios.post(
        "http://localhost:5000/api/order/create-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      setCartItems([]);
      fetchOrders();

    } catch (err) {
      console.error("Place Order Error:", err.response?.data || err.message);
      alert("Failed to place order!");
    }
  };

  // ✅ SINGLE SOURCE OF TRUTH
  const totalPrice = cartItems.reduce((t, i) => t + i.price * i.qty, 0);

  return (
    <>
      <Header />

      <div className="bg-gray-100 min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

              <input name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} className="border p-2 rounded"/>
              <input name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} className="border p-2 rounded"/>
              <input name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleChange} className="border p-2 rounded"/>
              <textarea name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} className="border p-2 rounded"/>
              <input name="city" placeholder="City" value={userDetails.city} onChange={handleChange} className="border p-2 rounded"/>
              <input name="state" placeholder="State" value={userDetails.state} onChange={handleChange} className="border p-2 rounded"/>
              <input name="pincode" placeholder="Pincode" value={userDetails.pincode} onChange={handleChange} className="border p-2 rounded"/>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              {/* <label className="flex items-center gap-3 mb-2">
                <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
              </label> */}

              <label className="flex items-center gap-3">
                <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
                PayPal
              </label>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <h2 className="text-lg font-semibold pb-3 border-b">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mt-3">
                <span>{item.name} x {item.qty}</span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}

            <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>${totalPrice}</span>
            </div>

            {/* COD */}
            {paymentMethod === "cod" && (
              <button
                onClick={() => placeOrder("cod")}
                className="w-full bg-black mt-6 text-white py-3 rounded-lg text-lg font-semibold"
              >
                CONFIRM ORDER
              </button>
            )}

            {/* PAYPAL */}
            {paymentMethod === "online" && (
              <div className="mt-6">
                <PayPalButtons
                  createOrder={() => {
                    const token =localStorage.getItem("token");

                    return axios
                      .post(
                        "http://localhost:5000/api/order/paypal/create",
                        { amount: totalPrice }, // ✅ FIXED
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => res.data.id);
                  }}
                 onApprove={async (data) => {
  try {
    const token = localStorage.getItem("token");

    // 1️⃣ VERIFY PAYMENT FIRST
    await axios.post(
      "http://localhost:5000/api/order/paypal/verify",
      {
        paypalOrderId: data.orderID,
        products: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          size: item.size,
          image: item.image,
        })),
        ...userDetails,
        totalAmount: totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2️⃣ IMMEDIATELY RESOLVE PAYPAL FLOW
    alert("Payment successful!");
    setCartItems([]);
    setUserDetails(emptyUserDetails); 
    fetchOrders();

  } catch (err) {
    console.error("PayPal verify failed:", err.response?.data || err.message);
    alert("Payment verification failed!");
  }
}}

                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
