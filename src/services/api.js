// // Qui definiamo l'URL base del nostro backend.
// // Il backend gira su localhost:3000 e tutte le rotte prodotti
// // hanno il prefisso /api/nonserveaniente impostato in app.js
// const API_BASE_URL = "http://localhost:3000/api/nonserveaniente";

// // Helper per generare la query string dai params
// function toQueryString(params) {
//   return (
//     "?" +
//     Object.entries(params)
//       .filter(([, v]) => v !== undefined && v !== null && v !== "")
//       .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
//       .join("&")
//   );
// }

// // Questa funzione chiede TUTTI i prodotti al backend.
// // Viene usata da PopularProducts, LastAdded, AllProducts, ecc.
// // Puoi passare parametri come {limit: 12, offset: 0, name: "tazza"}
// export async function getProducts(params = {}) {
//   // Facciamo una GET all'endpoint /api/nonserveaniente
//   const res = await fetch(API_BASE_URL + toQueryString(params));

//   // Se la risposta NON è ok, lanciamo un errore.
//   if (!res.ok) {
//     throw new Error("Errore nel recupero dei prodotti");
//   }

//   // Convertiamo la risposta in JSON.
//   const data = await res.json();

//   // Log di debug
//   // console.log("getProducts - dati dal backend:", data);

//   // Supponiamo che il backend ritorni già un array di prodotti.
//   return data;
// }

// // (Opzionale) Funzione per recuperare un singolo prodotto per id.
// // Utile se un domani farai una pagina /products/:id

// export async function getProductBySlug(slug) {
//   const res = await fetch(`${API_BASE_URL}/${slug}`);

//   if (!res.ok) {
//     throw new Error("Errore nel recupero del prodotto");
//   }

//   const data = await res.json();
//   console.log("getProductById - dato dal backend:", data);
//   return data;
// }

// URL base del backend
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

// GET prodotti con filtri e paginazione
export async function getProducts(params = {}) {
  const queryString = toQueryString(params);
  const url = API_BASE_URL + queryString;

  console.log("Fetching products from:", url); // Debug

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Errore nel recupero dei prodotti");
  }

  const data = await res.json();
  console.log("Products received:", data.length); // Debug

  return data;
}

// GET singolo prodotto per slug
export async function getProductBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/${slug}`);

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