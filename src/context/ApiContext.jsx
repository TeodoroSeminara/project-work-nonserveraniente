// import { useContext, createContext, useState, useEffect } from "react";
// import * as api from "../services/api";

// const apiContextDefaultvalue = {
//     products: [],
//     loadingProducts: false,
//     reloadProducts: () => { },
//     getProduct: () => Promise.resolve(null),
// }

// const ApiContext = createContext(apiContextDefaultvalue);


// export const ApiProvider = ({ children }) => {
//     const [products, setProducts] = useState([]);
//     const [loadingProducts, setLoadingProducts] = useState(false);
//     const [offset, setOffset] = useState(0);
//     const [limit] = useState(12); // quantità da scegliere 
//     const [hasMore, setHasMore] = useState(true);


//     const loadProducts = async (reset = false) => {
//         setLoadingProducts(true);
//         try {
//             const currentOffset = reset ? 0 : offset;
//             // L'API deve accettare params { limit, offset }
//             const data = await api.getProducts({ limit, offset: currentOffset });
//             if (reset) {
//                 setProducts(data);
//                 setOffset(limit);
//             } else {
//                 setProducts(prev => [...prev, ...data]);
//                 setOffset(prev => prev + limit);
//             }
//             setHasMore(data.length === limit);
//         } finally {
//             setLoadingProducts(false);
//         }
//     };

//     const loadMoreProducts = () => {
//         loadProducts();
//     };



//     const getProduct = async (slug) => {
//         return api.fetchProductsBySlug(slug)
//     };

//     useEffect(() => {
//         loadProducts(true); // reset = true per caricare la prima pagina
//     }, []);


//     const value = {
//         products,
//         loadingProducts,
//         reloadProducts: () => loadProducts(true),
//         loadMoreProducts,
//         hasMore,
//         getProduct,
//     };


//     return (
//         <ApiContext.Provider value={value}>
//             {children}
//         </ApiContext.Provider>
//     );
// };

// export const useApi = () => useContext(ApiContext);

import { useContext, createContext, useState, useEffect } from "react";
import * as api from "../services/api";

const apiContextDefaultvalue = {
    products: [],
    loadingProducts: false,
    reloadProducts: () => { },
    loadMoreProducts: () => { },
    getProduct: () => Promise.resolve(null),
    hasMore: true,
}

const ApiContext = createContext(apiContextDefaultvalue);

export const ApiProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(12);
    const [hasMore, setHasMore] = useState(true);
    const [currentFilters, setCurrentFilters] = useState({}); // <-- NUOVO: mantiene i filtri correnti

    const loadProducts = async (reset = false, filters = {}) => {
        setLoadingProducts(true);
        try {
            const currentOffset = reset ? 0 : offset;

            // Unisci i filtri correnti con limit e offset
            const params = {
                ...filters,
                limit,
                offset: currentOffset
            };

            const data = await api.getProducts(params);

            if (reset) {
                setProducts(data);
                setOffset(limit);
            } else {
                setProducts(prev => [...prev, ...data]);
                setOffset(prev => prev + limit);
            }

            setHasMore(data.length === limit);
        } catch (error) {
            console.error("Errore caricamento prodotti:", error);
            setHasMore(false);
        } finally {
            setLoadingProducts(false);
        }
    };

    // Ricarica con nuovi filtri (reset della paginazione)
    const reloadProducts = (filters = {}) => {
        setCurrentFilters(filters); // Salva i filtri
        setOffset(0); // Reset offset
        loadProducts(true, filters);
    };

    // Carica più prodotti mantenendo gli stessi filtri
    const loadMoreProducts = () => {
        loadProducts(false, currentFilters);
    };

    const getProduct = async (slug) => {
        return api.getProductBySlug(slug);
    };

    useEffect(() => {
        loadProducts(true, {}); // Carica iniziale senza filtri
    }, []);

    const value = {
        products,
        loadingProducts,
        reloadProducts,
        loadMoreProducts,
        hasMore,
        getProduct,
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);