import "../styles/CartPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {

  const newProduct = {
    slug: '',
    title: '',
    price: '',
    qty: '',
    img: ''
  }

  const [cartItems, setCartItems] = useState([
    {
      slug: "tazza-senza-fondo",
      title: "Tazza Senza Fondo",
      price: 19.99,
      qty: 1,
      img: "https://picsum.photos/200?random=1",
    },
    {
      slug: "cucchiaio-che-si-scioglie",
      title: "Cucchiaio che si Scioglie",
      price: 14.99,
      qty: 1,
      img: "https://picsum.photos/200?random=2",
    },
  ]);

  // Rimuovere un prodotto
  const removeItem = (slug) => {
    setCartItems(items => items.filter(item => item.slug !== slug));
  };

  // Aumento quantità
  const increaseQty = (slug) => {
    setCartItems(items =>
      items.map(item =>
        item.slug === slug ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Diminuisco quantità
  const decreaseQty = (slug) => {
    setCartItems(items =>
      items.map(item =>
        item.slug === slug && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // Calcoli
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    subtotal += item.price * item.qty;
  }

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="container py-5">

      {/* Free shipping bar */}
      <div className="custom-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="free-shipping-header">
            {subtotal >= 50 
              ? "Spedizione gratuita raggiunta!" 
            : `Aggiungi €${(50 - subtotal).toFixed(2)} per la spedizione gratuita`
            }
          </span>

          <span className="price-gray">
            {subtotal >= 50 
              ? "Hai risparmiato... ma a che prezzo?"
              : `€${subtotal.toFixed(2)} / €50.00`
            }
          </span>

        </div>
      </div>

      <div className="row g-4">

        {/* CART ITEMS */}
        <div className="col-lg-8">
          {cartItems.map(item => (
            <div key={item.slug} className="cart-item mb-4">

              <img src={item.img} alt={item.title} />

              <div className="flex-grow-1">
                <div className="cart-item-title">{item.title}</div>

                <div className="qty-box my-2">
                  <span className="span-hover" onClick={() => decreaseQty(item.slug)}>-</span>
                  <span>{item.qty}</span>
                  <span className="span-hover" onClick={() => increaseQty(item.slug)}>+</span>
                </div>
              </div>

              <div className="text-end">

                <span className="cart-item-price">
                  €{(item.price * item.qty).toFixed(2)}
                </span>

                <div className="remove-btn" onClick={() => removeItem(item.slug)}>
                  ×
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-lg-4">
          <div className="summary-card">

            <h4>Riepilogo Ordine</h4>

            <div className="d-flex justify-content-between mt-3">
              <span>Subtotale</span>
              <span className="price-gray">€{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span>Spedizione</span>
              <span className="price-gray">
                {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}
              </span>
            </div>

            <hr className="custom-hr" />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Totale</span>
              <span className="summary-total">€{total.toFixed(2)}</span>
            </div>

            <Link to="/carrello/checkout">
              <button className="checkout-btn">Procedi al checkout</button>
            </Link>

            <p className="text-center mt-2 text-muted">
              (Se proprio vuoi sprecare questi soldi…)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
