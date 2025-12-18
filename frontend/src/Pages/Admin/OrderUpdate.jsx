import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';

const OrderUpdate = () => {
  const [order, setOrder] = useState([]);
  const [selectedstatus, setSelectedstatus] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const updateStatus = [
    { status: 'Pending' },
    { status: 'Confirmed' },
    { status: 'Shipped' },
    { status: 'Delivered' }
  ];

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/get-order`);
    setOrder(res.data);
  };

  const handleSubmit = async () => {
    if (!selectedOrderId || !selectedstatus) return;

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/order/edit-order/${selectedOrderId}`,
      { status: selectedstatus.status }
    );

    fetchdata();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      {/* 3 CARDS PER ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.map(orderItem => (
          <div
            key={orderItem._id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-5"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold text-xs break-all">
                  {orderItem._id}
                </p>
                
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize 
                ${getStatusClass(orderItem.status)}`}
              >
                {orderItem.status}
              </span>
            </div>

            {/* ORDER INFO */}
            <div className="text-sm space-y-1 mb-4">
              <p><strong>Total:</strong> ₹{orderItem.totalAmount}</p>
              <p><strong>Payment:</strong> {orderItem.paymentMethod.toUpperCase()}</p>
              <p><strong>City:</strong> {orderItem.city}</p>
              <p><strong>Pincode:</strong> {orderItem.pincode}</p>
              <p><strong>Transaction ID:</strong> {orderItem.paypalTransactionId}</p>
              
            </div>

            {/* PRODUCTS */}
            <div className="border-t pt-3 mb-4">
              <h4 className="font-semibold text-sm mb-2">Items</h4>

              <ul className="space-y-1 text-sm">
                {orderItem.products.map(product => (
                  <li
                    key={product.productId || product._id}
                    className="flex justify-between"
                  >
                    <span className="truncate w-40">{product.name}</span>
                    <span className="text-gray-500">x{product.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ACTION */}
            <div className="flex flex-col gap-3">
              <Dropdown
                value={selectedstatus}
                onChange={(e) => {
                  setSelectedstatus(e.value);
                  setSelectedOrderId(orderItem._id);
                }}
                options={updateStatus}
                optionLabel="status"
                placeholder="Update Status"
                className="w-full"
              />

              <button
                onClick={handleSubmit}
                className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                Update Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderUpdate;



