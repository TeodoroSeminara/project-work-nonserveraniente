// Footer presente in tutte le pagine
import './style/Footer.css'

export default function Footer(){
  return (
    <>
    {/* Container principale del footer */}
     <div className="container d-flex justify-content-between">
      {/* Column degli elementi */}
        <div className="col d-flex justify-content-between">
          <div className="">
              <ul className="footer-ul d-flex justify-content-center flex-column align-content-center">
                <li>
                  {/* Titolo  */}
                  <h4 className="footer-h4">NonServeaNiente</h4>
                </li>
                <li className="footer-li-info">
                  Compra ora, pentiti dopo!
                  </li>
                <li className="footer-li-info">
                  Il tuo shop di oggetti assolutamente inutili
                  </li>
              </ul>
          </div>
          <div>
            <ul className="footer-ul">
              <li>
                {/* Titolo  */}
                <h4 className="footer-h4">Link Rapidi</h4>
              </li>
              <li>
                Chi siamo (seriamente?)
              </li>
              <li>
                Termini e condizioni(noiosi)
              </li>
              <li>
               Privacy (La teniamo Stretta)
              </li>
            </ul>
          </div>
          <div>
            <ul className="footer-ul">
              <li>
                {/* Titolo  */}
                <h4 className="footer-h4">Contatti</h4>
              </li>
            </ul>
          </div>
        </div>
     </div>
    </>
  )
}