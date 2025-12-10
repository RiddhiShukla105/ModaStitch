import React from 'react'
import Header from '../../Components/Header'
import { Card } from 'primereact/card';
import Footer from '../../Components/footer';
        

const MainPage = () => {

    const trending=[
        {image:"/image/test1.png",title:"Trending"},
        {image:"/image/bleach_wash_aura2.png",title:"New Arrivals"},
        {image:"/image/ancient4.png",title:"Best Selling"},
        {image:"/image/brown_plain2.jpg",title:"On Sale"}
    ]

    // Auto Slide Effect
// React.useEffect(() => {
//   let index = 0;
//   const slider = document.getElementById("testimonial-slider");
//   const dots = [document.getElementById("dot1"), document.getElementById("dot2"), document.getElementById("dot3")];

//   const slide = () => {
//     index = (index + 1) % 3;
//     slider.style.transform = `translateX(-${index * 100}%)`;

//     dots.forEach((d, i) => {
//       d.style.background = i === index ? "gray" : "#d1d5db";
//     });
//   };

//   const interval = setInterval(slide, 10000);
//   return () => clearInterval(interval);
// }, []);

  return (
    <div>
      <Header/>

      {/* HERO SECTION */}
      <section
        className="
          relative
          h-[80vh]   
          w-full
          my-8 
          rounded
          overflow-hidden
          bg-[url('/image/home-bg2.png')]
          bg-cover
          bg-center
        "
      >
        {/* Subtle dark gradient for readability */}
        <div className="
          absolute inset-0 
          bg-linear-to-r from-black/60 via-black/30 to-transparent
        "></div>

        {/* Hero Content */}
        <div className="
          relative 
          h-full
          flex 
          flex-col 
          justify-center 
          pl-10
          sm:pl-16
          text-white
          max-w-xl
        ">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-xl">
            Redefine Your Style <br /> With Modern Fashion
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-light text-gray-200">
            Discover premium shirts, t-shirts, and exclusive collections crafted for comfort & style.
          </p>

          <button
            className="
              mt-6
              inline-block
              bg-white
              text-black
              font-semibold
              px-6 py-3
              text-lg
              rounded-full
              shadow-lg
              hover:bg-black hover:text-white
              transition-all
              duration-300
              hover:scale-105
            "
          >
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
        className="
          shadow-md 
          transition-all 
          duration-300 
          hover:shadow-2xl 
          hover:-translate-y-1
          cursor-pointer 
          border border-gray-100
          rounded-xl
        "
      >
        <div className="flex flex-col items-center h-50">
          <img
            src={item.image}
            alt={item.title}
            className="
               w-full h-full object-cover 
              transition duration-300 
              hover:scale-105 
            "
          />
          <h3 className="text-xl font-bold text-gray-800 mt-2 mb-1 ">
            {item.title}
          </h3>
        </div>
      </Card>
    ))}
  </div>
</section>




{/* FEATURED PRODUCTS */}
<section className="px-4 sm:px-10 mt-16 mb-20">
  <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
    Featured Products
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    {[
      { image: "/image/white2.jpg", name: "Classic Cotton Shirt", price: "$39" },
      { image: "/image/wolf4.png", name: "Oversized Tee", price: "$44" },
      { image: "/image/sea_green1.jpg", name: "Premium Hoodie", price: "$39" },
      { image: "/image/bleach_wash_aura2.png", name: "Casual Denim Jacket", price: "$24" },
    ].map((item, index) => (
      <div
        key={index}
        className="
          bg-white 
          rounded-xl
          shadow-md 
          overflow-hidden 
          border border-gray-100
          transition-all 
          duration-300 
          hover:shadow-2xl 
          hover:-translate-y-1
          cursor-pointer
        "
      >
        {/* Product Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="
              w-full h-full object-cover 
              transition duration-300 
              hover:scale-105
            "
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.name}
          </h3>
          <p className="text-xl font-bold text-green-600 mt-2">
            {item.price}
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4">
            <button
              className="
                px-4 py-2 
                bg-black 
                text-white 
                rounded-lg 
                text-sm 
                hover:bg-gray-800
                transition
              "
            >
              Add to Cart
            </button>

            <button
              className="
                px-4 py-2 
                border border-gray-500 
                rounded-lg 
                text-sm 
                hover:bg-gray-100 
                transition
              "
            >
              View
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
   <button
            className="
              mt-6 
              inline-block
              bg-black
              text-white
              hover:bg-red-500
              font-semibold
              px-6 py-3
              text-lg
              rounded-full
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Shop Now
          </button>
</section>




{/* DEAL OF THE DAY */}
<section className="px-4 sm:px-10 mt-20 mb-20">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-3xl font-bold text-gray-900 ml-150">
      Deal of the Day
    </h2>
    <p className="text-lg font-medium text-red-600 mt-2 sm:mt-0">
      ⏳ Ends in: <span className="font-bold">05:12:40</span>
    </p>
  </div>

  <div
    className="
      mt-8
      grid grid-cols-1 lg:grid-cols-2 
      gap-10 
      bg-white
      p-6 
      rounded-2xl 
      shadow-xl 
      border border-gray-200
    "
  >
    {/* Product Image */}
    <div className="w-full h-80 rounded-xl overflow-hidden">
      <img
        src="/image/test1.png"
        alt="Deal Product"
        className="
          w-full h-full object-cover 
          transition duration-300 
          hover:scale-105
        "
      />
    </div>

    {/* Product Info */}
    <div className="flex flex-col justify-center">
      <h3 className="text-3xl font-bold text-gray-900 leading-tight">
        Premium Cotton Oversized T-Shirt
      </h3>

      <p className="text-gray-600 mt-3 text-lg">
        Soft, breathable fabric designed for everyday comfort and a relaxed aesthetic.
        Available in multiple modern shades.
      </p>

      {/* Price Block */}
      <div className="mt-5 flex items-end gap-4">
        <span className="text-4xl font-extrabold text-green-600">₹499</span>
        <span className="text-lg line-through text-gray-400">₹999</span>
        <span className="text-lg font-semibold text-red-600">50% OFF</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          className="
            px-6 py-3 
            bg-black 
            text-white 
            text-lg 
            font-semibold
            rounded-xl 
            shadow-md 
            hover:bg-gray-800 
            transition
          "
        >
          Add to Cart
        </button>

        <button
          className="
            px-6 py-3 
            border border-gray-500
            text-lg
            rounded-xl
            hover:bg-gray-100
            transition
          "
        >
          View Details
        </button>
      </div>

      {/* Guarantee */}
      <p className="mt-6 text-gray-500 text-sm">
        ✔ 7-day easy return & exchange policy  
      </p>
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

  {/* Slider Wrapper */}
  <div className="relative mt-10 overflow-hidden">
    <div
      id="testimonial-slider"
      className="flex gap-6 transition-all duration-700"
    >
      {/* Slide 1 */}
      <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.3%] bg-white border shadow-lg rounded-2xl p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          “Amazing quality! The fabric feels premium and the fit is perfect.
          Definitely buying again.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          <img
            src="/image/user1.jpg"
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-900">Rohan Mehta</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="min-w-full sm:min-w-[50%] lg:min-w-[33.3%] bg-white border shadow-lg rounded-2xl p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          “Super fast delivery and great prices. My go-to place for fashion
          shopping.”
        </p>
        <div className="flex items-center gap-4 mt-6">
          <img
            src="/image/user2.jpg"
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
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
          <img
            src="/image/user3.jpg"
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
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


{/* NEWSLETTER SIGNUP CTA */}
<section className="px-4 sm:px-10 mt-20">
  <div
    className="
      w-full 
      rounded-3xl 
      py-12 
      px-6 
      sm:px-16 
      bg-linear-to-r 
      from-black 
      via-gray-900 
      to-gray-800 
      text-white 
      shadow-2xl
      flex 
      flex-col 
      items-center 
      text-center
    "
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
      Join Our Newsletter
    </h2>
    <p className="mt-3 text-gray-300 text-lg max-w-xl">
      Stay updated with new arrivals, exclusive deals, and special offers directly in your inbox.
    </p>

    {/* Input Box */}
    <div className="mt-6 flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-lg">
      <input
        type="email"
        placeholder="Enter your email address"
        className="
          flex-1 
          px-5 
          py-3 
          outline-none 
          text-gray-700 
          placeholder-gray-500
        "
      />
      <button
        className="
          bg-red-500 
          hover:bg-red-600 
          px-6 
          sm:px-8 
          text-lg 
          font-semibold 
          rounded-full 
          transition-all 
          duration-300
          text-white
        "
      >
        Subscribe
      </button>
    </div>

    <p className="text-gray-400 text-sm mt-3">
      We respect your privacy. Unsubscribe anytime.
    </p>
  </div>
</section>

<Footer/>

    </div>
  )
}

export default MainPage
