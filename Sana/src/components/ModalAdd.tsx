import { useState } from "react";
import { type AddProduct, addProduct } from "../services/products";
import "../styles/modalAdd.css";


export default function ModalAdd({ onClose }: { onClose?: () => void }) {
    const [product, setProduct] = useState<AddProduct | null>(null);

    const handleSubmit = () => {
        
        if (product && product.title != '' && product.price > 0 && product.img != '') {
            addProduct(product);
            if (onClose) onClose();

        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            title: name === 'title' ? value : (prevProduct?.title || ''),
            price: name === 'price' ? Number(value) : (prevProduct?.price || 0),
            img: name === 'img' ? value : (prevProduct?.img || ''),
        }));
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
                    <h2>Add New Product</h2>
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
                            Add Product
                        </button>
                    </form>
                </div>
                {product?.img && (
                    <img src={product.img} alt="Invalid URL" className="preview-image" />
                )}

            </div>
        </div>
    )
}