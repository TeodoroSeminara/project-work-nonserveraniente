import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../../styles/CartDrawer.css";
import { FaTrash } from "react-icons/fa";
import { LuCannabis } from "react-icons/lu";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeItem, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Overlay scuro */}
      <div 
        className={`cartdrawer-overlay ${open ? "open" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`cartdrawer ${open ? "open" : ""}`}>

        <div className="cartdrawer-header">
          <h3>Il tuo carrello</h3>
          <button className="close-btn" onClick={onClose}>
            <LuCannabis />
          </button>
        </div>

        {/* 🔥 Scroll SOLO dentro il drawer */}
        <div className="cartdrawer-body">
          {cartItems.length === 0 ? (
            <p className="empty">Il carrello è vuoto!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.slug} className="cartdrawer-item">

                <img src={item.image_url} alt={item.name} />

                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="price">€{(item.price * item.qty).toFixed(2)}</p>

                  <div className="qty-controls">
                    <span onClick={() => decreaseQty(item.slug)}>-</span>
                    <span>{item.qty}</span>
                    <span onClick={() => increaseQty(item.slug)}>+</span>
                  </div>
                </div>

                <FaTrash
                  className="remove-icon"
                  onClick={() => removeItem(item.slug)}
                />
              </div>
            ))
          )}
        </div>

        <div className="cartdrawer-footer">
          <Link to="/carrello" onClick={onClose}>
            <button className="go-to-cart-btn">Vai al carrello</button>
          </Link>
        </div>

      </aside>
    </>
  );
}
