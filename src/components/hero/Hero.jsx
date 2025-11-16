import "../../styles/Hero.css";

export function Hero() {
    // Funzione chiamata quando clicchi il bottone
    const handleClick = () => {
        const section = document.getElementById("popular-products");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
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
                        Sei ancora in tempo...
                    </button>
                </div>
            </div>
        </section>
    );
}
