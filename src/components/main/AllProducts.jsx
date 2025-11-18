import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import { ProductCard } from "./ProductCard";
import { FiHome, FiArrowUp } from "react-icons/fi";
import "../../styles/PopularProducts.css";
import "../../styles/AllProducts.css"



export default function AllProducts() {

  const [products, setProducts] = useState([]);

  // Quanti prodotti mostrare
  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate()

  useEffect(() => {
    getProducts().then((data) => {
      // Tutti i prodotti dal backend
      setProducts(data);
      // Ogni volta che ricarico riparto da 12
      setVisibleCount(12);
    });
  }, []);

  // Prodotti attualmente visibili
  const visibleProducts = products.slice(0, visibleCount)

  // Booleano se abbiamo mostrato tutti i prodotti
  const hasShownAll = visibleCount >= products.length

  // Aumenta il numero di prodotti visibili 12 per volta
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // Bottone per tornare ad inizio pagina
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Bottone per tornare in Homepage
  const handleGoHome = () => {
    navigate("/");
  }

  return (
    <div className="all-products-wrapper">
      <section className="products-section" id="all-products">
        <h2 className="products-section-title">Bello...</h2>

        <div className="products-section-flex">
          {visibleProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="all-products-footer">
          <p className="all-products-counter">Mostrati {visibleProducts.length} di {products.length || 0} prodotti inutili</p>
          <div className="all-products-button-row">
            <button className="go-back-button" onClick={handleScrollToTop}><FiArrowUp /></button>
            {!hasShownAll && (
              <button className="load-more-button" onClick={handleLoadMore}>Carica altro</button>
            )}
            <button className="go-home-button" onClick={handleGoHome}><FiHome /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
