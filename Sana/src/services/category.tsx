export interface Category {
  name: string;
}

export async function getCategories() : Promise<Category[]>{
    const response = await fetch('https://dummyjson.com/products/categories').then(res => res.json());
    return response.map((category: { name: string }) => ({ name: category.name }));
}