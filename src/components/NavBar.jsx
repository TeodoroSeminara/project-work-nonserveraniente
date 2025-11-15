// NavBar presente in tutte le pagine 
import { Link } from "react-router-dom"
// import per le icone 
import { ShoppingCart, Heart, Search, Badge } from "lucide-react";

export default function NavBar() {

  

  return (
    <>
     <nav className="container d-flex justify-content-between p-3">
      {/* Logo */}
      <Link path="/"><h1 className="navbar__logo fs-4 ">NonServeaNiente</h1></Link>
       {/* Elementi di navigazione con icone annesse */}
        <ul className="d-flex justify-content-between gap-5 ">
          <li>
            <Link >
            {/* SearchBar */}
                <Search 
                size={18}
                color="#000"/>
          </Link>
          </li>
          <li>
            <Link >
            {/* Wishlist */}
                <Heart 
                size={18}
                color="#000"/>
            </Link>
            </li>
          <li>
            <div className="position-relative">
            <Link>
            {/* Carrello */}
              <ShoppingCart 
              size={18}
              color="#000"
              />
             <Badge 
             size={22}
             className="position-absolute bottom-50"/>
             <span 
             className="position-absolute bottom-50 badge text-black fs-10">5</span>
            </Link>
            </div>
          </li>
        </ul>
     </nav>
    </>
  )
}