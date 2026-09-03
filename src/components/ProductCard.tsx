import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAdd, onViewDetails }: ProductCardProps) {
  return (
    <div className="card h-100" style={{ cursor: "pointer" }} onClick={() => onViewDetails(product)}>
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body">
        <h2 className="h5">{product.title}</h2>

        <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong className="fs-5">${product.price.toFixed(2)}</strong>
          <span>
            <span className="text-warning">★</span> {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <button className="btn btn-primary add-to-cart-btn" onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}
