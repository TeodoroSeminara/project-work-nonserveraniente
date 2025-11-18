import { useContext, createContext, useState, useEffect } from "react";
import * as api from "../services/api";

const apiContextDefaultvalue = {
    products: [],
    loadingProducts: false,
    reloadProducts: () => {},
    getProduct: () => Promise.resolve(null),
}

const ApiContext = createContext(apiContextDefaultvalue);

export const ApiProvider = ({ children }) => {
    const [products, setProucts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false)

    const loadProducts = async () => {
        setLoadingProducts(true);

        try {
            const data = await api.getProducts();
            setProucts(data);
        } finally {
            setLoadingProducts(false);
        }
    };

    const getProduct = async (slug) => {
        return api.fetchProductsBySlug(slug)
    };

    useEffect(() => {
        loadProducts()
    }, [])

    const value = {
        products,
        loadingProducts,
        reloadProducts: loadProducts,
        getProduct,
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);