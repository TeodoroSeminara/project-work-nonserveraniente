import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./ProductPage.css"

export default function ProductPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Placeholder temporaneo
    const fakeProduct = {
      id,
      name: "Nome del prodotto",
      price: 49.99,
      description:
        "Descrizione a cazzo di cane provvisoria ",
      image: "???",
    }

    setProduct(fakeProduct)
  }, [id])

  if (!product) return <h2>Prodotto non trovato...</h2>

  return (
    <div className="product-container">
      <div className="product-image-box">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>

      <div className="product-info-box">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">€ {product.price}</p>
        <p className="product-description">{product.description}</p>

        <button className="product-btn">Aggiungi al carrello</button>

        
      </div>
    </div>
  )
}
