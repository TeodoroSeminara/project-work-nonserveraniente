import "../../styles/FinalCTA.css";
import { useNavigate } from "react-router-dom";

export default function FinalCTA() {

    const navigate = useNavigate();

    const handleClick = () => {

        navigate("/immondizia")

    };

    return (
        <section className="final-cta">
            <div className="final-cta-inner">
                <h2 className="final-cta-title">Pronto a Sprecare i tuoi risparmi?</h2>
                <p className="final-cta-p">Hai visto il peggio, ma il meglio del peggio ti sta ancora aspettando.</p>
                <button className="final-cta-button" onClick={handleClick}>Esplora tutti i prodotti</button>
            </div>
        </section>
    );
}
