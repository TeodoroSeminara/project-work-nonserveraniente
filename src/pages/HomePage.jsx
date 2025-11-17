import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <>
      <h1>Sezione home</h1>

     
      <Link to="/1">
        <button>Vai al prodotto di test</button>
      </Link>
    </>
  )
}
