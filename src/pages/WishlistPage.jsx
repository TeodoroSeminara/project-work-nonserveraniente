import { useWishlist } from "../context/WishlistContext";
import "../styles/WishlistPage.css";
import { ProductCard } from "../components/main/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container">
      <h2>La tua Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Nessun prodotto aggiunto. Aggiungine uno!</p>
      ) : (
        <div className="wishlist-cards-container">
          {wishlist.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
