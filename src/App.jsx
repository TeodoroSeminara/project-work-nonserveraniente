import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'

// import pages
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import DefaultLayout from './DefaultLayout/DefaultLayout'

function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
          <Route  path="/" element={<HomePage/>}></Route>
          <Route path="/:id" element={<ProductPage/>}></Route>
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
