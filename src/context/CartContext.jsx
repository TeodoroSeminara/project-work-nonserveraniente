import { createContext, useState, useContext } from "react";

// creo un contesto globale per il carrello
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({children}){
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount(prev => prev + 1);
  }
  
  return(
    <>
    <CartContext.Provider value={{cartCount, addToCart}}>
      {children}
    </CartContext.Provider>
    </>
  )
}