import "../../styles/ProductCard.css";

export function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-card-image-placeholder"></div>
            <h3 className="product-card-title">{product.name}</h3>
            <p className="product-card-description">{product.description}</p>
            <p className="product-card-price">{product.price}€</p>
        </div>
    );
}
