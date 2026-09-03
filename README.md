# Shopping Cart Application

A responsive shopping cart application built on React.js. The application allows users to browse products, search and filter products, add products to a cart, manage quantities, and complete a multi-step checkout process.

## Project Overview

This application demonstrates a modern React application architecture using TypeScript, Zustand for client-side cart state management, TanStack Query for server-state management, and Zod for runtime data validation.

The application retrieves products from the DummyJSON API and provides:

* Product listing
* Product search
* Category filtering
* Price filtering
* Product details
* Shopping cart management
* Cart persistence using localStorage
* Multi-step checkout
* Billing/shipping form validation
* Responsive UI
* Loading, error, and empty states

## Technologies Used

* React 19 – UI development
* TypeScript – Static type checking
* Vite – Development server and build tool
* React Router – Client-side routing
* Bootstrap – Responsive UI and styling
* Material UI (MUI) – Loading skeletons and icons
* Zustand – Global cart state management
* TanStack Query – API fetching, caching, loading, and error states
* Zod – Runtime API and form validation
* localStorage – Cart persistence


## Setup Instructions

### 1. Clone the repository

git clone <repository-url>

### 2. Navigate to the project

cd shopping-cart

### 3. Install dependencies

This project uses pnpm.

pnpm install

### 4. Start the development server

pnpm dev

The application will be available at the local URL shown in the terminal.

## Commands to Run the Project

### Start development server

pnpm dev

### Build the application

pnpm build

## API Used

The application uses the **DummyJSON Products API** to retrieve product data.

API endpoint:

https://dummyjson.com/products?limit=30

The API response is validated using **Zod** before the data is used by the application.

TanStack Query is responsible for:

* Fetching products
* Caching API data
* Loading state
* Error state
* Refetching

Zustand is used only for client-side cart state.

## Features Completed

### Product Listing

* Displays products fetched from the API
* Displays product image
* Displays product title
* Displays category
* Displays price
* Displays product rating
* Add to Cart functionality
* Loading skeleton while products are being fetched
* API error handling
* Empty search result handling

### Search and Filters

* Search products by title
* Filter products by category
* Filter products by maximum price
* Clear all filters
* Filtering logic implemented using a custom React hook

### Product Details

* Displays product information
* Displays product image
* Displays description
* Displays category
* Displays rating
* Displays price
* Add to Cart functionality
* Navigation back to the product listing

### Shopping Cart

* Add products to cart
* Remove products from cart
* Increase product quantity
* Decrease product quantity
* Clear entire cart
* Cart item count displayed in the header
* Cart state managed globally using Zustand

### Cart Calculations

The cart calculates:

* Subtotal
* Tax
* Discount
* Final total

Business rules:

Tax = 5%

Discount = 10% when subtotal > $100

Minimum checkout amount = $10

Checkout is disabled when the final total is below the minimum checkout amount.

### Cart Persistence

Zustand's `persist` middleware is used to store cart data in `localStorage`.

This allows the cart to remain available after refreshing the browser.

### Checkout

The checkout process contains three steps:

Cart Review -> Billing -> Payment Summary

Billing fields:

* Full Name
* Email
* Phone
* Address
* City
* Postal Code

Zod is used to validate the billing form.

The user cannot proceed to the next step until the current step is valid.

### Payment Summary

The final step displays:

* Billing/shipping information
* Cart products
* Product quantities
* Subtotal
* Tax
* Discount
* Final total

No payment gateway is integrated.

After placing the order:

* Cart is cleared
* User is returned to the product listing

### Responsive UI

The application uses Bootstrap responsive classes to support:

* Desktop
* Tablet
* Mobile

## Routing

The application uses React Router.

/              ->   Product Listing

/product/:id   ->   Product Details

/cart          ->   Cart

/checkout      ->   Checkout

/orderplaced   ->   Place Orders

## State Management

### Zustand

Zustand manages client-side cart state

### TanStack Query

TanStack Query manages server/API state

Product API data is not stored in Zustand because it is server state rather than client-side cart state.

## Validation

### API Validation

Zod validates the API response before the product data is used.

### Billing Validation

Zod validates:

* Required fields
* Email format
* 10-digit phone number
* 6-digit postal code

Validation errors are displayed near the corresponding form fields.

## Known Limitations

* The application uses a public DummyJSON API, so product data depends on the availability and response of the external API.
* No payment gateway is integrated.
* Checkout does not create a real backend order.
* Billing/shipping information is handled only within the checkout flow and is not submitted to a backend.
* No authentication or user account functionality is implemented.

## Conclusion

The application focuses on maintainable React patterns, type safety, runtime validation, state management, responsive design, and a clear user checkout flow.
