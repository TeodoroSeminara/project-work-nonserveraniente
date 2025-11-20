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
    const rawCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const cartCount = rawCount > 99 ? "99+" : rawCount;

    // find sull articolo
    function addToCart(product) {
      setCartItems(prev => {
        
        const existing = prev.find(item => item.slug === product.slug);

        if(existing) {
          return prev.map(item => 
            item.slug === product.slug
            ? {...item, qty: Math.min(item.qty + 1, 999) }
            : item
          );
        }
        return [...prev, { ...product, qty: 1 }];

      });
    }
      
    // aumentare la quantità nel carrello fino a 999
      function increaseQty(slug) {
        setCartItems(prev =>
          prev.map(item =>
            item.slug === slug
              ? { ...item, qty: Math.min(item.qty + 1, 999) }
              : item
          )
        );
      }

     
      // diminuire la quanità nel carrello per - 1
      function decreaseQty(slug) {
        setCartItems(prev =>
          prev.map(item =>
            item.slug === slug
              ? { ...item, qty: Math.max(item.qty - 1, 1) }
              : item
          )
        );
      }
     
      // rimuovere un articolo dal carrello del tutto
      function removeItem(slug){
        setCartItems(prev => prev.filter(item => item.slug !== slug))
      }

    return (
      <CartContext.Provider 

      value={{ 
        cartItems,
        cartCount, 
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem
        }}>
          
        {children}
      </CartContext.Provider>
    );
  }
