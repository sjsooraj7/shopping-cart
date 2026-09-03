import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export default function PlaceOrder() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="alert alert-success text-center">
          <h2 className="h4">Order Placed Successfully!</h2>

          <p className="mb-0">Thank you for your order.</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </>
  );
}
