import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./ProductPage.css"

export default function ProductPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const fakeProduct = {
      id,
      name: "Nome del prodotto",
      price: 49.99,
      description:
        "Descrizione provvisoria del prodotto. Poi la sostituirai con quella vera.",
      images: [
        "https://picsum.photos/600/400",
        "https://picsum.photos/200",
        "https://picsum.photos/id/237/600/400",
        "Immagine4",
      ],
    }

    setProduct(fakeProduct)
    setMainImage(fakeProduct.images[0])
  }, [id])

  if (!product) return <h2>Caricamento...</h2>

  return (
    <div className="product-container">

      {/* Colonna a sinistra */}
      <div className="product-image-section">
        <img className="main-image" src={mainImage} alt="Main product" />

        <div className="thumbnail-row">
          {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="thumbnail"
            onClick={() => setMainImage(img)}
          />
          ))}
        </div>

      </div>

      {/* Colonna a destra */}
      <div className="product-info-box">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">€ {product.price}</p>
        <p className="product-description">{product.description}</p>

        <button className="product-btn">Aggiungi al carrello</button>

        <Link className="back-home-btn" to="/">
          Torna alla Home
        </Link>
      </div>
    </div>
  )
}
