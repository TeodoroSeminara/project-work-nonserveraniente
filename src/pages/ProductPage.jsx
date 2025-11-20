import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../services/api";
import { useCart } from "../context/CartContext"
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
        
        {/* aggiunge il prodotto corrente al carrello */}
        {/* passiamo a addToCart un oggetto prodotto*/}
        <button onClick={() => addToCart({
          slug: product.slug,
          title: product.name,
          price: product.price,
          img: product.images[0]
        })}
        className="product-btn">
          Aggiungi al carrello
        </button>

        <Link className="back-home-btn" to="/catalogo">
          Torna al Catalogo
        </Link>
      </div>
    </div>
  );
}
