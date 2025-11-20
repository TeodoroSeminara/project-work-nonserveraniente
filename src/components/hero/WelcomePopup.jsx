import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/WelcomePopup.css";

const LOCALSTORAGE_KEY = "nsn_welcome_shown";

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const alreadyShown = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!alreadyShown) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem(LOCALSTORAGE_KEY, "true");
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setSending(true);

        try {
            await emailjs.send(
                "service_k4xenoj",     
                "template_s78m8js",    
                {
                    user_email: email,  
                },
                "MxVwJyaupO67MGcc-"     
            );

            setSent(true);
            localStorage.setItem(LOCALSTORAGE_KEY, "true");

            // dopo 2 secondi chiudiamo
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        } catch (err) {
            console.error("Errore invio email:", err);
            // in caso di errore chiudo comunque per non stressare l'utent
            localStorage.setItem(LOCALSTORAGE_KEY, "true");
            setIsOpen(false);
        } finally {
            setSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="welcome-popup-overlay">
            <div className="welcome-popup-card">
                <button className="welcome-popup-close" onClick={handleClose}>
                    ✕
                </button>

                {!sent ? (
                    <>
                        <h2 className="welcome-popup-title">Benvenuto su NonServeANiente 🎉</h2>
                        <p className="welcome-popup-text">
                            Lasciaci la tua mail e ti ringrazieremo con offerte
                            <br />
                            assolutamente inutili.
                        </p>

                        <form className="welcome-popup-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="La tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={sending}
                            />
                            <button type="submit" disabled={sending}>
                                {sending ? "Invio in corso..." : "Iscriviti"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="welcome-popup-title">Grazie! 💌</h2>
                        <p className="welcome-popup-text">
                            Ti abbiamo mandato una mail di benvenuto.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
