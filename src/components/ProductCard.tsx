import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const navigate = useNavigate();

  function handleProductClick() {
    navigate(`/product/${product.id}`);
  }
  return (
    <div className="card h-100" style={{ cursor: "pointer" }}>
      <img
        src={product.thumbnail}
        className="card-img-top product-img"
        alt={product.title}
        onClick={handleProductClick}
      />

      <div className="card-body" onClick={handleProductClick}>
        <h2 className="h5">{product.title}</h2>

        <p>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong className="fs-5">₹{product.price.toFixed(2)}</strong>
          <span>
            <span className="text-warning">★</span> {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <button
        className="btn btn-primary add-to-cart-btn"
        onClick={() => onAdd(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
