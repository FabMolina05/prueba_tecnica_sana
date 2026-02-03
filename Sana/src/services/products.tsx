export interface Product {
    id: number;
    title: string;
    price: number;
    img: string;
}

export async function getProducts(): Promise<Product[]>{
    const response = await fetch(
        'https://dummyjson.com/products',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            } 
        }
        
    ).then(res => res.json());
    return response.products.map((product: { id: number; title: string; price: number; images: string[] }) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.images[0],
    }));
}

export async function getProductById(id: number): Promise<Product | null> {
    const response = await fetch(
        `https://dummyjson.com/products/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json());
    if (response && response.id) {
        return {
            id: response.id,
            title: response.title,
            price: response.price,
            img: response.images[0],
        };
    }
    return null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(
        `https://dummyjson.com/products/category/${category}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json());
    return response.products.map((product: { id: number; title: string; price: number; images: string[] }) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.images[0],
    }));
}