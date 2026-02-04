import { useState, useEffect } from "react"
import { getProducts, type Product } from "../services/products"
import { useNavigate } from "react-router-dom"
import ModalAdd from "../components/ModalAdd"
import ModalEdit from "../components/ModalEdit"
import NavBar from "../components/Navbar"
import Filter from "../components/filter"
import Item from "../components/Item"
import "../styles/homePage.css"

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [selected, setSelected] = useState<number | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);


    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    };

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])


    const handleFilter = (products: Product[]) => {
        goToPage(1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setProducts(products);
    }

    const handleItemModal = (id: number) => {
        setSelected(id)
        navigate(`/info/${id}`)

    }




    return <>
        <NavBar />
        <div className="container-home">
            <Filter setShowAddModal={setShowAddModal} changeProducts={handleFilter} />
            {(currentItems.length > 0) ? (
                <div className="products-container">

                    <div className="item-group">
                        {currentItems.map(product => (
                            <Item
                                key={product.id}
                                product={product}
                                onClick={() => handleItemModal(product.id)}
                            />))}
                    </div>

                </div>
            ) : (
                <div className="not-found">
                    <span>No entries found</span>
                </div>

            )}

        </div>
        {(currentItems.length > 0) &&
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
        }




        {showAddModal && <ModalAdd
            onClose={() => setShowAddModal(false)} />}
        {showEditModal && <ModalEdit
            onClose={() => setShowEditModal(false)} productId={selected!} />}

    </>
}