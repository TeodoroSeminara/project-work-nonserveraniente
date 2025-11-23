import { Link } from "react-router-dom";
import "../styles/ThankYouPage.css";

export default function ThankYouPage() {
  return (
    <div className="thankyou-container">
      <div className="thankyou-icon">🎉</div>

      <h1 className="thankyou-title">Grazie per il tuo ordine!</h1>

      <p className="thankyou-message">
        Il pagamento è andato a buon fine.<br />
        Ti abbiamo inviato una mail con il riepilogo dell’ordine.
      </p>

      <Link to="/" className="thankyou-home-btn">
        Torna alla Home
      </Link>
    </div>
  );
}
