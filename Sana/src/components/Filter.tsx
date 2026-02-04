import { useState, useEffect } from 'react';
import { type Category, getCategories } from '../services/category';
import { getProductsByCategory, getProducts, getProductBySearch } from '../services/products';
import '../styles/filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { Product } from '../services/products';
export interface FilterProps {
    changeProducts: (products: Product[]) => void;
    setShowAddModal: (show: boolean) => void;

}

export default function Filter({ changeProducts, setShowAddModal }: FilterProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const handleCategoryChange = (categoryName: string) => {
        if (categoryName === '') {
            getProducts().then((products) => {
                changeProducts(products);
            });
            
            return;
        }
        getProductsByCategory(categoryName).then((products) => {
            changeProducts(products);
        });
    }

    const handleSearchChange = (query: string) => {
        getProductBySearch(query).then((products) => {
            changeProducts(products);
        });
    }
    return (
        <div className='filter-container'>
            <div className='filter-row'>
                <div className='searchBar'>
                    <input
                        type='text'
                        className='search-input'
                        placeholder='Search...'
                        onChange={(e) => {
                            handleSearchChange(e.target.value.toLowerCase());
                        }}
                    />
                </div>
                <button
                    className="filter-button"
                    onClick={() => setShowAddModal(true)}>
                    <FontAwesomeIcon icon="plus"
                    /> Add Product</button>
            </div>
            <hr />
            <div className='filter-header'>
                <h2>Filter</h2>
            </div>


            <div className='filter-row'>
                <h4>Categories</h4>
                <div className='group-category'>
                    <button className='btn-category' onClick={()=>handleCategoryChange("")}>
                        <span>All</span>
                    </button>

                    {categories.map((category) => (
                        <button className='btn-category' onClick={()=>handleCategoryChange(category.slug)}>
                        <span>{category.name}</span>
                    </button>
                    ))}
                </div>

            </div>
        </div>


    )
}