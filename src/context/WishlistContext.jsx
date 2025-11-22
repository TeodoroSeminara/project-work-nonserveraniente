import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export  function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(product) {
    setWishlist(prev =>
      prev.some(item => item.slug === product.slug)
        ? prev.filter(item => item.slug !== product.slug)
        : [...prev, product]
    );
  }

  function isInWishlist(slug) {
    return wishlist.some(p => p.slug === slug);
  }

  function clearWishlist() {
  setWishlist([]);
}


  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
