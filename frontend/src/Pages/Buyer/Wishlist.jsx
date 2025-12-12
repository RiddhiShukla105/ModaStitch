import React, { useContext } from "react";
import Header from "../../Components/Header";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <Header />

      <div className="bg-gray-100 min-h-screen p-5 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Wishlist <span className="text-pink-600">({wishlist.length})</span>
        </h1>

        {wishlist.length === 0 && (
          <div className="text-center mt-20">
            <img
              src="https://constant.myntassets.com/web/assets/img/empty-bag.png"
              alt="Empty"
              className="mx-auto w-40 opacity-70"
            />
            <p className="text-gray-500 text-lg mt-4">
              Your wishlist is empty
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-3 group"
            >
              <div className="relative">
                <img
                  src={
                    item.image?.[0]
                      ? `http://localhost:5000/uploads/${item.image[0]}`
                      : item.image
                  }
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                />

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item._id, item.size)}
                  className="absolute top-2 right-2 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </div>

              <h2 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {item.name}
              </h2>

              {item.size && (
                <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span className="font-bold text-lg text-gray-900">
                  ₹{item.price}
                </span>

                {item.mrp && (
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.mrp}
                  </span>
                )}
              </div>

              <button
                onClick={() => moveToCart(item, addToCart)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-all"
              >
                MOVE TO BAG
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
