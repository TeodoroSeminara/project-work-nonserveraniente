// Importiamo l'array di prodotti finto (mockProducts.js)
import { mockProducts } from "../mocks/products";

// Funzione per simulare un piccolo ritardo per farla sembrare chiamata APi
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Funzione per simulare una chiamata API. Poi metteremo una fetch vera
export async function getProducts() {
    await delay(200);
    return mockProducts;
}
