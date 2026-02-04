import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type Product, getProductById, deleteProduct, editStockProduct } from "../services/products";
import { Rating } from 'react-simple-star-rating'
import LoadingSpinner from "../components/Spinner"
import Swal from "sweetalert2";
import "../styles/itemPage.css";
import ModalEdit from "../components/ModalEdit";


export default function info() {
    const [product, setProduct] = useState<Product | null>(null);
    const [editStock, setEditStock] = useState(false);
    const [stock, setStock] = useState(0)
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (id) {
            getProductById(Number(id)).then(setProduct)
            setTimeout(() => { setIsLoading(false) }, 500)

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
    const handleExit = () => {
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
                {isLoading ? (
                    <LoadingSpinner/>
                ):(
                <img src={product?.img} alt={product?.title} className="image" />
                )}
                
            </div>
            <div className="content-info">

                <h2>{product?.title}</h2>

                <div className="row">
                    <span>Price</span>
                    <p>${product?.price}</p>
                </div>
                <div className="row">
                    <span>Category</span>
                    <p>{product?.category} </p>
                </div>
                <div className="row">
                    <span>Rating</span>
                    <p> {product?.rating} <Rating
                        initialValue={product?.rating}
                        allowHover={false}
                        size={20}
                        allowFraction={true}
                        readonly={true} />
                    </p>
                </div>

                {editStock ? (<label>
                    <div className="row">

                        <span>Stock</span>
                        <input type="number" name="stock" value={stock} onChange={(e) => setStock(Number.parseInt(e.target.value))} required />
                    </div>
                </label>
                ) : (
                    <div className="row">
                        <span>Stock</span>
                        <p> {product?.stock}</p>
                    </div>
                )}
                <div className="button-container">
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="edit-button" onClick={() => setShowEditModal(true)}>Edit</button>
                    {editStock ? (
                        <button className="add-stock-save-button" onClick={handleSaveStock}>Save</button>
                    ) : (
                        <button className="add-stock-button" onClick={handleStock}>Add Stock</button>


                    )}

                </div>

            </div>

            {product && showEditModal && (<ModalEdit onClose={() => setShowEditModal(false)} productId={product.id} />)
            }
        </div >




    )
}