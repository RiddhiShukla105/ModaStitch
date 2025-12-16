import React, { useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

 
//    const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .post("http://localhost:5000/api/user/login", form)
//       .then((res) => {
//         if (res.data.token) {
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("role", res.data.role);
//           window.dispatchEvent(new Event("login"));
//         }
// Swal.fire("Success", res.data.message, "success").then(() => {
//   if (res.data.role === "admin") navigate("/dashboard", { replace: true });
//   else navigate("/", { replace: true }); // buyer
// });

//       })
//       .catch((err) => {
//         Swal.fire("Login failed:", err.message, "error");
//       });
//   };

const handleSubmit = (event) => {
  event.preventDefault();

  axios
    .post("http://localhost:5000/api/user/login", form)
    .then((res) => {
      if (res.data.token) {
        // Store token and role
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Dispatch a custom event to let other components (like Header/Tshirt) know user logged in
        window.dispatchEvent(new Event("login"));

        Swal.fire("Success", res.data.message, "success").then(() => {
          if (res.data.role === "admin") navigate("/dashboard", { replace: true });
          else navigate("/", { replace: true }); // buyer
        });
      } else {
        Swal.fire("Login failed", "Token not received from server", "error");
      }
    })
    .catch((err) => {
      Swal.fire("Login failed", err.response?.data?.error || err.message, "error");
    });
};

  return (
    <>
    <Header/>
 <div className="min-h-screen flex items-center justify-center bg-gray-200 bg-[url('/image/form_background3.jpg')] bg-cover bg-center  transform-[scaleX(-1)] p-4">
  <div className="
      w-full 
      max-w-lg            /* Wider than before */
      backdrop-blur-xl 
      bg-white/20 
      border border-white/30 
      p-6 sm:p-10        /* Extra padding for wider layout */
      rounded-2xl 
      shadow-2xl
      transform-[scaleX(-1)]
    "
  >

    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 leading-tight">
      Welcome Back
    </h1>

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-lg text-gray-700 mb-2 font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handle}
          placeholder="Enter your email"
          className="mt-1 w-full px-4 py-3 border-2 border-white/50 rounded-lg shadow-sm text-base focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-lg text-gray-700 mb-2 font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={form.password}
          onChange={handle}
          placeholder="Enter your password"
          className="mt-1 w-full px-4 py-3 border-2 border-white/50 rounded-lg shadow-sm text-base focus:ring-2 focus:ring-rose-400 transition"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-lg font-semibold text-white bg-black hover:bg-rose-600 transition shadow-md"
      >
        Login
      </button>
    </form>

    <p className="text-center text-gray-700 mt-6 text-base">
      Don’t have an account?
      <Link to="/sign" className="text-indigo-600 font-medium hover:underline ml-1">
        Sign up here
      </Link>
    </p>

  </div>
</div>
</>
  );
};

export default Login;

