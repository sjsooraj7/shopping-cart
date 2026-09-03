import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useCartStore } from "../store/cartStore";
import { Header } from "../components/Header";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useProduct();

  const addToCart = useCartStore((state) => state.addToCart);

  const product = data?.products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <>
        <Header />
  
        <main className="container py-4">
          <div className="alert alert-warning">
            Product not found.
          </div>
  
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back to Products
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-4">
        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate("/")}
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
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>

                <h1 className="display-6 fw-bold">{product.title}</h1>

                <div className="mb-3">
                  <span className="text-warning fs-5">★</span>

                  <span className="ms-2">{product.rating.toFixed(1)}</span>
                </div>

                <h2 className="fw-bold mb-4">₹{product.price.toFixed(2)}</h2>

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
    </>
  );
}
