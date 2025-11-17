import { useState, useEffect } from "react";
import { getProducts } from "../../services/api";
import "../../styles/PopularProducts.css"
import Carousel from "./Carousel";

// Prendiamo i primi 4 prodotti dal mock
export default function PopularProducts() {
    // Stato per salvare la lista di prodotti da mostrare
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data.slice(0, 12));
        });
    }, []);

    return (
        <section className="products-section" id="popular-products">
            <h2 className="products-section-title">Prodotti più popolari</h2>
            <p className="products-section-p">Non li conosce nessuno</p>
            {/* Carosello di 4 prodotti per pagina */}
            <Carousel products={products} itemsPerPage={4} />
        </section>
    )
}
