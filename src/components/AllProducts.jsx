import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import { ProductCard } from "./ProductCard";
import "../styles/PopularProducts.css";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <section
      className="products-section"
      id="all-products"
    >
      <h2 className="products-section-title">Tutti i prodotti</h2>

      <div className="products-section-flex">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
