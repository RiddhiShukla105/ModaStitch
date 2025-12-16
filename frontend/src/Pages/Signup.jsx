import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "" 
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.email || !form.password|| !form.phone) {
    Swal.fire({ icon: "warning", title: "Please fill all fields" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    Swal.fire({ icon: "error", title: "Invalid Email Format" });
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(form.password)) {
    Swal.fire({ icon: "error", title: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character." });
    return;
  }

      const res = await axios.post("http://localhost:5000/api/user/create", form);

      // console.log(res.data);
      toast.success('Sign up successful!', {
      position: "top-right",
      autoClose: 2000,
    });
      setForm({
        email: "",
        password: "",
        phone: ""
      });
      navigate('/')

    } catch (error) {
      console.error("Sign up error:", error.response ? error.response.data : error.message);
       toast.warn('Sign up failed. Please try again.', {
      position: "top-right",
      autoClose: 2000,
    });
    }
  };

 return (
    <>
    <Header/>
 <div className="min-h-screen flex items-center justify-start pl-8 sm:pl-16 bg-gray-200 bg-[url('/image/form_background3.jpg')] bg-cover bg-center scale-x-[-1] p-4">

  {/* Form wrapper */}
  <div className="w-full max-w-xl backdrop-blur-xl bg-white/20 border border-white/30 
    ml-6 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-60 
    p-6 sm:p-6 rounded-2xl shadow-2xl scale-x-[-1]">
    
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 leading-tight">
      Create Your Account
    </h1>

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-lg text-gray-700 mb-2 font-medium">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handle}
          required
          placeholder="e.g., jane.doe@example.com"
          className="w-full px-4 py-3 border-2 border-white/50 rounded-lg shadow-sm text-base focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-lg text-gray-700 mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handle}
          required
          placeholder="Min. 8 characters"
          className="w-full px-4 py-3 border-2 border-white/50 rounded-lg shadow-sm text-base focus:ring-2 focus:ring-rose-400 transition"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-lg text-gray-700 mb-2 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="e.g., 555-123-4567"
          className="w-full px-4 py-3 border-2 border-white/50 rounded-lg shadow-sm text-base focus:ring-2 focus:ring-rose-400 transition"
        />
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input type="checkbox" required className="mt-1 h-5 w-5 rounded border-gray-300" />
        <label className="text-[15px] sm:text-base text-gray-800">
          I agree to the 
          <a href="#" className="text-indigo-600 ml-1 hover:underline">Terms</a> and 
          <a href="#" className="text-indigo-600 ml-1 hover:underline">Privacy Policy</a>.
        </label>
      </div>

      <button className="w-full py-3 rounded-lg text-lg font-semibold text-white bg-black hover:bg-rose-600 transition shadow-md">
        Sign Up
      </button>
    </form>

    <p className="text-center text-gray-700 mt-6 text-base">
      Already have an account?
      <Link to="/login" className="text-indigo-600 font-medium hover:underline ml-1">Sign in here</Link>
    </p>

  </div>
</div>

</>

  );


};

export default Signup;
