import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Add Product',
      desc: 'Add new products to store',
      icon: <FaPlusCircle size={30} />,
      route: '/admin',
      color: 'bg-blue-500'
    },
    {
      title: 'Order Management',
      desc: 'Update & track orders',
      icon: <FaShoppingCart size={30} />,
      route: '/orderupdate',
      color: 'bg-pink-500'
    },
    {
      title: 'Product Data',
      desc: 'View & manage products',
      icon: <FaBoxOpen size={30} />,
      route: '/product',
      color: 'bg-purple-500'
    },
    {
      title: 'User Data',
      desc: 'Manage registered users',
      icon: <FaUsers size={30} />,
      route: '/userdata',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer p-6 flex flex-col justify-between"
          >
            <div>
              <div
                className={`${card.color} text-white w-14 h-14 flex items-center justify-center rounded-lg mb-4`}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {card.title}
              </h3>

              <p className="text-sm text-gray-500">
                {card.desc}
              </p>
            </div>

            <button className="mt-6 text-sm text-blue-600 font-medium">
              Open →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;


