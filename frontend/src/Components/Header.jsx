import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import appRoute from "./appRoute";
import { Link } from "react-router-dom";

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navRoute=appRoute.filter((item)=>item.name)

  return (
    <header
      className={`
        w-full bg-white shadow-md sticky top-0 z-50 transition-all duration-300
        ${isShrunk ? "py-2 shadow-sm" : "py-3 shadow-md"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-2 sm:px-6">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/image/logo.jpg"
            alt="Logo"
            className={`object-contain transition-all duration-300
              ${isShrunk ? "h-10 w-12" : "h-14 w-16"}
            `}
          />
          <h1
            className={`font-bold text-black tracking-wide transition-all duration-300
              ${isShrunk ? "text-xl" : "text-2xl"}
            `}
          >
            ModaStitch
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 hidden sm:flex justify-center px-4 transition-all duration-300">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full
              focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              size={20}
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div
          className={`flex items-center gap-5 text-black transition-all duration-300 
            ${isShrunk ? "gap-4" : "gap-6"}
          `}
        >

          {navRoute.map((item,id)=>(
            <Link className="hidden sm:block font-medium hover:underline hover:text-orange-400 hover:text-lg cursor-pointer" key={id} to={item.path}>{item.name}</Link>
          ))}

          <Heart size={22} className="cursor-pointer hover:text-gray-700" />
         <div id="cart-icon" className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
  <ShoppingCart size={22} />
</div>
          <User size={22} className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="sm:hidden mt-2 px-2 transition-all duration-300">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full
            focus:ring-2 focus:ring-black focus:border-black outline-none text-black"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            size={20}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
