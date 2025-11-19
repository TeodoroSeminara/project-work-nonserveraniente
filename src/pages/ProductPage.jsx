import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../services/api";
import { useCart } from "../context/CartContext";
import "../styles/ProductPage.css";

export default function ProductPage() {
  const { addToCart } = useCart();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

useEffect(() => {
  getProductBySlug(slug).then((data) => {
    const uniqueImages = [...new Set(data.images)];

    setProduct({ ...data, images: uniqueImages });

    setMainImage(uniqueImages.length > 0 ? uniqueImages[0] : null);
  });
}, [slug]);


  if (!product) return <h2>Caricamento...</h2>;

  return (
    <div className="product-container">
      
      {/* Colonna immagini */}
      <div className="product-image-section">
        <img className="main-image" src={mainImage} alt={product.name} />

        {/* Thumbnails */}
        <div className="thumbnail-row">
          {product.images?.map((img, index) => (
            <img
              key={index}
              className={`thumbnail ${img === mainImage ? "active-thumb" : ""}`}
              src={img}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Colonna info */}
      <div className="product-info-box">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price}€</p>
        <p className="product-description">{product.description}</p>

        <button onClick={addToCart}
        className="product-btn" >Aggiungi al carrello</button>

        <Link className="back-home-btn" to="/">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
