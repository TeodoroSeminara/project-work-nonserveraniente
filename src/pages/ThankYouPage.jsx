import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../styles/ThankYouPage.css"

export default function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();

    // Dati passati dal Checkout: { invoice, items }
    const state = location.state || {};
    const { invoice, items } = state;

    // Se arrivo qui senza state (es. refresh diretto su /thank-you),
    // rimando l'utente in home
     useEffect(() => {
        if (!invoice) {
            navigate("/");
        }
    }, [invoice, navigate]);

    // Timer per tornare alla home dopo X secondi
     useEffect(() => {
        if (!invoice) return; // evita loop se non ci sono dati

        const timer = setTimeout(() => {
            navigate("/");
        }, 5000); // 5 secondi

        return () => clearTimeout(timer);
    }, [invoice, navigate]); 

    if (!invoice) {
        // Breve fallback mentre il redirect scatta
        return <p>Reindirizzamento alla home...</p>;
    }

    const total = Number(invoice.total_amount || 0);
    const shipping = Number(invoice.shipping_cost || 0); 

    return (
        <main className="thankyou-container">
            <h1>🎉 Grazie per il tuo ordine!</h1>
            <p>
                Ciao <strong>{invoice.name} {invoice.surname}</strong>, il tuo ordine è
                stato ricevuto correttamente.
            </p>

            <p className="thankyou-order-number">
                <strong>Numero ordine:</strong> {invoice.order_number}
            </p>
            <p>
                <strong>Email di conferma:</strong> {invoice.email}
            </p>

            <section className="thankyou-order-summary">
                <h2>Riepilogo ordine</h2>
                <ul className="thankyou-order-items">
                    {items?.map((it) => (
                        <li
                            key={it.product_id}
                            className="thankyou-order-item"
                        >
                            <span>
                                {it.quantity}× {it.name_product}
                            </span>
                            <span>€{Number(it.price_for_quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <div className="thankyou-order-totals">
                    <p>Spedizione: {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}</p>
                    <p className="thankyou-order-total-amount">
                        Totale: €{total.toFixed(2)}
                    </p>
                </div>
            </section>

            <p className="thankyou-redirect-message">
                Verrai reindirizzato alla home tra pochi secondi...
            </p>
            <p>
                Oppure <Link to="/">clicca qui per tornare subito alla Home</Link>.
            </p>
        </main>
    );
}