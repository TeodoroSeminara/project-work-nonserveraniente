// ApiContext.jsx (o come si chiama)

import { createContext, useContext, useState, useCallback } from "react";
import { getProducts } from "../services/api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // ⬇⬇⬇ FUNZIONE CHIAVE ⬇⬇⬇
  const reloadProducts = useCallback(async (params = {}) => {
    setLoadingProducts(true);
    try {
      console.log("Chiamo getProducts con params:", params);
      const data = await getProducts(params);
      setProducts(data);

      // hasMore: se ho esattamente "limit" prodotti, suppongo che ci sia ancora roba dopo
      if (params.limit !== undefined) {
        const lim = Number(params.limit);
        setHasMore(data.length === lim);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Errore nel caricamento prodotti:", error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  return (
    <ApiContext.Provider
      value={{
        products,
        loadingProducts,
        hasMore,
        reloadProducts,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}