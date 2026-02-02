import { useState } from "react";
import { type Product } from "../services/products.tsx";

export interface ItemProps {
    product: Product;
    onClick?: () => void;
}
export default function Item({product, onClick}: ItemProps) {
 
 return <>
    <div 
    role="button"
    className="item-card"
    onClick={onClick}>
      <img src={product.img} alt={product.title} className="item-image" />
      <h2 className="item-title">{product.title}</h2>
      <p className="item-price">${product.price}</p>
    </div>
  </>
}