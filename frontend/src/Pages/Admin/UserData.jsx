import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';

const UserData = () => {
  const [userdata, setUserdata] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const res = await axios.get("http://localhost:5000/api/user/getdata");
    setUserdata(res.data);
  };

  // 🔍 FILTER USERS
  const filteredUsers = userdata.filter(user =>
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.phone?.includes(search) ||
    user.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="relative mb-6">
  <h2 className="text-2xl font-semibold text-center">
    User Management
  </h2>

  <div className="absolute right-0 top-1/2 -translate-y-1/2">
    <InputText
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by email, phone, role..."
      className="p-inputtext-sm w-64"
    />
  </div>
</div>

      {/* USER CARDS */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No users found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((item) => (
            <Card
              key={item._id}
              className="shadow-md hover:shadow-lg transition rounded-xl"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                  {item.email?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="font-semibold text-gray-800 truncate">
                  {item.email}
                </p>
                <p className="text-sm text-gray-500">
                  📞 {item.phone || 'Not Provided'}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full 
                    ${item.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'}`}
                >
                  {item.role || 'User'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserData;
