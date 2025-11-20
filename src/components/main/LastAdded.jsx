// import { useApi } from "../../context/ApiContext";
// import Carousel from "./Carousel";
// import "../../styles/PopularProducts.css";

// export default function LastAdded() {
//     const { products, loadingProducts } = useApi();

//     // Ultimi arrivi
//     const [latestProducts, setLatestProducts] = useState([]);

//     // Se i prodotti stanno ancora caricando
//     if (loadingProducts) {
//         return (
//             <section className="products-section">
//                 <h2 className="products-section-title">Ultimi arrivi</h2>
//                 <p className="products-section-p">Altre occasioni per buttare soldi</p>
//                 <p className="loading">Caricamento...</p>
//             </section>
//         );
//     }

//     // Prendiamo gli ultimi 12 prodotti
//     const latest = [...products].slice(-12).reverse();

//     return (
//         <section className="products-section">
//             <h2 className="products-section-title">Ultimi arrivi</h2>
//             <p className="products-section-p">Altre occasioni per buttare soldi</p>

//             <Carousel products={latest} itemsPerPage={4} />
//         </section>
//     );
// }

import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import Carousel from "./Carousel";
import "../../styles/PopularProducts.css";

export default function LastAdded() {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLatest() {
            setLoading(true);
            try {
                // Chiamata dedicata con sort/id DESC e limit
                const latest = await getProducts({
                    sort: "id_desc",
                    limit: 12
                });
                setLatestProducts(latest);
            } catch (err) {
                setLatestProducts([]); // fallback
            } finally {
                setLoading(false);
            }
        }
        fetchLatest();
    }, []);

    if (loading) {
        return (
            <section className="products-section">
                <h2 className="products-section-title">Ultimi arrivi</h2>
                <p className="products-section-p">Altre occasioni per buttare soldi</p>
                <p className="loading">Caricamento...</p>
            </section>
        );
    }

    return (
        <section className="products-section">
            <h2 className="products-section-title">Ultimi arrivi</h2>
            <p className="products-section-p">Altre occasioni per buttare soldi</p>
            <Carousel products={latestProducts} itemsPerPage={4} />
        </section>
    );
}