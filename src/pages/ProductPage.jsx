import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api"; 
import "../styles/ProductPage.css";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    getProducts().then((products) => {
      const found = products.find((p) => p.slug === slug);

      if (found) {
        setProduct(found);
        setMainImage(found.image_url);
      }
    });
  }, [slug]);

  if (!product) return <h2>Caricamento...</h2>;

  return (
    <div className="product-container">
      
      {/* Colonna immagini */}
      <div className="product-image-section">
        <img className="main-image" src={mainImage} alt={product.name} />

        <div className="thumbnail-row">
          <img
            className="thumbnail"
            src={product.image_url}
            onClick={() => setMainImage(product.image_url)}
          />
        </div>
      </div>

      {/* Colonna info */}
      <div className="product-info-box">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price}€</p>
        <p className="product-description">{product.description}</p>

        <button className="product-btn">Aggiungi al carrello</button>

        <Link className="back-home-btn" to="/">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

