import { useProduct } from "./hooks/useProducts";
import {ProductCard} from "./components/ProductCard";
import { useProductFilters } from "./hooks/useProductFilters";
import {FilterBar} from "./components/FilterBar";

function App() {
  const {data, isLoading, isError} = useProduct();
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
  } = useProductFilters(
    data?.products ?? []
  );

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

  {!isLoading &&
    !isError &&
    filteredProducts.length === 0 && (
     <div className="alert alert-secondary">
       No products match your current filters.
     </div>
   )}

  

  return (
    <div className="container py-4">
      <h1 className="mb-4">Shopping Cart</h1>
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
                <div
                  className="col"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
    </div>
  )
}

export default App
