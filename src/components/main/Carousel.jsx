import { useState } from "react";
import { ProductCard } from "./ProductCard";
import "../../styles/Carousel.css"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Questo componente mostra una lista di prodotti con un carosello.
// Riceve:
// - products: array di prodotti da mostrare
// - itemsPerPage: quanti prodotti mostrare per pagina (default 4)
export default function Carousel({ products, itemsPerPage = 4 }) {

    // Indice di partenza del gruppo di prodotti visibili
    const [startIndex, setStartIndex] = useState(0);

    // Se non ci sono prodotti, non renderizziamo nulla
    if (!products || products.length === 0) {
        return null
    }

    // Calcoliamo il massimo indice di partenza possibile
    const maxStartIndex = Math.max(products.length - itemsPerPage, 0);

    // Prodotti visibili nell apgina attuale del carosello
    const visibleProducts = products.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    //Numero totale di pagine (gruppi da itemsPerPage)
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Pagina corrente: partiamo da 1 non da 0
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

    // Vai alla pagina successiva (sposta l'indice di partenza in avanti)
    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + itemsPerPage, maxStartIndex))
    };

    //Torna alla pagina precedente
    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - itemsPerPage, 0))
    };

    return (
        <div className="products-carousel">
            <div className="products-carousel-row">
                <button className="carousel-button"
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    aria-label="Pagina precedente"
                >
                    <FiChevronLeft />
                </button>
                <div className="product-section-carousel-flex">
                    {visibleProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
                <button
                    className="carousel-button"
                    onClick={handleNext}
                    disabled={startIndex === maxStartIndex}
                    aria-label="Pagina successiva"
                >
                    <FiChevronRight />
                </button>
            </div>
            <p className="products-carousel-counter">
                {currentPage} di {totalPages}
            </p>
        </div>
    )
}