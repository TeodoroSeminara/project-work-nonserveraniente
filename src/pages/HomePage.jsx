// import { useState } from "react";
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


export default function HomePage() {

  return (
    <>
      <Hero />
      <PopularProducts />
      <LastAdded />
      <FinalCTA />
    </>
  );
}



   