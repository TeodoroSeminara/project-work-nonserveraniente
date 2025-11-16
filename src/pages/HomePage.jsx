
import { Hero } from "../components/hero/Hero";
import PopularProducts from "../components/main/PopularProducts";
import LastAdded from "../components/main/LastAdded";
import FinalCTA from "../components/hero/FinalCTA";


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
