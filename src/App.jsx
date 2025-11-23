import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import "./index.css";

// import pages

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import DefaultLayout from './layout/DefaultLayout'
import AllProducts from './components/main/AllProducts'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage'
import NotFound from './pages/NotFound'
import { WishlistProvider } from './context/WishlistContext';
import WishlistPage from './pages/WishlistPage';
import { NotificationProvider } from "./context/NotificationContext";


function App() {
  return (
    <>

      <NotificationProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/catalogo" element={<AllProducts />} />
                  <Route path="/carrello" element={<CartPage />} />
                  <Route path="/carrello/checkout" element={<CheckOutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
