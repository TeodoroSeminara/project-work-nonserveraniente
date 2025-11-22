import "../styles/CartPage.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } =
    useCart();

  // calcola il totale degli articoli nel carrello
  // sommando (prezzo * quantità) per ogni item
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Stato per i popup di conferma
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState({
    open: false,
    slug: null,
  });

  // Funzione per confermare svuota carrello
  const handleConfirmClear = () => {
    setConfirmClear(true);
  };
  const handleClearCart = () => {
    clearCart();
    setConfirmClear(false);
  };

  // Funzione per confermare rimozione singolo prodotto
  const handleRemoveConfirm = (slug) => {
    setConfirmRemove({ open: true, slug });
  };
  const handleRemove = () => {
    removeItem(confirmRemove.slug);
    setConfirmRemove({ open: false, slug: null });
  };

  return (
    <div className="container py-5">
      {/* POPUP SVUOTA CARRELLO */}
      {confirmClear && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Sei sicuro di voler svuotare tutto il carrello?</p>
            <button onClick={handleClearCart}>Sì, svuota</button>
            <button onClick={() => setConfirmClear(false)}>Annulla</button>
          </div>
        </div>
      )}
      {/* POPUP REMOVE SINGOLO */}
      {confirmRemove.open && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Sei sicuro di voler rimuovere questo prodotto dal carrello?</p>
            <button onClick={handleRemove}>Sì, rimuovi</button>
            <button
              onClick={() => setConfirmRemove({ open: false, slug: null })}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Free shipping bar */}
      <div className="custom-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="free-shipping-header">
            {subtotal >= 50
              ? "Spedizione gratuita raggiunta!"
              : `Aggiungi €${(50 - subtotal).toFixed(
                  2
                )} per la spedizione gratuita`}
          </span>
          <span className="price-gray">
            {subtotal >= 50
              ? "Hai risparmiato... ma a che prezzo?"
              : `€${subtotal.toFixed(2)} / €50.00`}
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* CART ITEMS */}
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.slug} className="cart-item mb-4">
              <img src={item.image_url} alt={item.name} />

              <div className="flex-grow-1">
                <div className="cart-item-title">{item.name}</div>

                <div className="qty-box my-2">
                  <span
                    className="span-hover"
                    onClick={() => decreaseQty(item.slug)}
                  >
                    -
                  </span>
                  <span>{item.qty}</span>
                  <span
                    className="span-hover"
                    onClick={() => increaseQty(item.slug)}
                  >
                    +
                  </span>
                </div>
              </div>

              <div className="text-end">
                <span className="cart-item-price">
                  €{(item.price * item.qty).toFixed(2)}
                </span>
                {/* Cambia per gestire il popup! */}
                <div
                  className="remove-btn"
                  onClick={() => handleRemoveConfirm(item.slug)}
                >
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
              <button className="checkout-btn" disabled={subtotal === 0}>
                Procedi al checkout
              </button>
            </Link>

            {/* Bottone svuota carrello */}
            <button
              className="clear-cart-btn"
              onClick={handleConfirmClear}
              disabled={cartItems.length === 0}
              style={{
                marginTop: "12px",
                background: "#ff2d55",
                color: "#fff",
                borderRadius: "7px",
                fontWeight: 600,
              }}
            >
              Svuota carrello
            </button>

            <p className="text-center mt-2 text-muted">
              (Se proprio vuoi sprecare questi soldi…)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import "../styles/CartPage.css";
// import { useState } from "react";
// import { useCart } from "../context/CartContext"
// import { Link } from "react-router-dom";

// export default function CartPage() {

//   const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

//   // calcola il totale degli articoli nel carrello
//   // sommando (prezzo * quantità) per ogni item
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const shipping = subtotal >= 50 ? 0 : 5.99;
//   const total = subtotal + shipping;

//   return (
//     <div className="container py-5">

//       {/* Free shipping bar */}
//       <div className="custom-card mb-4">
//         <div className="d-flex justify-content-between align-items-center">
//           <span className="free-shipping-header">
//             {subtotal >= 50
//               ? "Spedizione gratuita raggiunta!"
//               : `Aggiungi €${(50 - subtotal).toFixed(2)} per la spedizione gratuita`
//             }
//           </span>

//           <span className="price-gray">
//             {subtotal >= 50
//               ? "Hai risparmiato... ma a che prezzo?"
//               : `€${subtotal.toFixed(2)} / €50.00`
//             }
//           </span>

//         </div>
//       </div>

//       <div className="row g-4">

//         {/* CART ITEMS */}
//         <div className="col-lg-8">
//           {cartItems.map(item => (
//             <div key={item.slug} className="cart-item mb-4">

//               <img src={item.img} alt={item.title} />

//               <div className="flex-grow-1">
//                 <div className="cart-item-title">{item.title}</div>

//                 <div className="qty-box my-2">
//                   <span className="span-hover" onClick={() => decreaseQty(item.slug)}>-</span>
//                   <span>{item.qty}</span>
//                   <span className="span-hover" onClick={() => increaseQty(item.slug)}>+</span>
//                 </div>
//               </div>

//               <div className="text-end">

//                 <span className="cart-item-price">
//                   €{(item.price * item.qty).toFixed(2)}
//                 </span>

//                 <div className="remove-btn" onClick={() => removeItem(item.slug)}>
//                   ×
//                 </div>

//               </div>

//             </div>
//           ))}
//         </div>

//         {/* ORDER SUMMARY */}
//         <div className="col-lg-4">
//           <div className="summary-card">

//             <h4>Riepilogo Ordine</h4>

//             <div className="d-flex justify-content-between mt-3">
//               <span>Subtotale</span>
//               <span className="price-gray">€{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="d-flex justify-content-between mt-2">
//               <span>Spedizione</span>
//               <span className="price-gray">
//                 {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}
//               </span>
//             </div>

//             <hr className="custom-hr" />

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <span className="fw-bold">Totale</span>
//               <span className="summary-total">€{total.toFixed(2)}</span>
//             </div>

//             <Link to="/carrello/checkout">
//               <button
//                 className="checkout-btn"
//                 disabled={subtotal === 0}
//               >
//                 Procedi al checkout
//               </button>
//             </Link>

//             <p className="text-center mt-2 text-muted">
//               (Se proprio vuoi sprecare questi soldi…)
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
