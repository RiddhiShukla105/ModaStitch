// import React, { useState, useEffect } from "react";
// import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
// import Header from "../../Components/Header";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";

// const Item = () => {
//   const location = useLocation();
//   const { id } = useParams();

//   const initialProduct = location.state || null;

//   const [product, setProduct] = useState(initialProduct);
//   const [activeImg, setActiveImg] = useState(
//     initialProduct?.image?.[0] || ""
//   );
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [zoom, setZoom] = useState(false);
//   const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

//   // Fetch product if refreshed (no state)
//   useEffect(() => {
//     if (!product) {
//       axios
//         .get(`http://localhost:5000/api/product/${id}`)
//         .then((res) => {
//           const p = res.data.product;
//           setProduct(p);
//           setActiveImg(`http://localhost:5000/uploads/${p.image?.[0]}`);
//         })
//         .catch((err) => console.error("Error fetching product:", err));
//     }
//   }, [id, product]);

//   if (!product)
//     return (
//       <p className="text-center mt-20 text-xl">Loading product...</p>
//     );

//   // Ensure desc is array
//   const descriptionArray = Array.isArray(product.desc)
//     ? product.desc
//     : [product.desc];

//   return (
//     <>
//       <Header />

//       <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* LEFT IMAGE */}
//         <div className="flex flex-col gap-4">
//           <div
//             className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
//             onMouseEnter={() => setZoom(true)}
//             onMouseLeave={() => setZoom(false)}
//             onMouseMove={(e) => {
//               const { left, top, width, height } =
//                 e.currentTarget.getBoundingClientRect();
//               const x =
//                 ((e.pageX - left - window.scrollX) / width) * 100;
//               const y =
//                 ((e.pageY - top - window.scrollY) / height) * 100;
//               setZoomPos({ x, y });
//             }}
//           >
//             <img
//               src={
//                 activeImg.startsWith("http")
//                   ? activeImg
//                   : `http://localhost:5000/uploads/${activeImg}`
//               }
//               alt="product"
//               className="w-full h-full object-cover rounded-xl"
//             />

//             {zoom && (
//               <div
//                 className="absolute inset-0 pointer-events-none rounded-xl"
//                 style={{
//                   backgroundImage: `url(${
//                     activeImg.startsWith("http")
//                       ? activeImg
//                       : `http://localhost:5000/uploads/${activeImg}`
//                   })`,
//                   backgroundSize: "200%",
//                   backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
//                 }}
//               ></div>
//             )}
//           </div>

//           {/* THUMBNAILS */}
//           <div className="flex gap-3">
//             {product.image?.map((img, i) => (
//               <img
//                 key={i}
//                 src={`http://localhost:5000/uploads/${img}`}
//                 className={`h-20 w-20 rounded-lg border cursor-pointer object-cover 
//                   ${
//                     activeImg.includes(img)
//                       ? "border-black"
//                       : "border-gray-300"
//                   }`}
//                 onClick={() =>
//                   setActiveImg(`http://localhost:5000/uploads/${img}`)
//                 }
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div>
//           <div className="flex items-center justify-between">
//             <h2 className="text-3xl font-bold">{product.name}</h2>
//             <button onClick={() => setLiked(!liked)}>
//               {liked ? (
//                 <FaHeart size={26} className="text-red-500" />
//               ) : (
//                 <FaRegHeart size={26} className="text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* PRICE */}
//           <div className="mt-4 flex items-center gap-3">
//             <span className="text-3xl font-bold">${product.price}</span>
//           </div>

//           {/* SIZES */}
//           {/* SIZES */}
// <div className="mt-6">
//   <h3 className="font-semibold mb-2">Select Size</h3>
//   <div className="flex gap-3 flex-wrap">
//     {["M", "L", "XL"].map((size) => (
//       <button
//         key={size}
//         onClick={() => setSelectedSize(size)}
//         className={`px-4 py-2 border rounded-full text-sm font-medium
//           ${
//             selectedSize === size
//               ? "border-black bg-black text-white"
//               : "border-gray-400 hover:border-black"
//           }`}
//       >
//         {size}
//       </button>
//     ))}
//   </div>
// </div>
//           {/* BUTTONS */}
//           <div className="mt-8 flex gap-4">
//             <button className="flex-1 bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition">
//               Add to Cart
//             </button>

//             <button className="flex-1 border-2 border-black py-3 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition">
//               Buy Now
//             </button>
//           </div>

//           {/* PRODUCT DESCRIPTION */}
//           <div className="mt-10">
//             <h3 className="text-xl font-semibold mb-3">
//               Product Description
//             </h3>

//             {descriptionArray.map((d, i) => (
//               <p key={i} className="text-gray-700 mb-3 leading-relaxed">
//                 {d}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Item;



import React, { useState, useEffect } from "react";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import Header from "../../Components/Header";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = () => {
  const location = useLocation();
  const { id } = useParams();

  const initialProduct = location.state || null;

  const [product, setProduct] = useState(initialProduct);
  const [activeImg, setActiveImg] = useState(initialProduct?.image?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(null);
  const [liked, setLiked] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!product) {
      axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then((res) => {
          const p = res.data.product;
          setProduct(p);
          setActiveImg(`http://localhost:5000/uploads/${p.image?.[0]}`);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, product]);

  if (!product)
    return (
      <p className="text-center mt-20 text-xl">Loading product...</p>
    );

  const descriptionArray = Array.isArray(product.desc)
    ? product.desc
    : [product.desc];



    const navigate = useNavigate();

const handleAddToCart = () => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  navigate("/cart", {
    state: {
      id: product._id,
      name: product.name,
      price: product.price,
      mrp: product.price + 200, // or use backend value
      size: selectedSize,
      qty: 1,
      image: `http://localhost:5000/uploads/${product.image?.[0]}`,
    },
  });
};


  return (
    <>
      <Header />

      <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-16 bg-gray-50 min-h-screen">
        
        {/* LEFT IMAGE SECTION */}
        <div className="flex flex-col gap-5">
          <div
            className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl bg-white"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();
              const x =
                ((e.pageX - left - window.scrollX) / width) * 100;
              const y =
                ((e.pageY - top - window.scrollY) / height) * 100;
              setZoomPos({ x, y });
            }}
          >
            <img
              src={
                activeImg.startsWith("http")
                  ? activeImg
                  : `http://localhost:5000/uploads/${activeImg}`
              }
              alt="product"
              className="w-full h-full object-cover rounded-2xl"
            />

            {zoom && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  backgroundImage: `url(${
                    activeImg.startsWith("http")
                      ? activeImg
                      : `http://localhost:5000/uploads/${activeImg}`
                  })`,
                  backgroundSize: "200%",
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              ></div>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 px-1">
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000/uploads/${img}`}
                className={`h-20 w-20 rounded-xl shadow-md cursor-pointer object-cover transition-all
                  ${
                    activeImg.includes(img)
                      ? "ring-2 ring-black"
                      : "ring-1 ring-gray-300"
                  }`}
                onClick={() =>
                  setActiveImg(`http://localhost:5000/uploads/${img}`)
                }
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold tracking-wide text-gray-900">
              {product.name}
            </h2>

            <button
              onClick={() => setLiked(!liked)}
              className="transition-transform hover:scale-110"
            >
              {liked ? (
                <FaHeart size={26} className="text-red-500 drop-shadow" />
              ) : (
                <FaRegHeart size={26} className="text-gray-600" />
              )}
            </button>
          </div>

          {/* PRICE */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          {/* SIZES */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3 text-gray-900">Select Size</h3>
            <div className="flex gap-4 flex-wrap">
              {["M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 border rounded-full text-sm font-medium transition-all shadow-sm
                    ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-md"
                        : "border-gray-400 hover:border-black hover:bg-gray-100"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-5">
            <button
  className="flex-1 bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition shadow-md"
  onClick={handleAddToCart}
>
  Add to Cart
</button>

            <button className="flex-1 border-2 border-black py-3 rounded-xl text-lg font-semibold hover:bg-black hover:text-white transition shadow-md">
              Buy Now
            </button>
          </div>

          {/* PRODUCT DESCRIPTION */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Product Description
            </h3>

            {descriptionArray.map((d, i) => (
              <p
                key={i}
                className="text-gray-700 mb-4 leading-relaxed text-[15px]"
              >
                {d}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
