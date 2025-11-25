import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { ProductCard } from "./ProductCard";
import { FiHome, FiArrowUp, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import ProductFilters from "./ProductFilters";
import "../../styles/PopularProducts.css";
import "../../styles/AllProducts.css";
import { getCategories } from "../../services/api";
import LowBar from "./Lowbar";

export default function AllProducts() {
  const {
    products,
    loadingProducts,
    hasMore,
    reloadProducts, // deve accettare un oggetto di parametri (filtri + limit/offset)
  } = useApi();

  const [categories, setCategories] = useState([]);

  // 🔹 Stato paginazione
  const [page, setPage] = useState(1);      // pagina corrente (1-based)
  const [perPage, setPerPage] = useState(12); // prodotti per pagina

  // 🔹 Stato filtri attivi
  const [filters, setFilters] = useState({
    name: "",
    price_min: "",
    price_max: "",
    utility: "",
    category: "",
    sort: "",
  });

  const navigate = useNavigate();

  // Carico le categorie solo all'inizio
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Errore caricamento categorie:", error);
      }
    }

    fetchCategories();
  }, []);

  // 🔹 Effetto che ricarica i prodotti quando cambiano filtri/pagina/perPage

  const [prevRequest, setPrevRequest] = useState(null);

  useEffect(() => {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    // console.log("Ricarico prodotti con:", { page, perPage, limit, offset, filters });

    const currentRequest = {
      ...filters,
      limit,
      offset,
    };

      // Evita di ricaricare se la richiesta è identica alla precedente
      if (JSON.stringify(currentRequest) === JSON.stringify(prevRequest)) {
        return;
      }

      setPrevRequest(currentRequest);

      console.log("Ricarico prodotti con:", currentRequest);

      reloadProducts(currentRequest);

    // errore che causava loop
    // reloadProducts({
    //   ...filters,
    //   limit,
    //   offset,
    // });
    // NON metto reloadProducts nelle deps per evitare loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, perPage]);

  // Quando ProductFilters applica nuovi filtri
  const handleFilter = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPage(1); // con nuovi filtri riparto dalla prima pagina
  };

  // Cambio pagina (Prec / Succ)
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    // opzionale: bloccare avanti se non ci sono altri risultati
    // if (newPage > page && !hasMore) return;
    setPage(newPage);
  };

  // Cambio numero di prodotti per pagina
  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    if (!newPerPage || newPerPage <= 0) return;

    setPerPage(newPerPage);
    setPage(1); // resetto alla prima pagina
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (loadingProducts && products.length === 0) {
    return (
      <>
        <LowBar />
        <div className="all-products-wrapper">
          <section className="products-section" id="all-products">
            <h2 className="products-section-title">Bello...</h2>
            <p className="loading">Caricamento prodotti...</p>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <LowBar />
      <div className="all-products-wrapper">
        <section className="products-section" id="all-products">
          <h2 className="all-products-section-title">Bello...</h2>

          <div className="all-products-layout">
            {/* SIDEBAR FILTRI */}
            <ProductFilters
              categoriesFromDb={categories}
              onFilter={handleFilter}
            />

            {/* MAIN LISTA PRODOTTI */}
            <div className="all-products-main">
              <div className="products-section-flex">
                {!loadingProducts && products.length === 0 ? (
                  <p>Nessun prodotto trovato con questi filtri.</p>
                ) : (
                  products.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))
                )}
              </div>

              {/* FOOTER: paginazione + controlli */}
              <div className="all-products-footer">
                <p className="all-products-counter">
                  Mostrati {products.length} prodotti inutili – pagina {page}
                </p>

                <div className="all-products-pagination-row">
                  {/* Selettore "prodotti per pagina" */}
                  <div className="per-page-select">
                    <label>
                      Prodotti per pagina:{" "}
                      <select value={perPage} onChange={handlePerPageChange}>
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                      </select>
                    </label>
                  </div>

                  {/* Bottoni paginazione */}
                  <div className="pagination-buttons">
                    <button
                      className="pagination-button"
                      type="button"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1 || loadingProducts}
                    >
                      <FiArrowLeft />
                    </button>

                    <span className="pagination-current-page">
                      Pagina {page}
                    </span>

                    <button
                      className="pagination-button"
                      type="button"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={!hasMore || loadingProducts}
                    >
                      <FiArrowRight />
                    </button>
                  </div>

                  {/* Bottoni extra */}
                  <div className="all-products-button-row">
                    <button
                      className="go-back-button"
                      onClick={handleScrollToTop}
                    >
                      <FiArrowUp />
                    </button>

                    <button
                      className="go-home-button"
                      onClick={handleGoHome}
                    >
                      <FiHome />
                    </button>
                  </div>
                </div>

                {loadingProducts && <p>Caricamento...</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
