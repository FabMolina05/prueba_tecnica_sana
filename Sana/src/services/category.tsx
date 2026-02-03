import Swal from "sweetalert2";

export interface Category {
    slug: string;
    name: string;
}

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(
            'https://dummyjson.com/products/categories',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();

        return data.map((category: { name: string, slug: string }) => ({ name: category.name, slug: category.slug }));
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to fetch categories: " + error,
            icon: "error"
        });
        return [];
    }
}