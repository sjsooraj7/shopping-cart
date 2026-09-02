import { useProduct } from "./hooks/useProducts";
import {ProductCard} from "./components/ProductCard";

function App() {
  const {data, isLoading, isError} = useProduct();

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" />
        <p>Loading products...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Unable to load products.
      </div>
    )
  }

  if (!data?.products.length) {
    return (
      <div className="alert alert-secondary">
        No products available.
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row g-4">
        {data?.products.map((product) => (
          <div className="col-md-3 col-lg-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
