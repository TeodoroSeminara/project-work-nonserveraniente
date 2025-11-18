import { useApi } from "../../context/ApiContext";
import Carousel from "./Carousel";
import "../../styles/PopularProducts.css";

export default function LastAdded() {
    const { products, loadingProducts } = useApi();

    // Se i prodotti stanno ancora caricando
    if (loadingProducts) {
        return (
            <section className="products-section">
                <h2 className="products-section-title">Ultimi arrivi</h2>
                <p className="products-section-p">Altre occasioni per buttare soldi</p>
                <p className="loading">Caricamento...</p>
            </section>
        );
    }

    // Prendiamo gli ultimi 12 prodotti
    const latest = [...products].slice(-12).reverse();

    return (
        <section className="products-section">
            <h2 className="products-section-title">Ultimi arrivi</h2>
            <p className="products-section-p">Altre occasioni per buttare soldi</p>
            
            <Carousel products={latest} itemsPerPage={4} />
        </section>
    );
}
