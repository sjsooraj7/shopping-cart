import React, { useState } from "react";
import { billingSchema } from "../schemas/billingSchema";
import type { BillingFormData } from "../schemas/billingSchema";
import { useCartCalculations } from "../hooks/useCartCalculations";

interface CheckoutProps {
  onBackToCart: () => void;
  onOrderComplete: () => void;
}

export function Checkout({ onBackToCart, onOrderComplete }: CheckoutProps) {
  const { items, subtotal, tax, discount, finalTotal, canCheckout } =
    useCartCalculations();
  const [currentStep, setCurrentStep] = useState(1);
  const [billing, setBilling] = useState<BillingFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BillingFormData, string>>
  >({});

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBilling((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  }

  function validatebilling() {
    const result = billingSchema.safeParse(billing);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BillingFormData, string>> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          fieldErrors[field as keyof BillingFormData] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return false;
    }

    setErrors({});

    return true;
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span
            className={
              currentStep === 1 ? "badge bg-primary" : "badge bg-secondary"
            }
          >
            Cart Review
          </span>

          <span>→</span>

          <span
            className={
              currentStep === 2 ? "badge bg-primary" : "badge bg-secondary"
            }
          >
            billing
          </span>

          <span>→</span>

          <span
            className={
              currentStep === 3 ? "badge bg-primary" : "badge bg-secondary"
            }
          >
            Payment Summary
          </span>
        </div>
        {currentStep === 1 && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">Cart Review</h2>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between border-bottom py-3"
                >
                  <div>
                    <strong>{item.title}</strong>

                    <div className="text-muted">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>

                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}

              <div className="mt-4">
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between border-top pt-3 mt-3">
                  <strong>Final Total</strong>
                  <strong>${finalTotal.toFixed(2)}</strong>
                </div>
              </div>

              {!canCheckout && (
                <div className="alert alert-warning mt-3">
                  Minimum checkout amount is $10.
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onBackToCart}
                >
                  Back to Cart
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!canCheckout}
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to billing
                </button>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">billing Information</h2>

              <div className="row g-3">
                {/* Full name */}
                <div className="col-12">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    className={`form-control ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    value={billing.fullName}
                    onChange={handleChange}
                  />

                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                {/* Email */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={billing.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Phone</label>

                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    value={billing.phone}
                    onChange={handleChange}
                  />

                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label">Address</label>

                  <input
                    type="text"
                    name="address"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    value={billing.address}
                    onChange={handleChange}
                  />

                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                {/* City */}
                <div className="col-12 col-md-6">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    name="city"
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    value={billing.city}
                    onChange={handleChange}
                  />

                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                {/* Postal code */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Postal Code</label>

                  <input
                    type="text"
                    name="postalCode"
                    className={`form-control ${
                      errors.postalCode ? "is-invalid" : ""
                    }`}
                    value={billing.postalCode}
                    onChange={handleChange}
                  />

                  {errors.postalCode && (
                    <div className="invalid-feedback">{errors.postalCode}</div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (validatebilling()) {
                      setCurrentStep(3);
                    }
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">Payment Summary</h2>

              {/* billing details */}
              <div className="mb-4">
                <h3 className="h6">billing Details</h3>

                <p className="mb-1">{billing.fullName}</p>

                <p className="mb-1">{billing.email}</p>

                <p className="mb-1">{billing.phone}</p>

                <p className="mb-1">{billing.address}</p>

                <p className="mb-0">
                  {billing.city}, {billing.postalCode}
                </p>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h3 className="h6">Order Items</h3>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>

                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <span className="text-success">-${discount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between border-top pt-3 mt-3">
                  <strong>Final Total</strong>

                  <strong>${finalTotal.toFixed(2)}</strong>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </button>

                <button
                  onClick={onOrderComplete}
                  type="button"
                  className="btn btn-success"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
