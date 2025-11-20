// Qui definiamo l'URL base del nostro backend.
// Il backend gira su localhost:3000 e tutte le rotte prodotti
// hanno il prefisso /api/nonserveaniente impostato in app.js
const API_BASE_URL = "http://localhost:3000/api/nonserveaniente";

// Helper per generare la query string dai params
function toQueryString(params) {
  if (!params || Object.keys(params).length === 0) return "";

  return (
    "?" +
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&")
  );
}

// Questa funzione chiede TUTTI i prodotti al backend.
// Viene usata da PopularProducts, LastAdded, AllProducts, ecc.
// Puoi passare parametri come {limit: 12, offset: 0, name: "tazza"}
// GET prodotti con filtri e paginazione
export async function getProducts(params = {}) {
  const queryString = toQueryString(params);
  const url = API_BASE_URL + queryString;

  console.log("Fetching products from:", url); // Debug
  // Facciamo una GET all'endpoint /api/nonserveaniente
  const res = await fetch(url);
  // Se la risposta NON è ok, lanciamo un errore.
  if (!res.ok) {
    throw new Error("Errore nel recupero dei prodotti");
  }
  // Debug
  const data = await res.json();
  console.log("Products received:", data.length);

  return data;
}

// GET singolo prodotto per slug
export async function getProductBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/${slug}`);
  // Se la risposta NON è ok, lanciamo un errore.
  if (!res.ok) {
    throw new Error("Errore nel recupero del prodotto");
  }

  const data = await res.json();
  return data;
}

// GET categorie (se necessario)
export async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories");

  if (!res.ok) {
    throw new Error("Errore nel recupero delle categorie");
  }

  return res.json();
}


// Gli ultimi (es. ultimi 6)
const latestProducts = await getProducts({
  sort: "id_desc",
  limit: 12
});
