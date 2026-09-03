import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetails({ product, onBack }: ProductDetailsProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <main className="container py-4">
      <button
        type="button"
        className="btn btn-outline-secondary mb-4"
        onClick={onBack}
      >
        ← Back to Products
      </button>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="img-fluid rounded w-100"
                style={{
                  maxHeight: "450px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <span className="badge bg-secondary mb-3">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>

              <h1 className="display-6 fw-bold">{product.title}</h1>
              
              <div className="mb-3">
                <span className="text-warning fs-5">★</span>

                <span className="ms-2">{product.rating.toFixed(1)}</span>
              </div>

              <h2 className="fw-bold mb-4">${product.price.toFixed(2)}</h2>

              <p className="text-muted">{product.description}</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
