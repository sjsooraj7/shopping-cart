import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
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
      <button className="btn btn-primary" onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}
