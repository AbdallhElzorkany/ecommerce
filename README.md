# 🛒 Souq - Modern E-Commerce Platform

A feature-rich, high-performance e-commerce web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Redux Toolkit**, **NextAuth.js v5**, and **Tailwind CSS v4**.

---

## 🌟 Key Features

### 🛍️ Shopping & Discovery
- **Hero & Featured Showcase**: Dynamic hero banners, top categories, popular brands, and curated featured products.
- **Product Catalog**: Paginated product list with search and category/brand filtering.
- **Product Details & Gallery**: Comprehensive product details with image sliders (Embla Carousel), specifications, pricing, and availability.
- **Brands & Categories**: Dedicated landing pages for browsing products by brand or category.

### 🛒 Shopping Cart & Wishlist
- **Interactive Cart**: Cart state management powered by Redux Toolkit, featuring item addition/removal, quantity updates, and live subtotal calculation.
- **Wishlist Integration**: Save favorite products for later, seamlessly synced with backend storage.

### 👤 User Account & Authentication
- **Authentication (NextAuth.js v5)**: Secure Credentials-based login and registration with JWT token session management.
- **Password Management**: Multi-step password reset flow (email request ➔ OTP code verification ➔ new password entry) and authenticated password updates.
- **Address Management**: Interactive drawer/sheet interface to view and add shipping addresses.
- **Order History**: View past orders and order status in the account portal.

### ⭐ Product Reviews & Ratings
- **Review System**: Authenticated users can leave ratings and write reviews on products.
- **Review Management**: Full CRUD capability (create, edit, delete) with instant UI revalidation via Server Actions (`revalidatePath`).

---

## 🛣️ Application Routes

### 🌐 Public & Storefront Routes
| Route | Description | Path Location |
| :--- | :--- | :--- |
| `/` | **Home Page**:  categories , brands, and product grid. | `src/app/page.tsx` |
| `/products` | **Products Catalog**: Paginated catalog displaying all available products with pagination controls. | `src/app/(app)/products/page.tsx` |
| `/products/[id]` | **Product Details**: Individual product view with image gallery, specs, price, rating breakdown, and product review section (CRUD). | `src/app/(app)/products/[id]/page.tsx` |
| `/categories` | **Categories List**: Grid showcase of all product categories available in the store. | `src/app/(app)/categories/page.tsx` |
| `/categories/[id]` | **Category Detail**: Category overview and paginated product grid filtered by the selected category. | `src/app/(app)/categories/[id]/page.tsx` |
| `/brands` | **Brands List**: Grid showcase of all featured brands. | `src/app/(app)/brands/page.tsx` |
| `/brands/[id]` | **Brand Detail**: Brand profile and paginated product grid filtered by the selected brand. | `src/app/(app)/brands/[id]/page.tsx` |

---

### 🔑 Authentication Routes (`(auth)` Group)
| Route | Description | Path Location |
| :--- | :--- | :--- |
| `/signin` | **Sign In**: User authentication login form powered by NextAuth.js Credentials provider. | `src/app/(auth)/signin/page.tsx` |
| `/signup` | **Sign Up**: New account registration form with form validation. | `src/app/(auth)/signup/page.tsx` |
| `/forgot-password` | **Forgot Password**: 3-step password recovery flow (1. Request OTP code via email, 2. Verify code, 3. Reset password). | `src/app/(auth)/forgot-password/page.tsx` |

---

### 👤 Account Portal Routes (`(account)` Group)
| Route | Description | Path Location |
| :--- | :--- | :--- |
| `/account/cart` | **Shopping Cart**: View added cart items, update quantities, remove items, and see pricing summary. | `src/app/(account)/account/cart/page.tsx` |
| `/account/wishlist` | **Wishlist**: Saved favorite items view with quick options to move items to cart or remove them. | `src/app/(account)/account/wishlist/page.tsx` |
| `/account/addresses` | **Shipping Addresses**: Manage saved delivery addresses and add new addresses via an interactive modal sheet. | `src/app/(account)/account/addresses/page.tsx` |
| `/account/allorders` | **Order History**: View user purchase history, order details, payment status, and delivery tracking. | `src/app/(account)/account/allorders/page.tsx` |
| `/account/security` | **Account Security**: Authenticated password management page to change account passwords. | `src/app/(account)/account/security/page.tsx` |
| `/account/checkout` | **Checkout**: Order review and checkout process to select shipping address and finalize orders. | `src/app/(account)/account/checkout/page.tsx` |

---

### ⚙️ API & Utility Routes
| Route | Description | Path Location |
| :--- | :--- | :--- |
| `/api/auth/[...nextauth]` | **NextAuth Handler**: Dynamic API route handling sign-in, sign-out, session retrieval, and JWT callbacks. | `src/app/api/auth/[...nextauth]/route.ts` |
| *Custom 404* | **Not Found Page**: Catch-all 404 error page for unhandled or missing routes. | `src/app/not-found.tsx` |

---

## 🛠️ Tech Stack

### Core Frameworks
- **[Next.js 16](https://nextjs.org/)** (App Router)
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** & **React Redux**: Client state management for cart, wishlist, and shipping addresses.

### Authentication & Security
- **[NextAuth.js v5](https://next-auth.js.org/)**: Authentication provider with custom credentials strategy and JWT handling.
- **[jwt-decode](https://github.com/auth0/jwt-decode)**: Client/server token decoding.

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first styling framework.
- **[Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)**: Accessible, customizable component primitives.
- **[Lucide React](https://lucide.dev/)**: Modern icon set.
- **[Embla Carousel](https://www.embla-carousel.com/)**: Touch-friendly carousel slider.
- **[Sonner](https://sonner.emilkowal.ski/)**: Toast notification system.

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com/)**: Performant form handling.
- **[Zod](https://zod.dev/)**: Schema-based validation.

---

## 📁 Project Structure

```
ecommerce/
├── src/
│   ├── app/                    # Next.js App Router Pages & Routes
│   │   ├── (account)/          # User account portal (cart, wishlist, addresses, orders, security, checkout)
│   │   ├── (app)/              # Public application routes (products, categories, brands)
│   │   ├── (auth)/             # Authentication routes (signin, signup, forgot-password)
│   │   ├── api/                # NextAuth API endpoints
│   │   ├── layout.tsx          # Root layout wrapped with Redux & NextAuth providers
│   │   └── page.tsx            # Home page with hero, categories, brands, and products
│   ├── components/             # Reusable UI Components
│   │   ├── cards/              # Product, brand, and category card components
│   │   ├── forgot-password/    # Step-by-step forgot password form components
│   │   ├── layout/             # Navbar, footer, and navigation components
│   │   ├── reviews/            # Product review list and submission forms
│   │   ├── ui/                 # Shadcn UI base components (Button, Input, Sheet, etc.)
│   │   └── ...                 # Custom action buttons (Cart, Wishlist, Addresses)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core utilities and server logic
│   │   ├── actions.ts          # Next.js Server Actions (API requests, revalidations)
│   │   ├── auth.ts             # NextAuth.js configuration and credentials provider
│   │   └── utils.ts            # Helper functions and class merging (clsx + tailwind-merge)
│   ├── redux/                  # Redux Store & Slices
│   │   ├── slices/             # Redux slices (cartSlice, wishlistSlice, addressesSlice)
│   │   ├── reduxProvider.tsx   # Client Redux provider wrapper
│   │   └── store.ts            # Redux store setup
│   └── types/                  # TypeScript interfaces (Product, Cart, Order, Address, etc.)
├── public/                     # Static assets & images
└── package.json                # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or `v20.x` (or later)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbdallhElzorkany/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and define the required variables:

   ```env
   # Backend API Base URL
   API_URL=https://ecommerce.routemisr.com

   # NextAuth Secret Key
   NEXT_AUTH_SECRET=your_nextauth_secret_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ⚙️ Environment Variables

| Variable | Description | Required |
| :--- | :--- | :---: |
| `API_URL` | Base URL of the e-commerce REST API server | Yes |
| `NEXT_AUTH_SECRET` | Secret key used by NextAuth to sign JWT tokens | Yes |

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode at `http://localhost:3000` |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Starts the production server after building |
| `npm run lint` | Runs ESLint to check for code style and syntax issues |

---

## 🔒 Authentication & API Integration

- **Server Actions**: Asynchronous requests for authentication, user password resets, address creation, and review CRUD are implemented via Next.js Server Actions in `src/lib/actions.ts`.
- **JWT & Sessions**: User credentials and tokens returned from the API backend are stored securely in NextAuth sessions, enabling authenticated server-side and client-side API requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
