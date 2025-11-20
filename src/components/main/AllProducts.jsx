// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useApi } from "../../context/ApiContext";
// import { ProductCard } from "./ProductCard";
// import { FiHome, FiArrowUp } from "react-icons/fi";
// import "../../styles/PopularProducts.css";
// import "../../styles/AllProducts.css";
// import ProductFilters from "./ProductFilters";

// export default function AllProducts() {
//   const { products, loadingProducts, loadMoreProducts, hasMore, reloadProducts } = useApi();
//   const [categories, setCategories] = useState([]);


//   useEffect(() => {
//     async function fetchCategories() {
//       const cats = await getCategories();
//       setCategories(cats);
//     }
//     fetchCategories();
//   }, []);

//   const handleFilter = filters => reloadProducts(filters);

//   const navigate = useNavigate();

//   // Se sta caricando, mostra placeholder
//   if (loadingProducts) {
//     return (
//       <div className="all-products-wrapper">
//         <section className="products-section" id="all-products">
//           <h2 className="products-section-title">Bello...</h2>
//           <p className="loading">Caricamento prodotti...</p>
//         </section>
//       </div>
//     );
//   }

//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="all-products-layout">
//       <ProductFilters categoriesFromDb={categories} onFilter={handleFilter} />
//       <div className="all-products-main">
//         <section className="products-section" id="all-products">
//           <h2 className="all-products-section-title">Bello...</h2>
//           <div className="products-section-flex">
//             {products.map((p) => (
//               <ProductCard key={p.slug} product={p} />
//             ))}
//           </div>
//           {/* ...footer e bottoni come sempre... */}
//           <div className="all-products-footer">
//             <p className="all-products-counter">
//               Mostrati {products.length} prodotti inutili
//             </p>


//             <div className="all-products-button-row">
//               <button className="go-back-button" onClick={handleScrollToTop}>
//                 <FiArrowUp />
//               </button>

//               {hasMore && !loadingProducts && (
//                 <button className="load-more-button" type="button"
//                   onClick={e => {
//                     e.preventDefault(); // Precauzione massima!
//                     loadMoreProducts();
//                   }}>
//                   Carica altro
//                 </button>
//               )}


//               <button className="go-home-button" onClick={handleGoHome}>
//                 <FiHome />
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>

//     // <div className="all-products-wrapper">
//     //   <section className="products-section" id="all-products">
//     //     <h2 className="all-products-section-title">Bello...</h2>

//     //     <div className="products-section-flex">
//     //       {products.map((p) => (
//     //         <ProductCard key={p.slug} product={p} />
//     //       ))}
//     //     </div>


//     //   </section >
//     // </div >
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { ProductCard } from "./ProductCard";
import { FiHome, FiArrowUp } from "react-icons/fi";
import ProductFilters from "./ProductFilters";
import "../../styles/PopularProducts.css";
import "../../styles/AllProducts.css";
import { getCategories } from "../../services/api";

export default function AllProducts() {
  const { products, loadingProducts, loadMoreProducts, hasMore, reloadProducts } = useApi();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories(); // Usa la funzione da api.js
        setCategories(cats);
      } catch (error) {
        console.error("Errore caricamento categorie:", error);
      }
    }
    fetchCategories();
  }, []);
  const handleFilter = (filters) => {
    console.log("Filtri applicati:", filters); // Debug
    reloadProducts(filters);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    navigate("/");
  };

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
    <div className="all-products-wrapper">

      <section className="products-section" id="all-products">
        <h2 className="all-products-section-title">Bello...</h2>

        <div className="all-products-layout">

          {/* SIDEBAR FILTRI */}
          <ProductFilters
            categoriesFromDb={categories}
            onFilter={handleFilter}
          />

          {/* COLONNA PRINCIPALE */}
          <div className="all-products-main">

            <div className="products-section-flex">
              {products.length === 0 && !loadingProducts ? (
                <p>Nessun prodotto trovato con questi filtri.</p>
              ) : (
                products.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))
              )}
            </div>

            {/* FOOTER DELLA LISTA */}
            <div className="all-products-footer">

              <p className="all-products-counter">
                Mostrati {products.length} prodotti inutili
              </p>

              <div className="all-products-button-row">

                <button className="go-back-button" onClick={handleScrollToTop}>
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
  );

}