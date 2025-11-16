import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import DefaultLayout from './layout/DefaultLayout'
import AllProducts from './components/main/AllProducts'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<ProductPage />} />
            <Route path="/immondizia" element={<AllProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
