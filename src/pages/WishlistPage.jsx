import { useWishlist } from "../context/WishlistContext";
import "../styles/WishlistPage.css";
import { ProductCard } from "../components/main/ProductCard";
import { useState } from "react";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const [confirmClear, setConfirmClear] = useState(false);


  return (
    <>
      {confirmClear && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Sei sicuro di voler svuotare la wishlist?</p>

            <button className="confirm-btn" onClick={() => {
              clearWishlist();
              setConfirmClear(false);
            }}>
              Sì, svuota
            </button>

            <button className="cancel-btn" onClick={() => setConfirmClear(false)}>
              Annulla
            </button>
          </div>
        </div>
      )}


      <div className="container">
        <h2>La Wishlist dei rimpianti</h2>

        <div className="wishlist-btn-center">
          <button
            className="clear-wishlist-btn"
            onClick={() => setConfirmClear(true)}
            disabled={wishlist.length === 0}
          >
            Svuota wishlist
          </button>
        </div>


        {wishlist.length === 0 ? (
          <p className="not-found-wishlist">Nessun prodotto aggiunto. Aggiungine uno!</p>
        ) : (
          <div className="wishlist-cards-container">
            {wishlist.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
