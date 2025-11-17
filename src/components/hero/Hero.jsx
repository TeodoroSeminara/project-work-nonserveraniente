import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";

export function Hero() {

    const navigate = useNavigate()

    // Funzione chiamata quando clicchi il bottone
    const handleClick = () => {
        navigate("/catalogo")
    };

    return (
        <section className="hero">
            <img
                className="hero-img"
                src="/images/hero-background.png"  
            />
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Non Serve A Niente</h1>
                    <p>Compra ora, pentiti dopo.</p>
                    <button onClick={handleClick}>
                        Buona fortuna
                    </button>
                </div>
            </div>
        </section>
    );
}
