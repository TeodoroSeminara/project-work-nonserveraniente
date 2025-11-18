// Qui definiamo l'URL base del nostro backend.
// Il backend gira su localhost:3000 e tutte le rotte prodotti
// hanno il prefisso /api/nonserveaniente impostato in app.js
const API_BASE_URL = "http://localhost:3000/api/nonserveaniente";

// Questa funzione chiede TUTTI i prodotti al backend.
// Viene usata da PopularProducts, LastAdded, AllProducts, ecc.
export async function getProducts() {
  // Facciamo una GET all'endpoint /api/nonserveaniente
  const res = await fetch(API_BASE_URL);

  // Se la risposta NON è ok, lanciamo un errore.
  if (!res.ok) {
    throw new Error("Errore nel recupero dei prodotti");
  }

  // Convertiamo la risposta in JSON.
  const data = await res.json();

  // Log di debug
  console.log("getProducts - dati dal backend:", data);

  // Supponiamo che il backend ritorni già un array di prodotti.
  return data;
}

// (Opzionale) Funzione per recuperare un singolo prodotto per id.
// Utile se un domani farai una pagina /products/:id

export async function getProductBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/${slug}`);


  if (!res.ok) {
    throw new Error("Errore nel recupero del prodotto");
  }

  const data = await res.json();
  console.log("getProductById - dato dal backend:", data);
  return data;
}