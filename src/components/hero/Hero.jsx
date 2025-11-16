import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";

export function Hero() {

    const navigate = useNavigate()

    // Funzione chiamata quando clicchi il bottone
    const handleClick = () => {
        navigate("/immondizia")
    };

    return (
        <section className="hero">
            <video
                className="hero-video"
                src="/videos/hero-background.mp4" 
                autoPlay        
                muted           
                loop           
                playsInline    
            />
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Non Serve A Niente</h1>
                    <p>Compra ora, pentiti dopo.</p>
                    <button onClick={handleClick}>
                        Guarda tutta l'immondizia
                    </button>
                </div>
            </div>
        </section>
    );
}
