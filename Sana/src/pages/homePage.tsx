import NavBar from "../components/Navbar"
import { getProducts,type Product } from "../services/products"
import { useState, useEffect } from "react"

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=>{
        getProducts().then(setProducts)
    })
  return <>
    <NavBar />
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.img} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  </>
}