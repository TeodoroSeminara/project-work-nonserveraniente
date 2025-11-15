import { useState } from "react";
import { Hero } from "../components/Hero";
import PopularProducts from "../components/PopularProducts";
import LastAdded from "../components/LastAdded";
import FinalCTA from "../components/FinalCTA";
import AllProducts from "../components/AllProducts";

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
