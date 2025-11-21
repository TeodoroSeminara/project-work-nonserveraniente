import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/WelcomePopup.css";

const LOCALSTORAGE_KEY = "nsn_welcome_shown";

// Funzione per validare la mail: deve avere @ e almeno un . dopo la @
function isValidEmail(email) {
    if (!email) return false;
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

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
        if (!isValidEmail(email)) {
            // Il popup visivo ti avvisa, non serve alert qui!
            return;
        }

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

            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        } catch (err) {
            console.error("Errore invio email:", err);
            localStorage.setItem(LOCALSTORAGE_KEY, "true");
            setIsOpen(false);
        } finally {
            setSending(false);
        }
    };

    if (!isOpen) return null;

    // Mostra errore SOLO se l’input è non vuoto e non valido
    const showError = email.length > 0 && !isValidEmail(email);

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
                            {/* Messaggio di errore visivo */}
                            {showError && (
                                <div className="welcome-popup-error">
                                    Inserisci un indirizzo email valido (deve contenere @ e almeno un . dopo la @)
                                </div>
                            )}
                            <button type="submit" disabled={sending || !isValidEmail(email)}>
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
