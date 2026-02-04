import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editProduct, getProductById, type EditProduct } from "../services/products";
import LoadingSpinner from "../components/Spinner"

import "../styles/modalAdd.css";


export default function ModalEdit({ onClose ,productId}: { onClose?: () => void, productId: number }) {
    const [product, setProduct] = useState<EditProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()

    const handleSubmit = () => {
        
        if (product && product.title != '' && product.price > 0 && product.img != '') {
            editProduct(product);
            if (onClose) onClose();
            navigate("/")

        }
    }
    useEffect(() => {
        getProductById(productId).then(setProduct)
        setTimeout(()=>{setIsLoading(false)},100)
    },[]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            id: prevProduct?.id || 0,
            title: name === 'title' ? value : (prevProduct?.title || ''),
            price: name === 'price' ? Number(value) : (prevProduct?.price || 0),
            img: name === 'img' ? value : (prevProduct?.img || ''),
        }));
    }
    if(isLoading){
        return(
            <LoadingSpinner/>
        )
    }

    return (
        <div className="modal-add">
            <div className="modal-content-add"
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className="close-add"
                    onClick={onClose}
                >✕
                </span>
                <div className="form-container-add">
                    <h2>Edit Product</h2>
                    <form onSubmit={e =>{e.preventDefault()}} >
                        <label>
                            Product Name:
                            <input type="text" name="title" value={product?.title || ''} onChange={handleChange} required />
                        </label>

                        <label>
                            Price:
                            <input type="number" name="price" value={product?.price || 0} onChange={handleChange} required />
                        </label>

                        <label>
                            Image URL:
                            <input type="text" name="img" value={product?.img || ''} onChange={handleChange} required />
                        </label>


                        <button type="submit" onClick={handleSubmit}>
                            Edit Product
                        </button>
                    </form>

                    
                </div>
                {product?.img && (
                    <img src={product.img} alt={product.title} className="preview-image" />
                )}

            </div>
        </div>
    )
}