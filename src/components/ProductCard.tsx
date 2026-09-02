import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card h-100">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body">
        <h2 className="h5">{product.title}</h2>

        <p>{product.category}</p>

        <strong>₹{product.price.toFixed(2)}</strong>
      </div>
    </div>
  );
}
