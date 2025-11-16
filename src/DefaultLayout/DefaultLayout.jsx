import { Outlet } from 'react-router-dom'
import NavBar from '../components/header/NavBar'
import Footer from '../components/Footer'


export default function DefaultLayout() {
  return (
    <>
     <header>
       <NavBar/>
        <Outlet/>
     </header>

      <main>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  )
}