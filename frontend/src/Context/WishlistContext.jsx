import React, { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // keep using localStorage for persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist]);

  // Add to wishlist (avoid duplicates by _id + size if applicable)
  const addToWishlist = (item) => {
    if (!item) return;

    // Normalize id field: prefer _id but fall back to id
    const itemId = item._id ?? item.id;

    const exists = wishlist.find((w) => {
      const wId = w._id ?? w.id;
      // if product has size property, keep using it as second key
      if (item.size !== undefined) {
        return wId === itemId && w.size === item.size;
      }
      return wId === itemId;
    });

    if (!exists) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  // Remove by _id (and size if provided)
  const removeFromWishlist = (id, size) => {
    if (!id) return;
    setWishlist((prev) =>
      prev.filter((w) => {
        const wId = w._id ?? w.id;
        if (size !== undefined && size !== null) {
          return !(wId === id && w.size === size);
        }
        return wId !== id;
      })
    );
  };

  // Move to cart expects an addToCart callback
  const moveToCart = (item, addToCart) => {
    if (!item) return;
    addToCart?.(item);
    const id = item._id ?? item.id;
    removeFromWishlist(id, item.size);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
