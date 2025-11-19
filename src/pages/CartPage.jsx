import "../styles/CartPage.css";

export default function CartPage(){
  return (
    <>

<div className="container py-5">

{/* Sezione spedizione*/}
<div className="custom-card mb-4">
  <div className="d-flex justify-content-between align-items-center">
    <span className="free-shipping-header">
      Aggiungi €0.03 per la spedizione gratuita
    </span>
    <span className="price-gray">€49.97 / €50.00</span>
  </div>
</div>

<div className="row g-4">

  {/* Sezione prodotti */}
  <div className="col-lg-8">

    <div className="cart-item mb-4">
      <img
        src="https://picsum.photos/200?random=1"
        alt="Prodotto"
      />

      <div className="flex-grow-1">
        <div className="cart-item-title">
          Tazza Senza Fondo
        </div>

        <div className="qty-box my-2">
          <span className="span-hover">-</span>
          <span>1</span>
          <span className="span-hover">+</span>
        </div>
      </div>

      <div className="text-end">
        <span className="cart-item-price">€19.99</span>
        <div className="mt-2 remove-btn">
          <i className="bi bi-trash"></i>
        </div>
      </div>
    </div>

    <div className="cart-item mb-4">
      <img
        src="https://picsum.photos/200?random=2"
        alt="Prodotto"
      />

      <div className="flex-grow-1">
        <div className="cart-item-title">
          Cucchiaio che si Scioglie
        </div>

        <div className="qty-box my-2">
          <span className="span-hover">−</span>
          <span>2</span>
          <span className="span-hover">+</span>
        </div>
      </div>

      <div className="text-end">
        <span className="cart-item-price">€29.98</span>
        <div className="mt-2 remove-btn">
          <i className="bi bi-trash"></i>
        </div>
      </div>
    </div>

  </div>

  {/* Ripilogo degli ordini */}
  <div className="col-lg-4">
    <div className="summary-card">

      <h4>Riepilogo Ordine</h4>

      <div className="d-flex justify-content-between mt-3">
        <span>Subtotale</span>
        <span className="price-gray">€49.97</span>
      </div>

      <div className="d-flex justify-content-between mt-2">
        <span>Spedizione</span>
        <span className="price-gray">€5.99</span>
      </div>

      <hr className="custom-hr" />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Totale</span>
        <span className="summary-total">€55.96</span>
      </div>

      <button className="checkout-btn">
        Procedi al checkout
      </button>

      <p className="text-center mt-2 text-muted">
        (Se proprio vuoi sprecare questi soldi…)
      </p>

    </div>
  </div>

</div>
</div>
    </>
  )
}


