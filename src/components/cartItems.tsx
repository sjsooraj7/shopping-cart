import { useCartStore } from "../store/cartStore";

export function CartPanel() {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="card shadow-sm mt-4 mb-4">
        <div className="card-body text-center">
          <h2 className="h5">Your cart is empty</h2>
          <p className="text-muted mb-0">Add some products to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mt-4 mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Your Cart</h2>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        {items.map((item) => (
          <div key={item.id} className="border rounded p-3 mb-3">
            <div className="row align-items-center g-3">
              <div className="col-12 col-md-5">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width="70"
                    height="70"
                    className="rounded object-fit-cover"
                  />
                  <div>
                    <h3 className="h6 mb-1">{item.title}</h3>
                    <p className="text-muted mb-0">${item.price}</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={item.quantity === 1}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span className="fw-bold px-2">{item.quantity}</span>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={item.quantity === 5}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-3 text-md-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
