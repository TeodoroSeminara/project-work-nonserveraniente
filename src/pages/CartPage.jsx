import "../styles/CartPage.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    setQty,
    qtyInputState,
    setQtyInput,
    clearQtyInput,
  } = useCart();

  // Totali
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Popup
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState({
    open: false,
    slug: null,
  });

  return (
    <div className="container py-5">

      {/* POPUP SVUOTA */}
      {confirmClear && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Sei sicuro di voler svuotare tutto il carrello?</p>
            <button className="confirm-btn" onClick={() => { clearCart(); setConfirmClear(false); }}>
              Sì, svuota
            </button>
            <button className="cancel-btn" onClick={() => setConfirmClear(false)}>
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* POPUP REMOVE */}
      {confirmRemove.open && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Vuoi rimuovere questo prodotto?</p>
            <button className="confirm-btn" onClick={() => {
              removeItem(confirmRemove.slug);
              setConfirmRemove({ open: false, slug: null });
            }}>
              Sì, rimuovi
            </button>
            <button className="cancel-btn"
              onClick={() => setConfirmRemove({ open: false, slug: null })}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* SHIPPINGBAR */}
      <div className="custom-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="free-shipping-header">
            {subtotal >= 50
              ? "Spedizione gratuita raggiunta!"
              : `Aggiungi €${(50 - subtotal).toFixed(2)} per la spedizione gratuita`}
          </span>
          <span className="price-gray">
            €{subtotal.toFixed(2)} / €50.00
          </span>
        </div>
      </div>

      <div className="row g-4">

        {/* ITEMS */}
        <div className="col-lg-8">
          {cartItems.map((item) => {
            const tempQty = qtyInputState[item.slug] ?? item.qty;

            return (
              <div key={item.slug} className="cart-item mb-4">

                <img src={item.image_url} alt={item.name} />

                <div className="flex-grow-1">
                  <div className="cart-item-title">{item.name}</div>

                  {/* QUANTITY */}
                  <div className="qty-controls">
                    <span className="qty-btn" onClick={() => decreaseQty(item.slug)}>-</span>

                    <input
                      className="qty-input"
                      type="text"
                      value={tempQty}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || /^\d+$/.test(v)) {
                          setQtyInput(item.slug, v);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const v = qtyInputState[item.slug];

                          if (!v || isNaN(v) || Number(v) < 1) {
                            setQty(item.slug, 1);
                          } else if (Number(v) > 999) {
                            setQty(item.slug, 999);
                          } else {
                            setQty(item.slug, Number(v));
                          }

                          clearQtyInput(item.slug);
                          e.target.blur();
                        }
                      }}
                      onBlur={() => {
                        const v = qtyInputState[item.slug];

                        if (!v || isNaN(v) || Number(v) < 1) {
                          setQty(item.slug, 1);
                        } else if (Number(v) > 999) {
                          setQty(item.slug, 999);
                        } else {
                          setQty(item.slug, Number(v));
                        }

                        clearQtyInput(item.slug);
                      }}
                    />

                    <span className="qty-btn" onClick={() => increaseQty(item.slug)}>+</span>
                  </div>

                  <span className="cart-item-unit-price">€{item.price}</span>
                </div>

                <div className="text-end">
                  <span className="cart-item-price">
                    €{(Number(item.price) * item.qty).toFixed(2)}
                  </span>

                  <div className="remove-btn" onClick={() => setConfirmRemove({ open: true, slug: item.slug })}>
                    ×
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
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
              <button className="checkout-btn" disabled={subtotal === 0}>
                Procedi al checkout
              </button>
            </Link>

            <div className="d-flex justify-content-center">
              <button
                className="clear-cart-btn"
                onClick={() => setConfirmClear(true)}
                disabled={cartItems.length === 0}
              >
                Svuota carrello
              </button>
            </div>

            <p className="text-center mt-2 text-muted">
              (Se proprio vuoi sprecare questi soldi…)
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}
