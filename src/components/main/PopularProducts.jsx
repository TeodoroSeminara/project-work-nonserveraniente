import { useApi } from "../../context/ApiContext";
import "../../styles/PopularProducts.css";
import Carousel from "./Carousel";

export default function PopularProducts() {
    const { products, loadingProducts } = useApi();




    // Se sta caricando → mostra un placeholder
    if (loadingProducts) {
        return (
            <section className="products-section" id="popular-products">
                <h2 className="products-section-title">Prodotti più popolari</h2>
                <p className="products-section-p">Non li conosce nessuno</p>
                <p className="loading">Caricamento...</p>
            </section>
        );
    }

    // Prendi i primi 12 prodotti
    const popular = products.slice(0, 12);

    return (
        <section className="products-section" id="popular-products">
            <h2 className="products-section-title">Prodotti più popolari</h2>
            <p className="products-section-p">Non li conosce nessuno</p>
            <Carousel products={popular} itemsPerPage={4} />
        </section>
    );
}
