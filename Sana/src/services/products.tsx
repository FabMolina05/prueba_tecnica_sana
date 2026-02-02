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