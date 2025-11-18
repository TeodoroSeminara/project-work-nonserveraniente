import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'

// import pages
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import DefaultLayout from './layout/DefaultLayout'
import AllProducts from './components/main/AllProducts'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<ProductPage />} />
            <Route path="/catalogo" element={<AllProducts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
