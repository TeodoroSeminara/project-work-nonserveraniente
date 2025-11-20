// NavBar presente in tutte le pagine 
import { Link } from "react-router-dom"
// import per le icone 
import { ShoppingCart, Heart, Search, Badge } from "lucide-react";
import "../../styles/NavBar.css"
import { useCart } from "../../context/CartContext";

export default function NavBar() {

  const { cartCount } = useCart();

  return (
    <>
      <nav className="container d-flex justify-content-between p-3 navbar">
        {/* Logo */}
        <Link to="/"><h1 className="navbar-logo fs-3 m-0">NonServeaNiente</h1></Link>
        {/* Elementi di navigazione con icone annesse */}
        <ul className="d-flex justify-content-between align-items-center gap-5 m-0 p-0">
          <li>
            <Link to="/catalogo" className="navbar-icon">
              {/* SearchBar */}
              <Search />
            </Link>
          </li>
          <li>
            <Link className="navbar-icon">
              {/* Wishlist */}
              <Heart />
            </Link>
          </li>
          <li>
            <div className="position-relative">
              <Link className="navbar-icon"
               to="/carrello">
                {/* Carrello */}
                <ShoppingCart />
                <Badge
                  size={20}
                  className="position-absolute bottom-50" />
                <span
                  id="cartBadge"
                  className="position-absolute bottom-50 badge text-black">
                  {/* Numero di articoli nel carrello */}
                 {cartCount}
                </span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}