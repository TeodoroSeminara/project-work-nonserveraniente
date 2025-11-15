import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import { ProductCard } from "./ProductCard";
// Riutilizziamo lo stesso CSS dei popolari
import "../styles/PopularProducts.css";

export default function LastAdded() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((data) => {
            // prendiamo gli ultimi 4 prodotti dal mock
            const latest = data.slice(-4).reverse();
            setProducts(latest);
        });
    }, []);

    return (
        <section className="products-section">
            <h2 className="products-section-title">Ultimi arrivi</h2>
            <p className="products-section-p">Altre occasioni per buttare soldi</p>
            <div className="products-section-flex">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
