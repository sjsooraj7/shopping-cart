import {z} from "zod";

// Create the product schema
const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    price: z.number(),
    rating: z.number(),
    thumbnail: z.string(),
})

export const productsResponseSchema = z.object({
    products: z.array(productSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
})