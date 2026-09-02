import { useMemo, useState } from "react";
import type {Product} from "../types/product";

export function useProductFilters(products: Product[] = [] ) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState("");

    // Get unique categories from products
    const categories = useMemo(() => {
        return Array.from(new Set(products.map((product) => product.category))).sort();
    }, [products]);

    // Apply all filters
    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();
        const price = Number(maxPrice);

        return products.filter((product) => {
            // Search filter
            const matchesSearch = searchText === "" || 
                product.title.toLowerCase().includes(searchText);

            // Category filter
            const matchesCategory = category === "all" ||
                product.category === category;

            // Price filter
            const matchesPrice = maxPrice === "" ||
                (Number.isFinite(price) && product.price <= price);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            )

        })
    }, [products, search, category, maxPrice])

    // Reset all filters
    function clearFilters() {
        setSearch("");
        setCategory("all");
        setMaxPrice("");
    }

    return {
        search,
        setSearch,
        category,
        setCategory,
        maxPrice,
        setMaxPrice,
        categories,
        filteredProducts,
        clearFilters
    }
}