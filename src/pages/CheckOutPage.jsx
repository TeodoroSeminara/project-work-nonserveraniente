import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import dropin from "braintree-web-drop-in";
import CheckOutPage from "./CheckOutPage";

const API_BASE_URL = "http://localhost:3000/api/nonserveaniente";

export default function CheckoutPage() {
  const dropinInstance = useRef(null);
  const [clientToken, setClientToken] = useState(null);
  const [loadingPaymentUI, setLoadingPaymentUI] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { cartItems, setCartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );
  const shipping_cost = subtotal >= 50 ? 0 : 5.99;

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

  // carico items dal localStorage + token
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

  // inizializzo la dropin UI
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

    // cleanup
    return () => {
      if (dropinInstance.current) {
        dropinInstance.current.teardown().catch(() => { });
      }
    };
  }, [clientToken]);

  // form handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dropinInstance.current) {
      alert("Il pagamento non è ancora pronto. Riprova tra qualche secondo.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Il carrello è vuoto.");
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
        items: cartItems.map(item => ({
          slug: item.slug,
          quantity: item.qty,
          name: item.title,
          price: item.price,
        })),
      };
      console.log("Body che sto inviando:", JSON.stringify(body, null, 2));

      try {
        const res = await fetch(`${API_BASE_URL}/carrello/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("Errore backend:", data);
          alert(data.message || "Errore nel pagamento o nella fattura.");
          setSubmitting(false);
          return;
        }

        alert("Ordine completato con successo!");

        // SVUOTA CARRELLO
        localStorage.removeItem("cartItems");
        setCartItems([]);

      } catch (error) {
        console.error("Errore di rete:", error);
        alert("Errore di rete, riprova.");
      } finally {
        setSubmitting(false);
      }
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>

      <h1>Checkout</h1>

      <div className="checkout-summary-box">

        <h2 className="checkout-summary-title">Riepilogo ordine</h2>

        {cartItems.length === 0 ? (
          <p className="checkout-empty">Il carrello è vuoto.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.slug} className="checkout-item-row">
                <div className="checkout-item-info">
                  {item.title}
                  <br />
                  <small>Quantità: {item.qty}</small> <strong>€{(item.price * item.qty).toFixed(2)}</strong>
                </div>
              </div>
            ))}

            <div className="checkout-total-row">
              <span>Totale prodotti:</span>
              <span className="checkout-total-price">
                €{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="checkout-total-row">
              <span>Spedizione:</span>
              <span className="checkout-total-price">
                {shipping_cost === 0 ? "Gratis" : `€${shipping_cost.toFixed(2)}`}
              </span>
            </div>

            <div className="checkout-total-row" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              <span>Totale:</span>
              <span className="checkout-total-price">
                €{(subtotal + shipping_cost).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>



      <form onSubmit={handleSubmit}>
        <h2>Dati personali</h2>
        <input name="name" placeholder="Nome"
          value={formData.name}
          onChange={handleChange} required />
        <input name="surname" placeholder="Cognome"
          value={formData.surname}
          onChange={handleChange} required />
        <input name="phone" placeholder="Telefono"
          value={formData.phone}
          onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email"
          value={formData.email}
          onChange={handleChange} required />

        <h2>Indirizzo spedizione</h2>
        <input name="shipping_address" placeholder="Indirizzo"
          value={formData.shipping_address}
          onChange={handleChange} required />
        <input name="shipping_cap" placeholder="CAP"
          value={formData.shipping_cap}
          onChange={handleChange} required />
        <input name="shipping_city" placeholder="Città"
          value={formData.shipping_city}
          onChange={handleChange} required />
        <input name="shipping_description" placeholder="Note (es. consegna al portiere)" value={formData.shipping_description} onChange={handleChange} />

        <h2>Indirizzo fatturazione</h2>
        <input name="billing_address" placeholder="Indirizzo"
          value={formData.billing_address}
          onChange={handleChange} />
        <input name="billing_cap" placeholder="CAP"
          value={formData.billing_cap}
          onChange={handleChange} />
        <input name="billing_city" placeholder="Città"
          value={formData.billing_city}
          onChange={handleChange} />
        <input name="billing_description" placeholder="Note"
          value={formData.billing_description}
          onChange={handleChange} />

        <h2>Pagamento</h2>
        <div id="braintree-dropin-container" key={clientToken}></div>
        {loadingPaymentUI && <p>Caricamento metodo di pagamento...</p>}

        <button type="submit" disabled={submitting || loadingPaymentUI}>
          {submitting ? "Elaborazione..." : "Conferma e paga"}
        </button>
      </form>
    </div>
  );
}
