import React, { useState } from "react";
import "../styles/ProductChatbot.css";

export default function ProductChatbot({ product }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        `Ciao! 👋 Posso aiutarti a trovare informazioni su "${product.name}". ` +
        `Chiedimi pure di prezzo, descrizione o informazioni generali.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/nonserveaniente/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          product: {
            name: product.name,
            description: product.description,
            price: product.price,
            slug: product.slug,
            images: product.images,
          },
        }),
      });

      const data = await res.json();

      const botMsg = {
        from: "bot",
        text: data.reply || "Non ho capito la risposta del server 🤖",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Si è verificato un errore nel contattare il server 😢",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-chatbot">
      <div className="product-chatbot__header">
        Assistente su questo prodotto
      </div>

      <div className="product-chatbot__messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              "product-chatbot__message " +
              (m.from === "user"
                ? "product-chatbot__message--user"
                : "product-chatbot__message--bot")
            }
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="product-chatbot__message product-chatbot__message--bot product-chatbot__message--loading">
            Sto cercando le informazioni sul prodotto...
          </div>
        )}
      </div>

      <form className="product-chatbot__form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Fai una domanda su questo prodotto..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="product-chatbot__input"
        />
        <button
          type="submit"
          disabled={loading}
          className="product-chatbot__button"
        >
          Invia
        </button>
      </form>
    </div>
  );
}