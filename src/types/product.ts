export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    thumbnail: string;
}

export interface CartItem extends Product {
    quantity: number;
}