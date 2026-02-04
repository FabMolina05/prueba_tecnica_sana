import { type Product } from "../services/products.tsx";
import "../styles/item.css";
import { Rating } from 'react-simple-star-rating'

export interface ItemProps {
    product: Product;
    onClick?: () => void;
}
export default function Item({ product, onClick }: ItemProps) {

    return (
        <div
            role="button"
            className="item-card"
            onClick={onClick}>
            <img src={product.img} alt={product.title} className="item-image" />
            <h2 className="item-title">{product.title}</h2>
            <p className="item-category">{product.category}</p>
            <div className="row">
                <p className="item-price">${product.price}</p>
                <Rating 
                    initialValue={product.rating} 
                    allowHover={false} 
                    size={20}
                    allowFraction={true} 
                    
                    readonly={true}/>


            </div>


        </div>
    )
}