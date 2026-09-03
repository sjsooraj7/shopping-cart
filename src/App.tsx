import "./App.css"
import { useState } from "react";
import { useProduct } from "./hooks/useProducts";
import { ProductCard } from "./components/ProductCard";
import { useProductFilters } from "./hooks/useProductFilters";
import { FilterBar } from "./components/FilterBar";
import { useCartStore } from "./store/cartStore";
import { CartItems } from "./components/cartItems";
import { Header } from "./components/header";
import { Checkout } from "./components/checkout";
import {ProductSkeleton} from "./components/productSkelton";
import type { Product } from "./types/product";
import { ProductDetails } from "./components/productDetails";


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
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function checkout() {
    setShowCart(false);
    setShowCheckout(true);
  }

  const clearCart = useCartStore((state) => state.clearCart);

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <>
        <Header onCartClick={() => setShowCart(true)} />
  
        <main className="container py-4">
  
          <div className="row g-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <ProductSkeleton />
              </div>
            ))}
          </div>
  
        </main>
      </>
    );
  }

  if (selectedProduct) {
    return (
      <>
        <Header
          onCartClick={() => setShowCart(true)}
        />
  
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      </>
    );
  }

  if (isError) {
    return <div className="alert alert-danger">Unable to load products.</div>;
  }

  if (!data?.products.length) {
    return <div className="alert alert-secondary">No products available.</div>;
  }

  if (showCart) {
    return (
      <>
        <Header onCartClick={() => setShowCart(false)} />

        <main className="container py-4">
          <button
            type="button"
            className="btn btn-outline-secondary mb-4"
            onClick={() => setShowCart(false)}
          >
            ← Continue Shopping
          </button>

          <CartItems onCheckout={checkout} />
        </main>
      </>
    );
  }

  if (showCheckout) {
    return (
      <>
        <Header
          onCartClick={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
        />

        <Checkout
          onBackToCart={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
          onOrderComplete={() => {
            setShowCheckout(false);
            setShowCart(false);
            clearCart();
            setOrderPlaced(true);
          }}
        />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Header
          onCartClick={() => {
            setOrderPlaced(false);
            setShowCart(true);
          }}
        />

        <main className="container py-5">
          <div className="alert alert-success text-center">
            <h2 className="h4">Order Placed Successfully!</h2>

            <p className="mb-0">Thank you for your order.</p>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setOrderPlaced(false)}
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <div>
      <Header onCartClick={() => setShowCart(true)} />
      <div className="container py-4">
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

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="alert alert-secondary mt-4">
            No products match your current filters.
          </div>
        )}
        
        {filteredProducts.length > 0 && (
          <section>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
              {filteredProducts.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCard product={product} onAdd={addToCart} onViewDetails={setSelectedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
