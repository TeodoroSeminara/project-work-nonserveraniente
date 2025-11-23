import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import dropin from "braintree-web-drop-in";
import { useNavigate } from "react-router-dom"; 
import "../styles/CheckoutPage.css";

const API_BASE_URL = "http://localhost:3000/api/nonserveaniente";

export default function CheckoutPage() {
  const dropinInstance = useRef(null);
  const [clientToken, setClientToken] = useState(null);
  const [loadingPaymentUI, setLoadingPaymentUI] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate(); 

  const { cartItems, setCartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );
  const shipping_cost = subtotal >= 50 ? 0 : 5.99;

  const [showBilling, setShowBilling] = useState(false);

  const [formData, setFormData] = useState({
    shipping_address: "",
    shipping_cap: "",
    shipping_city: "",
    shipping_description: "",
    billing_address: "",
    billing_cap: "",
    billing_city: "",
    billing_description: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  // Carico carrello + token pagamento
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(stored);

    fetch(`${API_BASE_URL}/carrello/token`)
      .then((res) => res.json())
      .then((data) => {
        setClientToken(data.clientToken);
      })
      .catch((err) => {
        console.error("Errore nel recupero del clientToken:", err);
      });
  }, []);

  // Inizializzo Braintree Drop-in
  useEffect(() => {
    if (!clientToken) return;

    dropin.create(
      {
        authorization: clientToken,
        container: "#braintree-dropin-container",
      },
      (err, instance) => {
        if (err) {
          console.error("Errore creazione drop-in:", err);
          setLoadingPaymentUI(false);
          return;
        }
        dropinInstance.current = instance;
        setLoadingPaymentUI(false);
      }
    );

    return () => {
      if (dropinInstance.current) {
        dropinInstance.current.teardown().catch(() => {});
      }
    };
  }, [clientToken]);

  // Gestione campi input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "shipping_cap" || name === "billing_cap") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 5);
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
      return;
    }

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // INVIO PAGAMENTO + FATTURA
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dropinInstance.current) {
      alert("Il pagamento non è pronto. Riprova.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Carrello vuoto.");
      return;
    }

    if (formData.shipping_cap.length !== 5) {
      alert("Il CAP deve avere 5 cifre.");
      return;
    }

    if (formData.phone.length < 6) {
      alert("Telefono troppo corto.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email non valida.");
      return;
    }

    setSubmitting(true);

    dropinInstance.current.requestPaymentMethod(async (err, payload) => {
      if (err) {
        console.error("Errore metodo pagamento:", err);
        alert("Errore nel metodo di pagamento.");
        setSubmitting(false);
        return;
      }

      const paymentMethodNonce = payload.nonce;

      const body = {
        paymentMethodNonce,
        ...formData,
        shipping_cost,
        items: cartItems.map((item) => ({
          slug: item.slug,
          quantity: item.qty,
          name: item.title,
          price: item.price,
        })),
      };

      try {
        const res = await fetch(`${API_BASE_URL}/carrello/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("Errore backend:", data);
          alert(data.message || "Errore durante il pagamento.");
          setSubmitting(false);
          return;
        }

        // 🎉 SUCCESSO: svuoto carrello e redirect
        localStorage.removeItem("cartItems");
        setCartItems([]);

        navigate("/thank-you"); 

      } catch (error) {
        console.error("Errore rete:", error);
        alert("Errore di rete, riprova.");
      } finally {
        setSubmitting(false);
      }
    });
  };

  return (
    <main className="checkout-container">
      <section className="checkout-summary-wrapper">
        <h1>Checkout</h1>

        <div className="checkout-summary-box">
          <h2 className="checkout-summary-title">Riepilogo ordine</h2>

          {cartItems.length === 0 ? (
            <p className="checkout-empty">Il carrello è vuoto.</p>
          ) : (
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.slug} className="checkout-item-row">
                  <div className="checkout-item-info">
                    <div className="checkout-item-title">{item.title}</div>
                    <div className="checkout-item-details">
                      <span>Quantità: {item.qty}</span>
                      <strong className="checkout-price">
                        €{(item.price * item.qty).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}

              <div className="checkout-total-row">
                <span>Totale prodotti:</span>
                <span className="checkout-total-price">
                  <strong>€{subtotal.toFixed(2)}</strong>
                </span>
              </div>

              <div className="checkout-total-row">
                <span>Spedizione:</span>
                <span className="checkout-total-price">
                  <strong>
                    {shipping_cost === 0
                      ? "Gratis"
                      : `€${shipping_cost.toFixed(2)}`}
                  </strong>
                </span>
              </div>

              <div className="checkout-total-row checkout-total-final">
                <span>Totale:</span>
                <span className="checkout-total-price">
                  <strong>€{(subtotal + shipping_cost).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <fieldset>
            <legend>Dati personali</legend>
            <input name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
            <input name="surname" placeholder="Cognome" value={formData.surname} onChange={handleChange} required />
            <input name="phone" placeholder="Telefono" value={formData.phone} onChange={handleChange} required inputMode="tel" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </fieldset>

          <fieldset>
            <legend>Indirizzo spedizione</legend>
            <input name="shipping_address" placeholder="Indirizzo" value={formData.shipping_address} onChange={handleChange} required />
            <input name="shipping_cap" placeholder="CAP" value={formData.shipping_cap} onChange={handleChange} required inputMode="numeric" />
            <input name="shipping_city" placeholder="Città" value={formData.shipping_city} onChange={handleChange} required />
            <input name="shipping_description" placeholder="Note (facoltative)" value={formData.shipping_description} onChange={handleChange} />
          </fieldset>

          {/* BILLING CHECKBOX */}
          <div className="billing-checkbox-row" style={{ margin: "18px 0 6px 0" }}>
            <input
              type="checkbox"
              id="show-billing"
              checked={showBilling}
              onChange={(e) => setShowBilling(e.target.checked)}
            />
            <label htmlFor="show-billing" style={{ marginLeft: 8 }}>
              Indirizzo di fatturazione differente?
            </label>
          </div>

          {showBilling && (
            <fieldset>
              <legend>Indirizzo fatturazione</legend>
              <input name="billing_address" placeholder="Indirizzo" value={formData.billing_address} onChange={handleChange} />
              <input name="billing_cap" placeholder="CAP" value={formData.billing_cap} onChange={handleChange} inputMode="numeric" />
              <input name="billing_city" placeholder="Città" value={formData.billing_city} onChange={handleChange} />
              <input name="billing_description" placeholder="Note" value={formData.billing_description} onChange={handleChange} />
            </fieldset>
          )}

          <fieldset>
            <legend>Pagamento</legend>
            <div id="braintree-dropin-container"></div>
            {loadingPaymentUI && <p>Caricamento metodo di pagamento...</p>}
          </fieldset>

          <div className="checkout-button-container">
            <button type="submit" disabled={submitting || loadingPaymentUI}>
              {submitting ? "Elaborazione..." : "Conferma e paga"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

