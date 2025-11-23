import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Recupero carrello da localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Stato temporaneo per input quantità
  const [qtyInputState, setQtyInputState] = useState({});

  // Salva quantità input temporanea
  function setQtyInput(slug, value) {
    setQtyInputState((prev) => ({
      ...prev,
      [slug]: value,
    }));
  }

  // Reset input temporaneo
  function clearQtyInput(slug) {
    setQtyInputState((prev) => {
      const copy = { ...prev };
      delete copy[slug];
      return copy;
    });
  }

  // Salva su localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Count totale per navbar
  const rawCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = rawCount > 99 ? "99+" : rawCount;

  // Aggiungi al carrello
  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);

      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, qty: Math.min(item.qty + 1, 999) }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  }

  // Aumenta quantità
  function increaseQty(slug) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? { ...item, qty: Math.min(item.qty + 1, 999) }
          : item
      )
    );
  }

  // Diminuisci quantità
  function decreaseQty(slug) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? { ...item, qty: Math.max(item.qty - 1, 1) }
          : item
      )
    );
  }

  // Set quantità da input
  function setQty(slug, qty) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, qty } : item
      )
    );
  }

  // Rimuovi prodotto
  function removeItem(slug) {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
  }

  // Svuota carrello
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        setCartItems,
        clearCart,
        setQty,
        qtyInputState,
        setQtyInput,
        clearQtyInput,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
