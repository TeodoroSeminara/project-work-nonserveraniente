// NavBar presente in tutte le pagine 
import { Link } from "react-router-dom"
// import per le icone 
import { ShoppingCart, Heart, Search, Badge } from "lucide-react";
import "../../styles/NavBar.css"

export default function NavBar() {



  return (
    <>
      <nav className="container d-flex justify-content-between p-3">
        {/* Logo */}
        <Link to="/"><h1 className="navbar__logo fs-3 m-0">NonServeaNiente</h1></Link>
        {/* Elementi di navigazione con icone annesse */}
        <ul className="d-flex justify-content-between align-items-center gap-5 m-0 p-0">
          <li>
            <Link className="navbar-icon">
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
              <Link className="navbar-icon">
                {/* Carrello */}
                <ShoppingCart />
                <Badge
                  size={20}
                  className="position-absolute bottom-50" />
                <span
                  className="position-absolute bottom-50 badge text-black">5</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}