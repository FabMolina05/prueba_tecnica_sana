import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type Product, getProductById, deleteProduct, editStockProduct } from "../services/products";
import Swal from "sweetalert2";
import "../styles/itemPage.css";
import ModalEdit from "../components/ModalEdit";


export default function info() {
    const [product, setProduct] = useState<Product | null>(null);
    const [editStock, setEditStock] = useState(false);
    const [stock, setStock] = useState(0)
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEditModal,setShowEditModal] = useState(false);

    useEffect(() => {
        if (id) {
            getProductById(Number(id)).then(setProduct)
        }
    }, [id]);

    const handleStock = () => {
        setEditStock(true)
        if (product) {
            setStock(product?.stock)
        }
    }

    const handleSaveStock = () => {

        if (product) {
            editStockProduct(product.id, stock)
              navigate("/")
        }

    }
    const handleExit = ()=>{
        navigate("/")
    }

    const handleDelete = () => {

        Swal.fire({
            title: "Delete Item",
            text: "Are you sure you want to delete this item?",
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (product) {
                    deleteProduct(product.id)
                    navigate("/")
                }
            }
        })
    }


    return (
        <div className="container-info">

            <span className="close" onClick={handleExit}>
                X
            </span>
            <div className="image-content">
                <img src={product?.img} alt={product?.title} className="image" />
            </div>
            <div className="content-info"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>Detalles del Producto</h2>
                <p>Nombre del Producto: {product?.title}</p>
                <p>Precio del Producto: ${product?.price}</p>
                {editStock ? (<label>
                    Stock:
                    <input type="number" name="stock" value={stock} onChange={(e) => setStock(Number.parseInt(e.target.value))} required />
                </label>
                ) : (
                    <p>Stock: {product?.stock}</p>

                )}
                <div className="button-container">
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="edit-button" onClick={()=> setShowEditModal(true)}>Edit</button>
                    {editStock ? (
                        <button className="add-stock-save-button" onClick={handleSaveStock}>Save</button>
                    ) : (
                        <button className="add-stock-button" onClick={handleStock}>Add Stock</button>


                    )}

                </div>

            </div>
            
        {product &&showEditModal && (<ModalEdit onClose={()=> setShowEditModal(false)} productId={product.id} />)
         }
        </div >




    )
}