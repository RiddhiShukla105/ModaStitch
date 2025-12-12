import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../../Context/WishlistContext";

const HeartToggle = ({ size = 22, product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  if (!product) return null;

  const productId = product._id ?? product.id;

  const isLiked = wishlist.some((w) => {
    const wId = w._id ?? w.id;
    // match by size if product has size
    if (product.size !== undefined) {
      return wId === productId && w.size === product.size;
    }
    return wId === productId;
  });

  const toggleLike = (e) => {
    // prevent parent handlers if used inside clickable card
    e?.stopPropagation?.();

    if (isLiked) {
      removeFromWishlist(productId, product.size);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="transition-transform duration-200 hover:scale-110"
      aria-pressed={isLiked}
      title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLiked ? (
        <FaHeart size={size} className="text-red-500 drop-shadow-md" />
      ) : (
        <FaRegHeart size={size} className="text-gray-600" />
      )}
    </button>
  );
};

export default HeartToggle;
