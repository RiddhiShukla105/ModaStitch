import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';

const OrderTracking = () => {
  const [order, setOrder] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const steps = ['pending', 'confirmed', 'shipped', 'delivered'];

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  //  const fetchOrders = async () => {
  //     const res = await axios.get("http://localhost:5000/api/order/get-order");
  //     setOrder(res.data);
  //   };

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

    console.log("Fetched orders:", res.data); // check structure

    setOrder(Array.isArray(res.data.orders) ? res.data.orders : []); // ✅ use `orders`
  } catch (err) {
    console.error("Fetch Orders Error:", err.response?.data || err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8">My Orders</h1>

        {order.map(orderItem => {
          const isExpanded = expandedOrderId === orderItem._id;
          const currentStep = steps.indexOf(orderItem.status);

          return (
            <div
              key={orderItem._id}
              onClick={() => toggleExpand(orderItem._id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer mb-6 p-6"
            >
              {/* ===== COMPACT HEADER ===== */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold text-sm break-all">
                    {orderItem._id}
                  </p>

                  <p className="text-sm mt-1 text-gray-700">
                    ${orderItem.totalAmount} • {orderItem.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold capitalize
                      ${orderItem.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {orderItem.status}
                  </span>

                  <p className="text-xs mt-2 text-pink-600 font-medium">
                    {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                  </p>
                </div>
              </div>

              {/* ===== EXPANDED VIEW ===== */}
              {isExpanded && (
                <>
                  {/* STATUS TRACKER */}
                  <div className="flex mt-8 mb-6">
                    {steps.map((step, index) => (
                      <div key={step} className="flex-1 text-center">
                        <div
                          className={`h-1.5 mx-1 rounded-full
                            ${index <= currentStep ? 'bg-pink-500' : 'bg-gray-300'}`}
                        />
                        <p
                          className={`text-xs mt-2 capitalize
                            ${index <= currentStep ? 'text-black' : 'text-gray-400'}`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="my-5" />

                  {/* PRODUCTS */}
                  <h4 className="font-semibold mb-4">Items</h4>

                  {orderItem.products.map(product => (
                    <div
                      key={product.productId || product._id}
                      className="flex justify-between py-3 border-b last:border-none"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {product.qty}
                          {product.size && ` | Size: ${product.size}`}
                        </p>
                      </div>

                      <p className="font-semibold text-sm">
                        ${product.price}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
