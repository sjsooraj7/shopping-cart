import { useProduct } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { useCartStore } from "../store/cartStore";
import { FilterBar } from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import { Header } from "../components/Header";
import { ProductSkeleton } from "../components/ProductSkelton";

function Products() {
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

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <>
        <Header />

        <main className="container py-4">
          <div className="row g-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />

        <main className="container py-5">
          <div className="alert alert-danger">
            Unable to load products. Please try again.
          </div>
        </main>
      </>
    );
  }

  if (!data?.products.length) {
    return (
      <>
        <Header />

        <main className="container py-5">
          <div className="alert alert-secondary">No products available.</div>
        </main>
      </>
    );
  }

  return (
    <div>
      <Header />
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
                  <ProductCard product={product} onAdd={addToCart} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Products;
