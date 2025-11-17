import { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import { ProductCard } from "./ProductCard";
import "../../styles/PopularProducts.css"

// Prendiamo i primi 4 prodotti dal mock
export default function PopularProducts() {
    // Stato per salvare la lista di prodotti da mostrare
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data.slice(0, 4));
        });
    }, []);

    return (
        <section className="products-section" id="popular-products">
            <h2 className="products-section-title">Prodotti più popolari</h2>
            <p className="products-section-p">Non li conosce nessuno</p>
            <div className="products-section-flex">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p}/>
                ))}
            </div>
        </section>
    )
}
