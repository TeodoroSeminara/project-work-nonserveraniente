import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { ProductCard } from "./ProductCard";
import { FiHome, FiArrowUp } from "react-icons/fi";
import "../../styles/PopularProducts.css";
import "../../styles/AllProducts.css";

export default function AllProducts() {
  const { products, loadingProducts, loadMoreProducts, hasMore } = useApi();

  const navigate = useNavigate();

  // Se sta caricando, mostra placeholder
  if (loadingProducts) {
    return (
      <div className="all-products-wrapper">
        <section className="products-section" id="all-products">
          <h2 className="products-section-title">Bello...</h2>
          <p className="loading">Caricamento prodotti...</p>
        </section>
      </div>
    );
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="all-products-wrapper">
      <section className="products-section" id="all-products">
        <h2 className="all-products-section-title">Bello...</h2>

        <div className="products-section-flex">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="all-products-footer">
          <p className="all-products-counter">
            Mostrati {products.length} prodotti inutili
          </p>


          <div className="all-products-button-row">
            <button className="go-back-button" onClick={handleScrollToTop}>
              <FiArrowUp />
            </button>

            {hasMore && !loadingProducts && (
              <button className="load-more-button" type="button"
                onClick={e => {
                  e.preventDefault(); // Precauzione massima!
                  loadMoreProducts();
                }}>
                Carica altro
              </button>
            )}


            <button className="go-home-button" onClick={handleGoHome}>
              <FiHome />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}