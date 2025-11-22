import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Serve per gestire URL!
import { useApi } from "../../context/ApiContext";
import { ProductCard } from "./ProductCard";
import { FiHome, FiArrowUp } from "react-icons/fi";
import ProductFilters from "./ProductFilters";
import "../../styles/PopularProducts.css";
import "../../styles/AllProducts.css";
import { getCategories } from "../../services/api";
import LowBar from "./Lowbar";

export default function AllProducts() {
  // Hook custom dal context per API prodotti
  const {
    products,
    loadingProducts,
    loadMoreProducts,
    hasMore,
    reloadProducts,
  } = useApi();

  // Stato locale delle categorie (usato solo per sidebar filtri)
  const [categories, setCategories] = useState([]);

  // Hooks per manipolare/navigare l’URL della pagina
  const navigate = useNavigate();
  const location = useLocation();

  // Carica categorie dal backend all’avvio
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

  // Funzione chiamata dal componente filtri ogni volta che cambia qualcosa
  // Aggiorna l'URL per avere la ricerca condivisibile (e triggera la ricerca)
  const handleFilter = (filters) => {
    // Genera stringa della query da tutti i filtri attivi (es: category, price_min...)
    const params = new URLSearchParams();
    if (filters.name) params.set("name", filters.name);
    if (filters.price_min !== undefined)
      params.set("price_min", filters.price_min);
    if (filters.price_max !== undefined)
      params.set("price_max", filters.price_max);
    if (filters.utility) params.set("utility", filters.utility);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);

    // Naviga all’URL aggiornato
    navigate(`?${params.toString()}`);

    // Aggiorna subito i risultati prodotti secondo i nuovi filtri
    reloadProducts(filters);
  };

  // Quando cambia la query string (per esempio all'apertura, refresh o copia/incolla URL)
  // aggiorna i prodotti mostrati!
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filters = {};

    // Estrai filtri dai parametri attuali dell’URL
    if (params.get("name")) filters.name = params.get("name");
    if (params.get("price_min")) filters.price_min = params.get("price_min");
    if (params.get("price_max")) filters.price_max = params.get("price_max");
    if (params.get("utility")) filters.utility = params.get("utility");
    if (params.get("category")) filters.category = params.get("category");
    if (params.get("sort")) filters.sort = params.get("sort");

    // Aggiorna la lista prodotti filtrati dal context secondo URL
    reloadProducts(filters);
    // eslint-disable-next-line
  }, [location.search]);

  // Scrolla in cima alla pagina prodotti
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Torna alla homepage
  const handleGoHome = () => {
    navigate("/");
  };

  // Mostra caricamento all'avvio
  if (loadingProducts && products.length === 0) {
    return (
      <div className="all-products-wrapper">
        <section className="products-section" id="all-products">
          <h2 className="products-section-title">Bello...</h2>
          <p className="loading">Caricamento prodotti...</p>
        </section>
      </div>
    );
  }

  return (
    <>
      <LowBar />
      <div className="all-products-wrapper">
        <section className="products-section" id="all-products">
          <h2 className="all-products-section-title">Bello...</h2>
          <div className="all-products-layout">
            {/* SIDEBAR FILTRI: riceve le categorie e la callback onFilter */}
            <ProductFilters
              categoriesFromDb={categories}
              onFilter={handleFilter}
            />
            {/* Main area: lista prodotti renderizzati */}
            <div className="all-products-main">
              <div className="products-section-flex">
                {!loadingProducts && products.length === 0 ? (
                  <p>Nessun prodotto trovato con questi filtri.</p>
                ) : (
                  products.map((p) => <ProductCard key={p.slug} product={p} />)
                )}
              </div>
              {/* FOOTER: mostra quanti prodotti, pulsanti UX */}
              <div className="all-products-footer">
                <p className="all-products-counter">
                  Mostrati {products.length} prodotti inutili
                </p>
                <div className="all-products-button-row">
                  <button
                    className="go-back-button"
                    onClick={handleScrollToTop}
                  >
                    <FiArrowUp />
                  </button>
                  {hasMore && !loadingProducts && (
                    <button
                      className="load-more-button"
                      type="button"
                      onClick={loadMoreProducts}
                    >
                      Carica altro
                    </button>
                  )}
                  {loadingProducts && <p>Caricamento...</p>}
                  <button className="go-home-button" onClick={handleGoHome}>
                    <FiHome />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useApi } from "../../context/ApiContext";
// import { ProductCard } from "./ProductCard";
// import { FiHome, FiArrowUp } from "react-icons/fi";
// import ProductFilters from "./ProductFilters";
// import "../../styles/PopularProducts.css";
// import "../../styles/AllProducts.css";
// import { getCategories } from "../../services/api";

// export default function AllProducts() {
//   const {
//     products,
//     loadingProducts,
//     loadMoreProducts,
//     hasMore,
//     reloadProducts,
//   } = useApi();
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const cats = await getCategories(); // Usa la funzione da api.js
//         setCategories(cats);
//       } catch (error) {
//         console.error("Errore caricamento categorie:", error);
//       }
//     }
//     fetchCategories();
//   }, []);
//   const handleFilter = (filters) => {
//     console.log("Filtri applicati:", filters); // Debug
//     reloadProducts(filters);
//   };

//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   if (loadingProducts && products.length === 0) {
//     return (
//       <div className="all-products-wrapper">
//         <section className="products-section" id="all-products">
//           <h2 className="products-section-title">Bello...</h2>
//           <p className="loading">Caricamento prodotti...</p>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className="all-products-wrapper">
//       <section className="products-section" id="all-products">
//         <h2 className="all-products-section-title">Bello...</h2>

//         <div className="all-products-layout">
//           {/* SIDEBAR FILTRI */}
//           <ProductFilters
//             categoriesFromDb={categories}
//             onFilter={handleFilter}
//           />

//           {/* COLONNA PRINCIPALE */}
//           <div className="all-products-main">
//             <div className="products-section-flex">
//               {!loadingProducts && products.length === 0 ? (
//                 <p>Nessun prodotto trovato con questi filtri.</p>
//               ) : (
//                 products.map((p) => <ProductCard key={p.slug} product={p} />)
//               )}
//             </div>

//             {/* FOOTER DELLA LISTA */}
//             <div className="all-products-footer">
//               <p className="all-products-counter">
//                 Mostrati {products.length} prodotti inutili
//               </p>

//               <div className="all-products-button-row">
//                 <button className="go-back-button" onClick={handleScrollToTop}>
//                   <FiArrowUp />
//                 </button>

//                 {hasMore && !loadingProducts && (
//                   <button
//                     className="load-more-button"
//                     type="button"
//                     onClick={loadMoreProducts}
//                   >
//                     Carica altro
//                   </button>
//                 )}

//                 {loadingProducts && <p>Caricamento...</p>}

//                 <button className="go-home-button" onClick={handleGoHome}>
//                   <FiHome />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
