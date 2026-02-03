import { useEffect, useState } from "react";
import { type Product, getProductById } from "../services/products";
import "../styles/modalItem.css";
export interface ModalItemProps {
    p: number;
    onClose?: () => void;
}

export default function ModalItem({ p, onClose }: ModalItemProps) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        getProductById(p).then(setProduct)
    }, [p]);

    return (
        <div className="modal">
            <div className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className="close"
                    onClick={onClose}
                >✕
                </span>

                <h2>Detalles del Producto</h2>
                <p>ID del Producto: {product?.id}</p>
                <p>Nombre del Producto: {product?.title}</p>
                <p>Precio del Producto: ${product?.price}</p>
            </div>
        </div>
    )
}