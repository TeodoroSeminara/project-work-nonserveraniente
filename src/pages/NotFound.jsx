import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Pagina non trovata</h2>
      <p className="notfound-text">
        La pagina che stai cercando non esiste o è stata rimossa.
      </p> 

      <Link to="/" className="notfound-btn">
        Torna alla Home
      </Link>
    </div>
  );
}
