import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import "../../styles/PopularProducts.css";
import "../../styles/Carousel.css"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Carosello riutilizzabile e responsive:
// - products: array di prodotti
// - defaultItemsPerPage: quante card per pagina su desktop (es. 4)
export default function Carousel({ products, defaultItemsPerPage = 4 }) {
  // Indice della pagina corrente (0 = prima pagina, 1 = seconda, ecc.)
  const [pageIndex, setPageIndex] = useState(0);
  // Quante card mostrare per pagina (cambia in base alla larghezza schermo)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Effetto che aggiorna itemsPerPage in base alla larghezza della finestra
  useEffect(() => {
    function updateItemsPerPage() {
      const width = window.innerWidth;

      if (width < 480) {
        // Mobile piccolo: 1 card per pagina
        setItemsPerPage(1);
      } else if (width < 768) {
        // Tablet: 2 card per pagina
        setItemsPerPage(2);
      } else {
        // Desktop: valore di default (es. 4)
        setItemsPerPage(defaultItemsPerPage);
      }

      // Quando cambia layout (da 1 a 2 a 4 card), torniamo alla prima pagina
      setPageIndex(0);
    }

    updateItemsPerPage(); // chiamata iniziale

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [defaultItemsPerPage]);

  // Se non ci sono prodotti non renderizziamo niente
  if (!products || products.length === 0) {
    return null;
  }

  // Quante pagine totali abbiamo (ogni pagina contiene itemsPerPage prodotti)
  const totalPages = Math.max(Math.ceil(products.length / itemsPerPage), 1);

  // Ci assicuriamo che pageIndex sia sempre nel range [0, totalPages - 1]
  const currentPageIndex = ((pageIndex % totalPages) + totalPages) % totalPages;

  // Indice di partenza dei prodotti da mostrare
  const startIndex = currentPageIndex * itemsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const currentPage = currentPageIndex + 1; // per mostrarlo come 1,2,3...

  // 👉 Vai alla pagina successiva in modo circolare
  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  // 👉 Vai alla pagina precedente in modo circolare
  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Se c'è solo 1 pagina, i bottoni non servono davvero
  const isSinglePage = totalPages <= 1;

  return (
    <div className="products-carousel">
      <div className="products-carousel-row">
        {/* Bottone pagina precedente */}
        <button
          className="carousel-button"
          onClick={handlePrev}
          disabled={isSinglePage}
          aria-label="Pagina precedente"
        >
          <FiChevronLeft />
        </button>

        {/* Card visibili nella pagina corrente */}
        <div className="product-section-carousel-flex">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottone pagina successiva */}
        <button
          className="carousel-button"
          onClick={handleNext}
          disabled={isSinglePage}
          aria-label="Pagina successiva"
        >
          <FiChevronRight />
        </button>
      </div>

      <p className="products-carousel-indicator">
        Pagina {currentPage} di {totalPages}
      </p>
    </div>
  );
}
