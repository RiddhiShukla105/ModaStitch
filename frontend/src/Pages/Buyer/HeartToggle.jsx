import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartToggle = ({ size = 22, product }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);

    // Optional: Save wishlist in localStorage or API
    // let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // ...
  };

  return (
    <button
  onClick={toggleLike}
  className="transition-transform duration-200 hover:scale-110"
>
      {liked ? (
        <FaHeart size={size} className="text-red-500 drop-shadow-md" />
      ) : (
        <FaRegHeart size={size} className="text-gray-600" />
      )}
    </button>
  );
};

export default HeartToggle;
