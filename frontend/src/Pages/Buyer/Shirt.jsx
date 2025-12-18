import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import HeartToggle from "./HeartToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

const Shirt = () => {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext); // ✅ USE CONTEXT
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const imageRefs = useRef([]);

  const category = "shirt";
  // 🔹 Fetch products
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/product/load-product?category=${category}`)
      .then((res) => setProductData(res.data.product))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleClick = (item) => {
    navigate(`/tshirt/${item._id}`, { state: item });
  };

  // 🔹 Fly to cart animation (UI only)
  const flyToCart = (imgElement) => {
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon || !imgElement) return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = imgElement.cloneNode(true);
    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all 0.8s ease-in-out";
    flyingImg.style.zIndex = 9999;
    flyingImg.style.pointerEvents = "none";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = "0.4";
    });

    flyingImg.addEventListener("transitionend", () => flyingImg.remove());
  };

  const truncateText = (text, limit = 25) =>
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center my-9">
        Latest Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {productData.map((item, index) => (
          <div
            key={item._id}
            className="relative bg-[#fafafa] shadow-lg rounded-xl p-4 transition-all hover:shadow-2xl"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${item.image[0]}`}
              alt={item.seo}
              className="rounded-lg w-full h-60 object-scale-down cursor-pointer hover:scale-105 transition"
              onClick={() => handleClick(item)}
              ref={(el) => (imageRefs.current[index] = el)}
            />

            <div className="flex items-center justify-between mt-3">
              <h3 className="text-xl font-semibold">
                {truncateText(item.name)}
              </h3>
              <HeartToggle product={item} />
            </div>

            <p className="text-gray-600">${item.price}</p>

            {/* ✅ CORRECT ADD TO CART */}
            <button
              onClick={() => {
                addToCart({
                  id: item._id,
                  name: item.name,
                  image: `${import.meta.env.VITE_API_URL}/uploads/${item.image[0]}`,
                  price: item.price,
                  mrp: item.mrp || item.price,
                  size: "M",
                });
                flyToCart(imageRefs.current[index]);
              }}
              className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleClick(item)}
              className="mt-3 w-full border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Shirt;
