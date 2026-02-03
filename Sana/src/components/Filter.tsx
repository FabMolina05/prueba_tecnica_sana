import { useState, useEffect } from 'react';
import { type Category, getCategories } from '../services/category';
import { getProductsByCategory,getProducts} from '../services/products';
import '../styles/filter.css';
import type { Product } from '../services/products';
export interface FilterProps {
    onSelectCategory: (product: Product[]) => void;
}

export default function Filter({ onSelectCategory }: FilterProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    },[]);

    const handleCategoryChange = (categoryName: string) => {
        if (categoryName === '') {
            getProducts().then((products) => {
                onSelectCategory(products);
            });
            return;
        }
        getProductsByCategory(categoryName).then((products) => {
            onSelectCategory(products);
        });
    }
    return (
        <div className='filter-container'>
            <div className='filter-header'>
                <h2>Filter</h2>
                <hr/>
            </div>
            <div className='filter-row'>
                <div className='searchBar'>
                    <input
                        type='text'
                        className='search-input'
                        placeholder='Search...'
                        onChange={(e) => {
                            const query = e.target.value.toLowerCase();
                        }}
                    />
                </div>
            </div>
            
            <div className='filter-row'>
                <h4>Categories</h4>
                <select className='filter-select' onChange={(e) => {
                    handleCategoryChange(e.target.value);
                }}>
                    <option value=''>All</option>
                    {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>


    )
}