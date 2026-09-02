// Base URL
const PRODUCTS_URL = "https://dummyjson.com/products?limit=30";

import { productsResponseSchema } from "../schemas/productSchema";

// Getting products from the API
export async function getProducts() {
    const response = await fetch(PRODUCTS_URL);

    if(!response.ok) {
        throw new Error("Unable to load products");
    }

    const data = await response.json();
    return productsResponseSchema.parse(data);
}