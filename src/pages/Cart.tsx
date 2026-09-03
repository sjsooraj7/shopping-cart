import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useCartStore } from "../store/cartStore";
import { useCartCalculations } from "../hooks/useCartCalculations";

export default function Cart() {
  const navigate = useNavigate();

  const { items, subtotal, tax, discount, finalTotal, canCheckout } =
    useCartCalculations();

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            ← Continue Shopping
          </button>
        </div>
        {items.length === 0 ? 
         <div className="card shadow-sm mt-4 mb-4">
         <div className="card-body text-center">
           <h2 className="h5">Your cart is empty</h2>
           <p className="text-muted mb-0">Add some products to your cart.</p>
         </div>
       </div>:
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
                        <p className="text-muted mb-0">₹{item.price}</p>
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

            {/* Cart Summary */}
            <div className="border-top pt-4 mt-4">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>

                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (5%)</span>

                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>

                <span className="text-success">-₹{discount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between border-top pt-3 mt-3">
                <strong>Final Total</strong>

                <strong>₹{finalTotal.toFixed(2)}</strong>
              </div>
              {!canCheckout && (
                <div className="alert alert-warning mt-3 mb-0">
                  Minimum checkout amount is ₹10.
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                disabled={!canCheckout}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
        }
      </main>
    </>
  );
}
