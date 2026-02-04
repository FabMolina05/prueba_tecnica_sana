import Swal from "sweetalert2";

export interface Product {
    id: number;
    title: string;
    price: number;
    img: string;
    stock: number;
    rating: number;
    category: string;
}

export interface AddProduct {
    title: string;
    price: number;
    img: string;
}

export interface EditProduct {
    id: number;
    title: string;
    price: number;
    img: string;

}

export async function getProducts(): Promise<Product[]> {

    try {
        const response = await fetch(
            'https://dummyjson.com/products',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        )
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to fetch products: " + response.statusText,
                icon: "error"
            });
        }

        const data = await response.json();

        return data.products.map((product: { id: number; title: string; price: number; images: string[], category: string, rating: number }) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.images[0],
            category: product.category,
            rating: product.rating
        }));

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to fetch products: " + error,
            icon: "error"
        });
        return [];
    }
}
export async function getProductById(id: number): Promise<Product | null> {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to fetch product: " + response.statusText,
                icon: "error"
            });
            return null;
        }
        const responseData = await response.json();

        if (responseData && responseData.id) {
            return {
                id: responseData.id,
                title: responseData.title,
                price: responseData.price,
                img: responseData.images[0],
                stock: responseData.stock,
                category: responseData.category,
                rating: responseData.rating
            };
        }
        return null;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to fetch product: " + error,
            icon: "error"
        });
        return null;
    }
}
export async function getProductsByCategory(category: string): Promise<Product[]> {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/category/${category}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to fetch products by category: " + response.statusText,
                icon: "error"
            });
            return [];
        }
        const responseData = await response.json();

        return responseData.products.map((product: { id: number; title: string; price: number; images: string[], category: string, rating: number }) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.images[0],
            category: product.category,
            rating: product.rating
        }));


    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to fetch products by category: " + error,
            icon: "error"
        });
        return [];
    }
}
export async function getProductBySearch(search: string) {

    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${search}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to search products: " + response.statusText,
                icon: "error"
            });
            return [];
        }

        const responseData = await response.json();

        return responseData.products.map((product: { id: number; title: string; price: number; images: string[], category: string, rating: number }) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.images[0],
            category: product.category,
            rating: product.rating
        }));

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to search products: " + error,
            icon: "error"
        });
        return [];
    }
}
export async function addProduct(newProduct: AddProduct): Promise<void> {
    try {
        const response = await fetch(
            'https://dummyjson.com/products/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to add product: " + response.statusText,
                icon: "error"
            });
            return;
        }
        const data = await response.json();
        Swal.fire({
            title: "Success",
            html: `<p>Product added successfully</p><p>Title: ${data.title}</p><p>Price: $${data.price}</p>`,
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to add product: " + error,
            icon: "error"
        });
    }
}
export async function deleteProduct(id: number): Promise<void> {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to delete product: " + response.statusText,
                icon: "error"
            });
            return;
        }
        const data = await response.json();
        if (data.isDeleted === false) {
            Swal.fire({
                title: "Error",
                text: "Product could not be deleted.",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "Success",
            html: `<p>Product deleted successfully</p><p>Title: ${data.title}</p>`,
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to delete product: " + error,
            icon: "error"
        });
    }
}

export async function editProduct(product: EditProduct): Promise<void> {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/${product.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: product.title,
                    price: product.price,
                    img: product.img
                })
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to edit product: " + response.statusText,
                icon: "error"
            });
            return;
        }
        const data = await response.json();
        Swal.fire({
            title: "Success",
            html: `<p>Product edit successfully</p><p>Title: ${data.title}</p>
            <p>Price: $${data.price}</p>`,
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to edit product: " + error,
            icon: "error"
        });
    }
}

export async function editStockProduct(id: number, stock: number): Promise<void> {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stock: stock
                })
            }
        );
        if (!response.ok) {
            Swal.fire({
                title: "Error",
                text: "Failed to edit the stock of this product: " + response.statusText,
                icon: "error"
            });
            return;
        }
        const data = await response.json();
        Swal.fire({
            title: "Success",
            html: `<p>Product edit successfully</p><p>Title: ${data.title}</p><p>Stock: ${data.stock}</p>`,
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to edit product: " + error,
            icon: "error"
        });
    }
}