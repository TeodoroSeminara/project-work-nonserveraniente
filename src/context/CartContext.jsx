import { createContext, useState, useContext, useEffect } from "react";

// creo un contesto globale per il carrello
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {

    // recupero il carrello da localStorage
    const [cartItems, setCartItems] = useState(() => {
      const saved = localStorage.getItem("cartItems");
      // se esiste cartItems in local storage lo trasforma da stringa a un array
      return saved ? JSON.parse(saved) : [];
    });

  // ogni volta che cartCount cambia, salvo su localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

   // calcolo il totale oggetti (per la navBar)
   const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // find sull articolo
  function addToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.slug === product.slug);

      if(existing) {
        return prev.map(item => 
          item.slug === product.slug
          ? {...item, qty: Math.min(item.qty + 1, 10) }
          : item
        );
      }
      return [...prev, { ...product, qty: 1 }];

    });
  }

    function increaseQty(slug) {
      setCartItems(prev =>
        prev.map(item =>
          item.slug === slug
            ? { ...item, qty: Math.min(item.qty + 1, 10) }
            : item
        )
      );
    }


    function decreaseQty(slug) {
      setCartItems(prev =>
        prev.map(item =>
          item.slug === slug
            ? { ...item, qty: Math.max(item.qty - 1, 1) }
            : item
        )
      );
    }

  return (
    <CartContext.Provider 

    value={{ 
      cartItems,
      cartCount, 
      addToCart,
      increaseQty,
      decreaseQty
      }}>
        
      {children}
    </CartContext.Provider>
  );
}
