import { Link } from "react-router-dom";
import "../../styles/ProductCard.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    return (
        <div className="product-card">

            <Link 
                to={`/product/${product.slug}`} 
                className="product-card-link"
            >
                <div className="product-card-image-wrapper">
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="product-card-image"
                    />
                </div>

                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-description">{product.description}</p>
            </Link>

            <div className="card-bottom-row">
                <p className="product-card-price">{product.price}€</p>

                <div className="card-action-row">
                    <button 
                        className="wishlist-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                        }}
                    >
                        {isInWishlist(product.slug) 
                            ? <FaHeart className="wishlist-icon active" />
                            : <FaRegHeart className="wishlist-icon" />
                        }
                    </button>

                    <button 
                        className="cart-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        <FaShoppingCart className="cart-icon" />
                    </button>
                </div>
            </div>

        </div>
    );
}

