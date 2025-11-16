import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import "../../styles/PopularProducts.css";
import "../../styles/Carousel.css"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Carousel({ products, defaultItemsPerPage = 4 }) {

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Effetto che decide quante card mostrare in base alla larghezza dello schermo
  useEffect(() => {
    function updateItemsPerPage() {
      const width = window.innerWidth;

      if (width < 670) {
        setItemsPerPage(1);      
      } else if (width < 1120) {
        setItemsPerPage(2);      
      } else {
        setItemsPerPage(defaultItemsPerPage); 
      }

      // Ogni volta che cambia layout, torniamo alla prima pagina
      setStartIndex(0);
    }

    updateItemsPerPage(); // chiamata iniziale

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [defaultItemsPerPage]);

  // 2) SOLO ORA possiamo fare il return condizionale
  if (!products || products.length === 0) {
    return null;
  }

  const maxStartIndex = Math.max(products.length - itemsPerPage, 0);
  const visibleProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + itemsPerPage, maxStartIndex));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };


    return (
        <div className="products-carousel">
            <div className="products-carousel-row">
                {/* Bottone pagina precedente */}
                <button
                    className="carousel-button"
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    aria-label="Pagina precedente"
                >
                    <FiChevronLeft />
                </button>

                {/* Card visibili (1, 2 o 4 a seconda della larghezza) */}
                <div className="product-section-carousel-flex">
                    {visibleProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>

                {/* Bottone pagina successiva */}
                <button
                    className="carousel-button"
                    onClick={handleNext}
                    disabled={startIndex === maxStartIndex}
                    aria-label="Pagina successiva"
                >
                    <FiChevronRight />
                </button>
            </div>

            <p className="products-carousel-indicator">
                {currentPage} di {totalPages}
            </p>
        </div>
    );
}
