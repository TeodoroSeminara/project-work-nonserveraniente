// NavBar presente in tutte le pagine 
import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Search } from "lucide-react";
import "../../styles/NavBar.css"
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import CartDrawer from "../main/CartDrawer";

export default function NavBar() {

  const { cartCount } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="container d-flex justify-content-between p-3 navbar">

        {/* Logo */}
        <Link to="/"><h1 className="navbar-logo fs-3 m-0">NonServeaNiente</h1></Link>

        {/* Elementi di navigazione */}
        <ul className="d-flex justify-content-between align-items-center gap-5 m-0 p-0">

          <li>
            <Link to="/catalogo" className="navbar-icon">
              <Search />
            </Link>
          </li>

          <li>
            <Link to="/wishlist" className="navbar-icon">
              <Heart />
            </Link>
          </li>

          {/* ICONA CARRELLO → APRE DRAWER */}
          <li>
            <Link
              to="#"
              className="navbar-icon navbar-cart position-relative"
              onClick={(e) => {
                e.preventDefault();  
                setDrawerOpen(true);
              }}
            >
              <ShoppingCart />

              {cartCount > 0 && (
                <span className="badge text-black cart-number">
                  {cartCount}
                </span>
              )}
            </Link>

          </li>
        </ul>
      </nav>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
