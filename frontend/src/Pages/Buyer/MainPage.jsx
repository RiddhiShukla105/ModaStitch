import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "../../Components/Header";
import { Card } from "primereact/card";
import Footer from "../../Components/footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

const MainPage = () => {
  const trending = [
    { image: "/image/test1.png", title: "Trending" },
    { image: "/image/bleach_wash_aura2.png", title: "New Arrivals" },
    { image: "/image/ancient4.png", title: "Best Selling" },
    { image: "/image/brown_plain2.jpg", title: "On Sale" },
  ];

  const [form, setForm] = useState({ name: "", email: "", feedback: "" });
  const [product, setProduct] = useState([]);
  const [shirt, setShirt] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Separate refs for T-shirts and Shirts
  const tshirtRefs = useRef([]);
  const shirtRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/load-product?limit=5")
      .then((res) => setProduct(res.data.product.slice(0, 4)))
      .catch((err) => console.error("Error fetching products:", err));

    axios
      .get("http://localhost:5000/api/product/load-product?category=shirt")
      .then((res) => setShirt(res.data.product.slice(0, 4)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleClick = (item) => {
    navigate(`/tshirt/${item._id}`, { state: item });
  };

  const flyToCart = (index, item, type) => {
    const refs = type === "tshirt" ? tshirtRefs.current : shirtRefs.current;
    const img = refs[index];
    const cartIcon = document.querySelector("#cart-icon");
    if (!img || !cartIcon) {
      addToCart(item);
      return;
    }

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition = "all 0.8s ease-in-out";
    clone.style.zIndex = 9999;
    clone.style.borderRadius = "8px";

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = cartRect.left + "px";
      clone.style.top = cartRect.top + "px";
      clone.style.width = "32px";
      clone.style.height = "32px";
      clone.style.opacity = "0.3";
    });

    setTimeout(() => {
      document.body.removeChild(clone);
      addToCart(item);
    }, 800);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/feedback/feed", form);

    // reset form correctly
    setForm({
      name: "",
      email: "",
      feedback: "",
    });

    alert("Feedback submitted successfully!");
  } catch (error) {
    console.error("Feedback error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div>
      <Header />

      {/* HERO SECTION */}
      <section
        className="relative h-[80vh] w-full my-8 rounded overflow-hidden bg-[url('/image/home-bg2.png')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-center pl-10 sm:pl-16 text-white max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-xl">
            Redefine Your Style <br /> With Modern Fashion
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light text-gray-200">
            Discover premium shirts, t-shirts, and exclusive collections crafted for comfort & style.
          </p>
          <button className="mt-6 inline-block bg-white text-black font-semibold px-6 py-3 text-lg rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </div>
      </section>

      {/* TRENDING CATEGORIES */}
      <section className="px-4 sm:px-10 mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Trending Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {trending.map((item, index) => (
            <Card
              key={index}
              className="shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-gray-100 rounded-xl"
            >
              <div className="flex flex-col items-center h-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-1">{item.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED T-SHIRTS */}
      <section className="px-4 sm:px-10 mt-16 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Featured T-shirts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {product.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${item.image[0]}`}
                  alt={item.seo}
                  className="rounded-lg w-full h-60 object-scale-down cursor-pointer hover:scale-105 transition"
                  onClick={() => handleClick(item)}
                  ref={(el) => (tshirtRefs.current[index] = el)}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-xl font-bold text-green-600 mt-2">${item.price}</p>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
                  <button
                    onClick={() =>
                      flyToCart(index, {
                        id: item._id,
                        name: item.name,
                        image: `http://localhost:5000/uploads/${item.image[0]}`,
                        price: item.price,
                        mrp: item.mrp || item.price,
                        size: "M",
                      }, "tshirt")
                    }
                    className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleClick(item)}
                    className="flex-1 px-4 py-2 border border-gray-500 rounded-lg text-sm hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/tshirt">
            <button className="bg-black text-white hover:bg-red-500 font-semibold px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED SHIRTS */}
      <section className="px-4 sm:px-10 mt-16 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Shirts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {shirt.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${item.image[0]}`}
                  alt={item.seo}
                  className="rounded-lg w-full h-60 object-scale-down cursor-pointer hover:scale-105 transition"
                  onClick={() => handleClick(item)}
                  ref={(el) => (shirtRefs.current[index] = el)}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name.length > 60 ? item.name.slice(0, 60) + "…" : item.name}
                </h3>
                <p className="text-xl font-bold text-green-600 mt-2">${item.price}</p>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
                  <button
                    onClick={() =>
                      flyToCart(index, {
                        id: item._id,
                        name: item.name,
                        image: `http://localhost:5000/uploads/${item.image[0]}`,
                        price: item.price,
                        mrp: item.mrp || item.price,
                        size: "M",
                      }, "shirt")
                    }
                    className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleClick(item)}
                    className="flex-1 px-4 py-2 border border-gray-500 rounded-lg text-sm hover:bg-gray-100 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/shirt">
            <button className="bg-black text-white hover:bg-red-500 font-semibold px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* REST OF SECTIONS (DEAL OF THE DAY, TESTIMONIALS, FEEDBACK, FOOTER) */}
      {/* You can keep your existing code here without changes */}


            {/* DEAL OF THE DAY */}
<section className="px-4 sm:px-10 mt-20 mb-20">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-3xl font-bold text-gray-900">Deal of the Day</h2>
  </div>
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
    {/* Product Image */}
    <div className="w-full h-56 sm:h-80 rounded-xl overflow-hidden">
      <img
        src="/image/test1.png"
        alt="Deal Product"
        className="w-full h-full object-cover transition duration-300 hover:scale-105"
      />
    </div>
    {/* Product Info */}
    <div className="flex flex-col justify-center">
      <h3 className="text-3xl font-bold text-gray-900 leading-tight">
        Premium Cotton Oversized T-Shirt
      </h3>
      <p className="text-gray-600 mt-3 text-lg">
        Soft, breathable fabric designed for everyday comfort and a relaxed aesthetic. Available in multiple modern shades.
      </p>
      {/* Price Block */}
      <div className="mt-5 flex items-end gap-4">
        <span className="text-4xl font-extrabold text-green-600">$24</span>
        <span className="text-lg line-through text-gray-400">$29</span>
        <span className="text-lg font-semibold text-red-600">10% OFF</span>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() =>
            flyToCart(0, {
              id: "deal-id",
              name: "Premium Cotton Oversized T-Shirt",
              image: "/image/test1.png",
              price: 24,
              mrp: 29,
              size: "M",
            }, "tshirt")
          }
          className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-xl shadow-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
        <button
          className="px-6 py-3 border border-gray-500 text-lg rounded-xl hover:bg-gray-100 transition"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS SECTION */}
<section className="px-4 sm:px-10 mt-20 mb-20">
  <h2 className="text-3xl font-bold text-gray-900 text-center">
    What Our Customers Say
  </h2>
  <p className="text-gray-600 text-center mt-2">
    Real stories from people who love shopping with us.
  </p>
  <div className="relative mt-10 overflow-hidden">
    <div id="testimonial-slider" className="flex gap-6 transition-all duration-700">
      {/* Slide 1 */}
      <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.3%] bg-white border shadow-lg rounded-2xl p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          “Amazing quality! The fabric feels premium and the fit is perfect. Definitely buying again.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          {/* <img src="/image/user1.jpg" alt="User" className="w-14 h-14 rounded-full object-cover" /> */}
          <div>
            <h4 className="font-semibold text-gray-900">Rohan Mehta</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
        </div>
      </div>
      {/* Slide 2 */}
      <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.3%] bg-white border shadow-lg rounded-2xl p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          “Super fast delivery and great prices. My go-to place for fashion shopping.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          {/* <img src="/image/user2.jpg" alt="User" className="w-14 h-14 rounded-full object-cover" /> */}
          <div>
            <h4 className="font-semibold text-gray-900">Ayesha Khan</h4>
            <p className="text-gray-500 text-sm">Verified Buyer</p>
          </div>
        </div>
      </div>
      {/* Slide 3 */}
      <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.3%] bg-white border shadow-lg rounded-2xl p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          “Loved the designs and fitting. Feels like a premium brand at a great price!”
        </p>
        <div className="flex items-center gap-4 mt-6">
          {/* <img src="/image/user3.jpg" alt="User" className="w-14 h-14 rounded-full object-cover" /> */}
          <div>
            <h4 className="font-semibold text-gray-900">Sarthak Joshi</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
        </div>
      </div>
    </div>
    {/* Slider Controls */}
    <div className="flex justify-center gap-3 mt-8">
      <button className="w-3 h-3 rounded-full bg-gray-400" id="dot1"></button>
      <button className="w-3 h-3 rounded-full bg-gray-300" id="dot2"></button>
      <button className="w-3 h-3 rounded-full bg-gray-300" id="dot3"></button>
    </div>
  </div>
</section>

{/* FEEDBACK FORM SECTION */}
<section className="px-4 sm:px-10 mt-20 mb-20">
  <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">
      Give Us Your Feedback
    </h2>
    <p className="mt-3 text-gray-600 text-center text-lg">
      We’d love to hear your thoughts, suggestions, or any issues you encountered.
    </p>
    <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
      />
      <textarea
        rows={5}
        placeholder="Your Feedback"
        name="feedback"
        value={form.feedback}
    onChange={(e) => setForm({ ...form, feedback: e.target.value })}
        className="w-full px-5 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none"
      ></textarea>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-black hover:bg-black/60 text-white text-lg font-semibold py-3 rounded-xl transition-all duration-300"
      >
        Submit Feedback
      </button>
    </form>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default MainPage;

