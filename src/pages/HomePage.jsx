
import { useState } from "react";
import { Hero } from "../components/hero/Hero";
import PopularProducts from "../components/main/PopularProducts";
import LastAdded from "../components/main/LastAdded";
import FinalCTA from "../components/hero/FinalCTA";
import AllProducts from "../components/main/AllProducts";
import { Link } from "react-router-dom"

export default function HomePage() {
  // Stato che dice se mostrare o no la sezione "Tutti i prodotti"
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleExploreAll = () => {
    // Mostriamo la sezione
    setShowAllProducts(true);

    // Dopo che React ha aggiornato il DOM, facciamo lo scroll
    setTimeout(() => {
      const section = document.getElementById("all-products");
      if (!section) return;

      if (typeof section.scrollIntoView === "function") {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <>

      <Hero />
      <PopularProducts />
      <LastAdded />
      
      {/* Passiamo la funzione al bottone finale */}
      <FinalCTA onExploreAll={handleExploreAll} />

      {/* Questa sezione appare solo dopo il click */}
      {showAllProducts && <AllProducts />}
    </>
  );
}


   