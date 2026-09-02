import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const cartItems = useCartStore((state) => state.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="border-bottom bg-white">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">
            Shopping Cart
          </h1>

          {/* Right side */}
          <button
            type="button"
            className="btn btn-outline-primary position-relative"
            onClick={onCartClick}
            aria-label="Open cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}