

// quando la pagina si carica, recupero il count salvato
window.addEventListener("DOMContentLoaded", () => {
  let count = localStorage.getItem("cartCount");
  count = count ? parseInt(count) : 0;
  aggiornaBadgeCarrello(count);
});

function aggiungiAlCarrello() {
  let count = localStorage.getItem("cartCount");

  // se non c'è nessun valore, parto da 0
  count = count ? parseInt(count) : 0;

  count++

  // salvo nel localStorage
  localStorage.setItem("cartCount", count);

  // aggiorno badge grafico
  aggiornaBadgeCarrello(count);
}

function aggiornaBadgeCarrello(count) {
  const badge = document.querySelector("#cartBadge");

  if (!badge) return; 

  badge.textContent = count;
}