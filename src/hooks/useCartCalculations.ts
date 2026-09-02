import { useMemo } from "react";
import { useCartStore } from "../store/cartStore";

export function useCartCalculations() {
    const items = useCartStore((state) => state.items);

    const calculations = useMemo(() => {
        const subtotal = items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const tax = subtotal * 0.05;

        const discount = subtotal > 100 ? subtotal * 0.10 : 0;

        const finalTotal = subtotal + tax - discount;

        return {
            subtotal,
            tax,
            discount,
            finalTotal
        };
    }, [items]);

    return {
        items,
        ...calculations,
        canCheckout: calculations.finalTotal >= 10
    };

}