import { Link } from "react-router-dom";
import "../../styles/ProductCard.css";

export function ProductCard({ product }) {
    return (
        <Link 
            to={`/product/${product.slug}`} 
            className="product-card-link"
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="product-card">
                <div className="product-card-image-wrapper">
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="product-card-image"
                    />
                </div>

                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-description">{product.description}</p>
                <p className="product-card-price">{product.price}€</p>
            </div>
        </Link>
    );
}



