import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appRoute from "./appRoute";
import { CartContext } from "../Context/CartContext";

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { logoutCart } = useContext(CartContext);

  const role = localStorage.getItem("role");

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // Hide header on certain routes
  const hideHeaderRoutes = ["/dashboard"];
  if (hideHeaderRoutes.some((path) => location.pathname.startsWith(path))) return null;

  // Filter routes based on role (admin)
  const filteredRoutes = appRoute
    .filter((item) => (item.path === "/dashboard" ? role === "admin" : true))
    .filter((item) => item.name);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      logoutCart?.();
      setIsLoggedIn(false);
      toast("🦄 You are logged out!", { position: "top-right", autoClose: 1500, theme: "light", transition: Bounce });
      setTimeout(() => navigate("/login"), 1600);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
const handleSearch = () => {
  if (!searchQuery.trim()) return;
  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  setSearchQuery("");
};


  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${isShrunk ? "py-2 shadow-sm" : "py-3 shadow-md"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/image/logo.jpg" alt="Logo" className={`${isShrunk ? "h-10 w-12" : "h-14 w-16"}`} />
          <h1 className={`font-bold text-black ${isShrunk ? "text-xl" : "text-2xl"}`}>ModaStitch</h1>
        </div>

        {/* DESKTOP SEARCH BAR */}
        <div className="flex-1 hidden sm:flex justify-center px-4">
          <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  placeholder="Search for products, brands and more..."
  className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600"
/>

<AiOutlineSearch
  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
  size={20}
  onClick={handleSearch}
/>

        </div>

        {/* DESKTOP NAV & ACTIONS */}
        <div className="hidden sm:flex items-center gap-6 text-black">
          {filteredRoutes.map((item, id) => (
            <Link key={id} to={item.path} className="font-medium hover:underline">
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link to="/wishlist">
                <AiOutlineHeart size={22} className="hover:text-gray-700 transition" />
              </Link>

              <Link to="/cart" id="cart-icon">
                <AiOutlineShoppingCart size={22} id="cart-icon" className="hover:text-gray-700 transition" />
              </Link>

              <AiOutlineLogout size={22} onClick={handleLogout} className="cursor-pointer hover:text-gray-700 transition" />
            </>
          ) : (
            <Link to="/sign">
              <FaUser size={22} className="text-black hover:text-gray-700 transition" />
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="sm:hidden flex items-center gap-4">
          <AiOutlineSearch
  size={22}
  className="text-gray-600 cursor-pointer"
  onClick={() => navigate("/search")}
/>

          <AiOutlineMenu size={28} className="text-gray-800 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
        </div>
      </div>

      {/* MOBILE MENU */}

     {mobileMenuOpen && (
  <div className="sm:hidden fixed inset-0 z-40">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Drawer */}
    <div className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col animate-slideIn">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold tracking-wide">Menu</h2>
        <AiOutlineClose
          size={26}
          className="cursor-pointer text-gray-600 hover:text-black transition"
          onClick={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Nav Links */}
      <div className="flex-1 px-6 py-6 space-y-4">
        {filteredRoutes.map((item, id) => (
          <Link
            key={id}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-800
                       px-3 py-2 rounded-lg
                       hover:bg-pink-50 hover:text-pink-600
                       transition"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Actions */}
      <div className="px-6 py-4 flex items-center justify-between">
        {isLoggedIn ? (
          <>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <AiOutlineHeart size={22} />
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <AiOutlineShoppingCart size={22} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <AiOutlineUser size={22} />
            </button>
          </>
        ) : (
          <Link
            to="/sign"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-medium
                       px-4 py-2 rounded-lg border
                       hover:bg-gray-50 transition"
          >
            <FaUser size={18} />
            Sign In
          </Link>
        )}
      </div>
    </div>
  </div>
)}


      <ToastContainer />
    </header>
  );
};

export default Header;



