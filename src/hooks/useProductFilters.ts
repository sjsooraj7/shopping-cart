import { useMemo, useState } from "react";
import type {Product} from "../types/product";

export function useProductFilters(products: Product[] = [] ) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState("");

    const categories = useMemo(() => {
        return Array.from(new Set(products.map((product) => product.category))).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();
        const price = Number(maxPrice);

        return products.filter((product) => {

            const matchesSearch = searchText === "" || 
                product.title.toLowerCase().includes(searchText);

            const matchesCategory = category === "all" ||
                product.category === category;

            const matchesPrice = maxPrice === "" ||
                (Number.isFinite(price) && product.price <= price);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            )

        })
    }, [products, search, category, maxPrice])

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