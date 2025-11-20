import { createContext, useState, useContext, useEffect } from "react";

// creo un contesto globale per il carrello
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {

  // recupero valore da localStorage solo al primo render
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem("cartCount");
    return saved ? parseInt(saved) : 0;
  });

  // ogni volta che cartCount cambia, salvo su localStorage
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  // aumenta il numero articoli
  function addToCart() {
     setCartCount(prev => {
      // SE prev è minore del massimo → restituisci prev + 1
      if(prev < 10){
        return prev + 1
      } else {
        return prev
      }
    });
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
