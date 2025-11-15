import "../styles/Hero.css";

export function Hero() {

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
                    <h1>Benvenuto nel nostro shop</h1>
                    <p>Compra ora, pentiti dopo.</p>
                    <button>Sei ancora in tempo...</button>
                </div>
            </div>
        </section>
    );
}
