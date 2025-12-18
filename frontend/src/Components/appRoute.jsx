import MainPage from "../Pages/Buyer/MainPage";
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import About from "../Pages/Buyer/About"
import Tshirt from "../Pages/Buyer/Tshirt";
import Shirt from "../Pages/Buyer/Shirt";
import Wishlist from "../Pages/Buyer/Wishlist"
import Item from "../Pages/Buyer/Item";
import Admin from "../Pages/Admin/Admin";
import Cart from "../Pages/Buyer/Cart";
import ProductData from "../Pages/Admin/ProductData";
import UserData from "../Pages/Admin/UserData";
import OrderUpdate from "../Pages/Admin/OrderUpdate"
import Payment from "../Pages/Buyer/Payment";
import Order from "../Pages/Buyer/Order";
import OrderTracking from "../Pages/Buyer/OrderTracking";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import { Component } from "react";
import Search from "../Pages/Buyer/Search"
import ProtectedRoute from "./ProtectedRoute";




const appRoute = [
  {
    path: "/",
    Component: () => (
      <ProtectedRoute publicRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    name: "Home",
  },
  {
    path: "/about",
    Component: () => (
      <ProtectedRoute publicRoute>
        <About />
      </ProtectedRoute>
    ),
    name: "About",
   
  },
  {
    path: "/tshirt",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Tshirt />
      </ProtectedRoute>
    ),
    name: "T-shirt",
   
  },
  {
    path: "/shirt",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Shirt />
      </ProtectedRoute>
    ),
    name: "Shirt",
    
  },

  // 🔒 Admin routes
  { path: "/admin", Component: ()=> (
    <ProtectedRoute roleRequired="admin">
      <Admin />
    </ProtectedRoute>
  ), role: "admin" },
  { path: "/dashboard", Component:()=> (
    <ProtectedRoute roleRequired="admin">
      <AdminDashboard />
    </ProtectedRoute>
  ), name: "Dashboard", role: "admin" },

  {
    path: "/cart",
    Component: () => (
      <ProtectedRoute roleRequired="buyer">
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    Component: () => (
      <ProtectedRoute roleRequired="buyer">
        <Wishlist />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tshirt/:id",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Item />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Signup />
      </ProtectedRoute>
    ),
  },

  // 🔒 Admin-only data pages
  { path: "/product", Component:()=>(
    <ProtectedRoute roleRequired="admin">
      <ProductData />
    </ProtectedRoute>
  ), role: "admin" },
  { path: "/userdata", Component:()=>(
    <ProtectedRoute roleRequired="admin">
      <UserData/>
    </ProtectedRoute>
  ), role: "admin" },
  { path: "/orderupdate", Component: ()=>(
    <ProtectedRoute roleRequired="admin">
      <OrderUpdate />
    </ProtectedRoute>
  ), role: "admin" },

  {
    path: "/payment",
    Component: () => (
      <ProtectedRoute roleRequired="buyer">
        <Payment />
      </ProtectedRoute>
    ),
    role: "buyer",
  },
  {
    path: "/order",
    Component: () => (
      <ProtectedRoute roleRequired="buyer">
        <Order />
      </ProtectedRoute>
    ),
    role: "buyer",
  },
  {
    path: "/search",
    Component: () => (
      <ProtectedRoute publicRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ordertracking",
    Component: () => (
      <ProtectedRoute>
        <OrderTracking />
      </ProtectedRoute>
    ),
    name: "Orders",
   
  },
];

export default appRoute;
