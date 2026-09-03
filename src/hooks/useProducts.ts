import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../apis/productsApi";

export function useProduct() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })
}