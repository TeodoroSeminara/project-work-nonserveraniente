import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../services/api";
import { useCart } from "../context/CartContext";
import NotFound from "./NotFound";
import "../styles/ProductPage.css";
import { useWishlist } from "../context/WishlistContext";
import { useNotification } from "../context/NotificationContext";
import "../styles/Notification.css";

export default function ProductPage() {
  const { slug } = useParams();

  const { cartItems, addToCart, increaseQty, decreaseQty, removeItem } = useCart();
  const { toggleWishlist } = useWishlist();
  const { showNotification } = useNotification();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Selettore quantità (solo visivo)
  const [showQtySelector, setShowQtySelector] = useState(false);

  // Cerca nel carrello il prodotto corrente
  const cartEntry = cartItems.find((item) => item.slug === slug);
  const currentQty = cartEntry ? cartEntry.qty : 0;

  // Quando la qty va a 0 → nascondi selettore e mostra “Aggiungi”
  useEffect(() => {
    if (currentQty === 0) {
      setShowQtySelector(false);
    }
  }, [currentQty]);

  // Carica prodotto
  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setShowQtySelector(false);

    getProductBySlug(slug)
      .then((data) => {
        const uniqueImages = [...new Set(data.images)];
        setProduct({ ...data, images: uniqueImages });
        setMainImage(uniqueImages[0] || null);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return <NotFound />;
  if (!product) return <h2>Caricamento...</h2>;

  return (
    <div className="product-container">

      {/* Colonna immagini */}
      <div className="product-image-section">
        <img className="main-image" src={mainImage} alt={product.name} />

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

        {/* Bottone — sempre visibile */}
        <button
          className="product-btn"
          onClick={() => {
            addToCart({
              slug: product.slug,
              title: product.name,
              price: product.price,
              img: product.images[0],
            });

            showNotification("Prodotto aggiunto al carrello!");
            setShowQtySelector(true);
          }}
        >
          Aggiungi al Carrello
        </button>

        {/* Selettore quantità */}
        {showQtySelector && (
          <div className="product-qty-box">
            <button
              className="qty-btn"
              onClick={() => decreaseQty(product.slug)}
            >
              -
            </button>

            <span className="qty-number">{currentQty}</span>

            <button
              className="qty-btn"
              onClick={() => increaseQty(product.slug)}
            >
              +
            </button>
          </div>
        )}

        {/* Wishlist */}
        <button
          className="product-btn"
          onClick={() =>
            toggleWishlist({
              slug: product.slug,
              name: product.name,
              price: product.price,
              image_url: product.images[0],
              description: product.description,
            })
          }
        >
          Aggiungi alla Wishlist
        </button>

        <Link className="back-home-btn" to="/catalogo">
          Torna al Catalogo
        </Link>
      </div>
    </div>
  );
}



// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getProductBySlug } from "../services/api";
// import { useCart } from "../context/CartContext"
// import "../styles/ProductPage.css";

// export default function ProductPage() {
//   const { addToCart } = useCart();
//   const { slug } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");

//   useEffect(() => {
//     getProductBySlug(slug).then((data) => {
//       const uniqueImages = [...new Set(data.images)];

//       setProduct({ ...data, images: uniqueImages });

//       setMainImage(uniqueImages.length > 0 ? uniqueImages[0] : null);
//     });
//   }, [slug]);

//   if (!product) return <h2>Caricamento...</h2>;

//   return (
//     <div className="product-container">

//       {/* Colonna immagini */}
//       <div className="product-image-section">
//         <img className="main-image" src={mainImage} alt={product.name} />

//         {/* Thumbnails */}
//         <div className="thumbnail-row">
//           {product.images?.map((img, index) => (
//             <img
//               key={index}
//               className={`thumbnail ${img === mainImage ? "active-thumb" : ""}`}
//               src={img}
//               onClick={() => setMainImage(img)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Colonna info */}
//       <div className="product-info-box">
//         <h1 className="product-title">{product.name}</h1>
//         <p className="product-price">{product.price}€</p>
//         <p className="product-description">{product.description}</p>

//         {/* aggiunge il prodotto corrente al carrello */}
//         {/* passiamo a addToCart un oggetto prodotto*/}
//         <button onClick={() => addToCart({
//           slug: product.slug,
//           title: product.name,
//           price: product.price,
//           img: product.images[0]
//         })}
//         className="product-btn">
//           Aggiungi al carrello
//         </button>

//         <Link className="back-home-btn" to="/catalogo">
//           Torna al Catalogo
//         </Link>
//       </div>
//     </div>
//   );
// }
