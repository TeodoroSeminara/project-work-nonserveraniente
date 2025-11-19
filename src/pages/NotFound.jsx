import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <img 
        src="/images/404_error.png" 
        alt="404 error" 
        className="notfound-image" 
      />

      <h1 className="notfound-title">Oops...</h1>
      <p className="notfound-sub">
        Sembra che questa pagina si sia persa come i tuoi soldi su questo sito.
      </p>

      <Link to="/">
        <button className="notfound-button">Torna alla Home</button>
      </Link>
    </div>
  );
}
