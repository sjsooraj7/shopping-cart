import { useState } from "react";
import { useProduct } from "./hooks/useProducts";
import { ProductCard } from "./components/ProductCard";
import { useProductFilters } from "./hooks/useProductFilters";
import { FilterBar } from "./components/FilterBar";
import { useCartStore } from "./store/cartStore";
import { CartPanel } from "./components/cartItems";
import { Header } from "./components/header";

function App() {
  const { data, isLoading, isError } = useProduct();
  const {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  } = useProductFilters(data?.products ?? []);

  const [showCart, setShowCart] = useState(false); 

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-danger">Unable to load products.</div>;
  }

  if (!data?.products.length) {
    return <div className="alert alert-secondary">No products available.</div>;
  }

  {
    !isLoading && !isError && filteredProducts.length === 0 && (
      <div className="alert alert-secondary">
        No products match your current filters.
      </div>
    );
  }

  if (showCart) {
    return (
      <>
        <Header
          onCartClick={() => setShowCart(false)}
        />

        <main className="container py-4">
          <button
            type="button"
            className="btn btn-outline-secondary mb-4"
            onClick={() => setShowCart(false)}
          >
            ← Continue Shopping
          </button>

          <CartPanel />
        </main>
      </>
    );
  }

  return (
    
    <div className="container py-4">
      <Header
        onCartClick={() => setShowCart(true)}
      />
      <FilterBar
        search={search}
        category={category}
        maxPrice={maxPrice}
        categories={categories}
        onSearch={setSearch}
        onCategory={setCategory}
        onMaxPrice={setMaxPrice}
        onClear={clearFilters}
      />
      {filteredProducts.length > 0 && (
        <section>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} onAdd={addToCart} />
              </div>
            ))}
          </div>
        </section>
      )}
      
    </div>
  );
}

export default App;
