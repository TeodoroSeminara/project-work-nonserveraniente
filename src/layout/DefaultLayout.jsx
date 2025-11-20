import { Outlet } from 'react-router-dom'
import NavBar from '../components/header/NavBar'
import Footer from '../components/Footer'
import WelcomePopup from '../components/hero/WelcomePopup'


export default function DefaultLayout() {
  return (
    <>
      <WelcomePopup />
      <header>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}