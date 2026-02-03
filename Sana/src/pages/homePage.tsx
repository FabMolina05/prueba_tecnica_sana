import { useState, useEffect } from "react"
import { getProducts, type Product } from "../services/products"
import ModalItem from "../components/ModalItem"
import NavBar from "../components/Navbar"
import Filter from "../components/filter"
import Item from "../components/Item"
import "../styles/homePage.css"

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [selected, setSelected] = useState<number | null>(null)

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])


    const handleCategory = (products: Product[]) => {
        setProducts(products);
    }


    const handleCloseModal = () => {
        setSelected(null);

    }
    return <>
        <NavBar />
        <div className="container">
            <Filter onSelectCategory={handleCategory} />
            <div className="products-container">
                <div className="item-group">
                    {products.map(product => (
                        <Item
                            key={product.id}
                            product={product}
                            onClick={() => setSelected(product.id)}
                        />))}
                </div>
            </div>
        </div>  

        {selected && <ModalItem
            p={selected} onClose={handleCloseModal} />}


    </>
}