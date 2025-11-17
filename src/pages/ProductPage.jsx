import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProducts } from "../services/api"
import "../styles/ProductPage.css";

export default function ProductPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

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
      ],
    }

    setProduct(fakeProduct)
    setMainImage(fakeProduct.images[0])
  }, [id])

  function selectImage(index) {
    setActiveIndex(index)
    setMainImage(product.images[index])
  }

  function prevImage() {
    const newIndex = (activeIndex - 1 + product.images.length) % product.images.length
    selectImage(newIndex)
  }

  function nextImage() {
    const newIndex = (activeIndex + 1) % product.images.length
    selectImage(newIndex)
  }

  if (!product) return <h2>Caricamento...</h2>

  return (
    <div className="product-container">

      <div className="product-image-section">
        <img className="main-image" src={mainImage} alt="Main product" />

        <div className="thumbnail-row">

          {/* FRECCIA SINISTRA */}
          <button className="arrow-btn" onClick={prevImage}>
            ‹
          </button>

          {/* MINIATURE */}
          <div className="thumbnail-wrapper">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={
                  index === activeIndex ? "thumbnail selected" : "thumbnail"
                }
                onClick={() => selectImage(index)}
              />
            ))}
          </div>

          {/* FRECCIA DESTRA */}
          <button className="arrow-btn" onClick={nextImage}>
            ›
          </button>

        </div>
      </div>

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
