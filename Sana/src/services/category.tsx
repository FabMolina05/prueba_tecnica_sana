export interface Category {
    slug: string;
  name: string;
}

export async function getCategories() : Promise<Category[]>{
    const response = await fetch(
        'https://dummyjson.com/products/categories',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json());
    return response.map((category: { name: string, slug: string }) => ({ name: category.name, slug: category.slug }));
}