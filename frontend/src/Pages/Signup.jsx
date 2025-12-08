import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';


const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "" 
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/create", form);

      console.log(res.data);
      alert('Sign up successful!'); 
      setForm({
        email: "",
        password: "",
        phone: ""
      });

    } catch (error) {
      console.error("Sign up error:", error.response ? error.response.data : error.message);
      alert('Sign up failed. Please try again.'); 
    }
  };

 return (
    <>
    <Header/>
 <div className="min-h-screen flex items-center justify-start pl-8 sm:pl-16 bg-gray-200 bg-[url('/image/form_background3.jpg')] bg-cover bg-center scale-x-[-1] p-4">

  {/* Form wrapper (flip back to normal orientation) */}
  <div className="w-full max-w-xl backdrop-blur-xl bg-white/20 border border-white/30 ml-60 p-8 sm:p-10 rounded-2xl shadow-2xl scale-x-[-1]">
    
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 leading-tight">
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
      <a href="#" className="text-indigo-600 font-medium hover:underline ml-1">Sign in here</a>
    </p>

  </div>
</div>

</>

  );


};

export default Signup;
