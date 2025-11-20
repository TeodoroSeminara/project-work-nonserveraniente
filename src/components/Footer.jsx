import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner">

        {/* Colonna Brand */}
        <div className="footer-column">
          <h4 className="footer-title">NonServeaNiente</h4>
          <p className="footer-text">Compra ora, pentiti dopo!</p>
          <p className="footer-text">Il tuo shop di oggetti assolutamente inutili</p>
        </div>

        {/* Colonna Link */}
        <div className="footer-column">
          <h4 className="footer-title">Link Rapidi</h4>
          <ul className="footer-list">
            <li>Chi siamo (seriamente?)</li>
            <li>Termini e condizioni (noiosi)</li>
            <li>Privacy (la teniamo stretta)</li>
          </ul>
        </div>

        {/* Colonna Contatti */}
        <div className="footer-column">
          <h4 className="footer-title">Contatti</h4>
          <p className="footer-text">info@nonserveaniente.com</p>
          <p className="footer-text">+39 000 000 0000</p>
        </div>

      </div>
    </div>
  );
}
