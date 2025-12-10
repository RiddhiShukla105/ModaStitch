import React, { useState, useEffect } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import Header from "../../Components/Header";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Item = () => {
  const location = useLocation();
  const { id } = useParams();

  // Try to get product from navigation state, fallback to null
  const initialProduct = location.state || null;

  const [product, setProduct] = useState(initialProduct);
  const [activeImg, setActiveImg] = useState(initialProduct?.images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Fetch product by ID if not available from state (handles refresh)
  useEffect(() => {
    if (!product) {
      axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then((res) => {
          setProduct(res.data);
          setActiveImg(res.data.images?.[0] || "");
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, product]);

  if (!product) return <p className="text-center mt-20">Loading product...</p>;

  return (
    <>
      <Header />
      <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: IMAGE & ZOOM */}
        <div className="flex flex-col gap-4">
          <div
            className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.pageX - left - window.scrollX) / width) * 100;
              const y = ((e.pageY - top - window.scrollY) / height) * 100;
              setZoomPos({ x, y });
            }}
          >
            {activeImg && (
  <img
    src={activeImg}
    alt="product"
    className="w-full h-full object-cover rounded-xl"
  />
)}

            {zoom && (
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  backgroundImage: `url(${activeImg})`,
                  backgroundSize: "200%",
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              ></div>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`h-20 w-20 rounded-lg border cursor-pointer object-cover 
                  ${activeImg === img ? "border-black" : "border-gray-300"}`}
                onClick={() => setActiveImg(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <button onClick={() => setLiked(!liked)}>
              {liked ? (
                <FaHeart size={26} className="text-red-500" />
              ) : (
                <FaRegHeart size={26} className="text-gray-600" />
              )}
            </button>
          </div>

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
          </div>

          {/* SIZES */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium
                    ${selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-400 hover:border-black"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Color</h3>
            <div className="flex gap-3">
              {product.colors?.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-full border cursor-pointer hover:scale-105"
                />
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition">
              Add to Cart
            </button>

            <button className="flex-1 border-2 border-black py-3 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>

          {/* PRODUCT DETAILS */}

          {product.desc?.map((desc)=>(
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Product Description</h3>
            {desc}
          </div>
            ))}

        </div>
      </div>
    </>
  );
};

export default Item;
