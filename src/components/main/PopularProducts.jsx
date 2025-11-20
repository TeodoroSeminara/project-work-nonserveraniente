import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import "../../styles/PopularProducts.css";
import Carousel from "./Carousel";

export default function PopularProducts() {
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPopular() {
            setLoading(true);
            try {
                // Chiamata random: parametri sort e limit
                const result = await getProducts({
                    sort: "random",
                    limit: 12
                });
                setPopular(result);
            } catch (err) {
                setPopular([]);
            } finally {
                setLoading(false);
            }
        }
        fetchPopular();
    }, []);

    if (loading) {
        return (
            <section className="products-section" id="popular-products">
                <h2 className="products-section-title">Prodotti più popolari</h2>
                <p className="products-section-p">Non li conosce nessuno</p>
                <p className="loading">Caricamento...</p>
            </section>
        );
    }

    return (
        <section className="products-section" id="popular-products">
            <h2 className="products-section-title">Prodotti più popolari</h2>
            <p className="products-section-p">Non li conosce nessuno</p>
            <Carousel products={popular} itemsPerPage={4} />
        </section>
    );
}
