// import React, { useContext, useState, useEffect } from "react";
// import Header from "../../Components/Header";
// import { CartContext } from "../../Context/CartContext";
// import axios from "axios";

// const Order = () => {
//   const { cartItems, setCartItems } = useContext(CartContext);

//   // Shipping form
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // Selected order modal
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Fetch all orders
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/order/get-order");
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Place order
//   const handlePlaceOrder = async () => {
//     if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
//       alert("Please fill all required fields!");
//       return;
//     }
//     if (cartItems.length === 0) {
//       alert("Cart is empty!");
//       return;
//     }

//     try {
//       const orderData = {
//         products: cartItems.map((item) => ({
//           productId: item.id,
//           name: item.name,
//           price: item.price,
//           mrp: item.mrp,
//           qty: item.qty,
//           size: item.size,
//           image: item.image
//         })),
//         ...userDetails,
//         paymentMethod: "cod", // optionally allow user to select
//         totalAmount: cartItems.reduce((t, i) => t + i.price * i.qty, 0)
//       };

//       const res = await axios.post("/api/orders", orderData);
//       console.log(res.data);
//       alert("Order placed successfully!");
//       setCartItems([]); // clear cart after order
//       fetchOrders(); // refresh order list
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order!");
//     }
//   };

//   const totalPrice = cartItems.reduce((t, i) => t + i.price * i.qty, 0);

//   return (
//     <>
//       <Header />

//       <div className="bg-gray-100 min-h-screen p-6 md:p-10">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

//           {/* LEFT — Shipping Form */}
//           <div className="md:col-span-2 bg-white p-6 rounded-xl shadow flex flex-col gap-4">
//             <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
//             <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} className="border p-2 rounded"/>
//             <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} className="border p-2 rounded"/>
//             <input type="tel" name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleChange} className="border p-2 rounded"/>
//             <textarea name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} className="border p-2 rounded"/>
//             <input type="text" name="city" placeholder="City" value={userDetails.city} onChange={handleChange} className="border p-2 rounded"/>
//             <input type="text" name="state" placeholder="State" value={userDetails.state} onChange={handleChange} className="border p-2 rounded"/>
//             <input type="text" name="pincode" placeholder="Pincode" value={userDetails.pincode} onChange={handleChange} className="border p-2 rounded"/>
//           </div>

//           {/* RIGHT — Order Summary */}
//           <div className="bg-white rounded-xl shadow p-5 h-fit">
//             <h2 className="text-lg font-semibold pb-3 border-b">Order Summary</h2>
//             {cartItems.map((item) => (
//               <div key={`${item.id}-${item.size}`} className="flex justify-between mt-3">
//                 <span>{item.name} x {item.qty}</span>
//                 <span>₹{item.price * item.qty}</span>
//               </div>
//             ))}
//             <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
//               <span>Total Amount</span>
//               <span>₹{totalPrice}</span>
//             </div>
//             <button onClick={handlePlaceOrder} className="w-full bg-black mt-6 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
//               CONFIRM ORDER
//             </button>
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">All Orders</h2>
//           {orders.map((order) => (
//             <div key={order._id} className="flex justify-between border-b py-2">
//               <span>Order #{order._id.slice(-5)}</span>
//               <button className="text-blue-600 hover:underline" onClick={() => setSelectedOrder(order)}>
//                 View
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Modal for selected order */}
//         {selectedOrder && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
//               <h2 className="text-lg font-semibold mb-4">Order Items</h2>
//               {selectedOrder.products.map((item) => (
//                 <div key={item.productId} className="flex justify-between mb-2">
//                   <span>{item.name} x {item.qty}</span>
//                   <span>₹{item.price * item.qty}</span>
//                 </div>
//               ))}
//               <div className="mt-4 font-bold">Total: ₹{selectedOrder.totalAmount}</div>
//               <div className="mt-2">Status: <span className="font-semibold">{selectedOrder.status}</span></div>
//               <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => setSelectedOrder(null)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Order;

import React, { useContext, useState, useEffect } from "react";
import Header from "../../Components/Header";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

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

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/get-order");
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Razorpay payment
  const openRazorpay = async (amount) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // replace with your key
      amount: amount * 100, // amount in paise
      currency: "INR",
      name: "Your Shop Name",
      description: "Order Payment",
      handler: async function (response) {
        console.log("Razorpay payment success:", response);
        await placeOrder("online"); // call placeOrder with online
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: { color: "#F472B6" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const placeOrder = async (method = paymentMethod) => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      alert("Please fill all required fields!");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
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

      const res = await axios.post("http://localhost:5000/api/order/create-order", orderData);
      console.log(res.data);
      alert("Order placed successfully!");
      setCartItems([]);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to place order!");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "cod") {
      placeOrder("cod");
    } else if (paymentMethod === "online") {
      const totalAmount = cartItems.reduce((t, i) => t + i.price * i.qty, 0);
      openRazorpay(totalAmount);
    }
  };

  const totalPrice = cartItems.reduce((t, i) => t + i.price * i.qty, 0);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT — Shipping & Payment */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} className="border p-2 rounded"/>
              <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} className="border p-2 rounded"/>
              <input type="tel" name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleChange} className="border p-2 rounded"/>
              <textarea name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} className="border p-2 rounded"/>
              <input type="text" name="city" placeholder="City" value={userDetails.city} onChange={handleChange} className="border p-2 rounded"/>
              <input type="text" name="state" placeholder="State" value={userDetails.state} onChange={handleChange} className="border p-2 rounded"/>
              <input type="text" name="pincode" placeholder="Pincode" value={userDetails.pincode} onChange={handleChange} className="border p-2 rounded"/>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="radio" name="payment" value="cod" checked={paymentMethod==="cod"} onChange={() => setPaymentMethod("cod")} className="mr-3"/>
                Cash on Delivery
              </label>
              <label className="flex items-center gap-3 mb-2 cursor-pointer">
                <input type="radio" name="payment" value="online" checked={paymentMethod==="online"} onChange={() => setPaymentMethod("online")} className="mr-3"/>
                Online Payment
              </label>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <h2 className="text-lg font-semibold pb-3 border-b">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between mt-3">
                <span>{item.name} x {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-black mt-6 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
              CONFIRM ORDER
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {Array.isArray(orders) && orders.map(order => (
            <div key={order._id} className="flex justify-between border-b py-2">
              <span>Order #{order._id.slice(-5)}</span>
              <button className="text-blue-600 hover:underline" onClick={() => setSelectedOrder(order)}>
                View
              </button>
            </div>
          ))}
        </div>

        {/* Modal for selected order */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              {selectedOrder.products.map((item) => (
                <div key={item.productId} className="flex justify-between mb-2">
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="mt-4 font-bold">Total: ₹{selectedOrder.totalAmount}</div>
              <div className="mt-2">Status: <span className="font-semibold">{selectedOrder.status}</span></div>
              <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;

