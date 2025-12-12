// import React, { useContext, useEffect, useState } from "react";
// import { Search, Heart, ShoppingCart, User } from "lucide-react";
// import appRoute from "./appRoute";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { FaUser } from "react-icons/fa";
// import { AiOutlineLogout } from "react-icons/ai";

// const Header = () => {
//   const [isShrunk, setIsShrunk] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 30) {
//         setIsShrunk(true);
//       } else {
//         setIsShrunk(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const hideHeaderRoutes = [
//   "/dashboard",
// ];

// const shouldHideHeader=hideHeaderRoutes.some(path=>
//   location.pathname.startsWith(path)
// );

// if(shouldHideHeader) return null;

// const {logoutCart}=useContext(CartContext)
// const[isLoggedIn,setIsLoggedIn]=useState(false)

//   const navRoute=appRoute.filter((item)=>item.name)

//   useEffect(()=>{
//     const token=localStorage.getItem("token");
//     setIsLoggedIn(!!token)
//   },[]);

//   const handleLogout=()=>{
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     logoutCart();
//     setIsLoggedIn(false);
//   }

//   toast("🦄 You are logged out!", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "light",
//         transition: Bounce,
//       });
  
//       setTimeout(() => {
//         navigate("/login");
//       }, 3000);
//     };

//   return (
//     <header
//       className={`
//         w-full bg-white shadow-md sticky top-0 z-50 transition-all duration-300
//         ${isShrunk ? "py-2 shadow-sm" : "py-3 shadow-md"}
//       `}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-2 sm:px-6">

//         {/* LOGO */}
//         <div className="flex items-center gap-2 cursor-pointer">
//           <img
//             src="/image/logo.jpg"
//             alt="Logo"
//             className={`object-contain transition-all duration-300
//               ${isShrunk ? "h-10 w-12" : "h-14 w-16"}
//             `}
//           />
//           <h1
//             className={`font-bold text-black tracking-wide transition-all duration-300
//               ${isShrunk ? "text-xl" : "text-2xl"}
//             `}
//           >
//             ModaStitch
//           </h1>
//         </div>

//         {/* SEARCH BAR */}
//         <div className="flex-1 hidden sm:flex justify-center px-4 transition-all duration-300">
//           <div className="relative w-full max-w-lg">
//             <input
//               type="text"
//               placeholder="Search for products, brands and more..."
//               className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full
//               focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
//             />
//             <Search
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
//               size={20}
//             />
//           </div>
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div
//           className={`flex items-center gap-5 text-black transition-all duration-300 
//             ${isShrunk ? "gap-4" : "gap-6"}
//           `}
//         >

//           {navRoute.map((item,id)=>(
//             <Link className="hidden sm:block font-medium hover:underline hover:text-orange-400 hover:text-lg cursor-pointer" key={id} to={item.path}>{item.name}</Link>
//           ))}

//           {/* <Link to='/wishlist'><Heart size={22} className="cursor-pointer hover:text-gray-700" /></Link>
//          <div id="cart-icon" className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
//   <Link to='/cart'><ShoppingCart size={22} /></Link>
// </div>
//           <User size={22} className="cursor-pointer hover:text-gray-700" />
//         </div>
//       </div> */}


//            {isLoggedIn ? (
//             <>
//             <Link to='/wishlist'><Heart size={22} className="cursor-pointer hover:text-gray-700" /></Link>
//          <div id="cart-icon" className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
//   <Link to='/cart'><ShoppingCart size={22} /></Link>
// </div>
//           <User size={22} className="cursor-pointer hover:text-gray-700" />
//         </>
//           ) : (
//             <Link to="/sign" style={{ color: "white", fontSize: 26 }}>
//               <FaUser className="i" />
//             </Link>
//           )}
// {/* 
          
//       </div> */}
//       </div>
//       </div> 




//       {/* MOBILE SEARCH */}
//       <div className="sm:hidden mt-2 px-2 transition-all duration-300">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full
//             focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
//           />
//           <Search
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
//             size={20}
//           />
//         </div>
//          <ToastContainer />
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

import appRoute from "./appRoute";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUser } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";


const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideHeaderRoutes = ["/dashboard"];
  const shouldHideHeader = hideHeaderRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
  if (shouldHideHeader) return null;

  const { logoutCart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const role = localStorage.getItem("role");

// Show admin dashboard only if role === "admin"
const filteredRoutes = appRoute.filter((item) => {
  if (item.path === "/dashboard") {
    return role === "admin"; // only admin can see dashboard
  }
  return true; // everyone sees the rest
});

  const navRoute = appRoute.filter((item) => item.name);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    if (logoutCart) logoutCart();

    setIsLoggedIn(false);

    toast("🦄 You are logged out!", {
      position: "top-right",
      autoClose: 1500,
      theme: "light",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1600);
    
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
    <header
      className={`w-full bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${
        isShrunk ? "py-2 shadow-sm" : "py-3 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-6">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/image/logo.jpg"
            alt="Logo"
            className={`${isShrunk ? "h-10 w-12" : "h-14 w-16"}`}
          />
          <h1 className={`font-bold text-black ${isShrunk ? "text-xl" : "text-2xl"}`}>
            ModaStitch
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 hidden sm:flex justify-center px-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full"
            />
            <AiOutlineSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              size={20}
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6 text-black">
          {filteredRoutes.map((item, id) => (
  <Link
    className="hidden sm:block font-medium hover:underline"
    key={id}
    to={item.path}
  >
    {item.name}
  </Link>
))}

          {isLoggedIn ? (
            <>
              <Link to="/wishlist">
                <AiOutlineHeart size={22} className="hover:text-gray-700" />
              </Link>

              <Link to="/cart">
                <AiOutlineShoppingCart size={22} className="hover:text-gray-700" />
              </Link>

              <AiOutlineUser
                size={22}
                onClick={handleLogout}
                className="cursor-pointer hover:text-gray-700"
              />
            </>
          ) : (
            <Link to="/sign">
              <FaUser size={22} className="text-black" />
            </Link>
          )}
        </div>
      </div>

      <ToastContainer />
    </header>
  );
};

export default Header;
