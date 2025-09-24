# Beldi Bites - Project Overview

## What it is
Beldi Bites is a mobile-first marketplace connecting Moroccan home cooks in Casablanca with nearby customers who want fresh, authentic, homemade foods (msemen, beghrir, harsha, bread, krachel, sweets, tajines). Cooks create storefronts, list items with photos/prices, set availability and delivery/pickup options. Customers browse, search, filter by neighborhood/category, add to cart, and place cash-on-delivery (COD) orders. MVP is Casablanca-only, Arabic-first with French optional, and focuses on reliability, trust, and simplicity.

## Who it serves & value
- **Home cooks (supply)**: simple onboarding, easy product listing, order management, and optional local delivery.
- **Customers (demand)**: fast discovery of nearby homemade foods, clear pricing/availability, COD checkout, basic order tracking.
- **Cultural fit**: sober/modern UI with subtle Moroccan motifs (zellige tones), RTL Arabic by default.

## MVP scope (functional)
- **Auth & accounts**: email/phone + password, roles (cook/customer), profile, logout, password reset.
- **Cook tools**: profile (bio, photo, neighborhood), menu CRUD (name, description, price, images, availability), order inbox with status updates.
- **Discovery**: home feed, search, filters (category, neighborhood), cook storefronts, product details.
- **Cart & checkout**: single-cook cart (MVP), delivery or pickup toggle, address selection (Casablanca), time slot selection (simple windows), COD only.
- **Orders & tracking**: customer order list + statuses; cook status changes (Pending → Accepted → In Progress → Out for Delivery / Ready for Pickup → Completed).
- **Localization**: Arabic (RTL) default, French optional; UI chrome localized (UGC remains as entered).
- **Offline basics**: cached listings & cart; graceful error states.
- **City data**: predefined Casablanca neighborhoods.

## Non-goals for MVP
In-app payments, reviews/ratings, chat, multi-city expansion, complex logistics/fees, multi-cook cart.

## Frontend (Mobile App)

### Platform & stack
- React Native (Expo or bare RN), TypeScript
- State/data: React Query (server cache) + lightweight global state (Zustand/Context)
- i18n: react-i18next (Arabic default, RTL) + French
- Navigation: React Navigation (stack + bottom tabs)
- Media: React Native Image Picker; upload to backend/cloud
- Storage: AsyncStorage (auth token, cart, cached lists)
- Notifications (optional MVP+): FCM for order updates

### Key screens
Auth (Login/Signup/Forgot), Home/Browse (search, filters), Product Details, Cook Storefront, Cart, Checkout (delivery/pickup, address, timeslot, summary), Orders (customer), Orders (cook), Cook Dashboard (profile/menu/orders), Profile & Address Book, Settings (language).

### UX principles
Mobile-first, large tap targets, skeleton loaders, clear empty/error states, RTL-aware layouts, culturally rooted palette (deep green/terracotta/sand).

## Backend (API & Data)

### Recommended options
**Option A (fastest)**: Firebase (Auth, Firestore, Storage, Cloud Functions, FCM)
- Pros: minimal ops, realtime listeners for orders, built-in Auth, easy file storage
- Cons: vendor lock-in; relational queries limited

**Option B (simple server)**: Node.js + Express + MongoDB Atlas + S3/Cloudinary
- Pros: flexible data modeling, easy REST, portable
- Cons: more ops than Firebase

### Core models (conceptual)
```typescript
User {
  id,
  role: 'cook'|'customer',
  name,
  email/phone,
  avatarUrl,
  language,
  addresses[],
  createdAt
}

Cook {
  id,
  userId,
  displayName,
  bio,
  neighborhood,
  delivery: {enabled, pickupEnabled},
  coverUrl,
  createdAt
}

Product {
  id,
  cookId,
  name,
  description,
  priceMAD,
  images[],
  category,
  available,
  createdAt
}

Order {
  id,
  customerId,
  cookId,
  items[{productId, qty, unitPriceMAD}],
  totalMAD,
  delivery: {type: 'delivery'|'pickup', address?, timeslot?},
  payment: {method:'cod', status:'unpaid'},
  status,
  timeline[],
  createdAt
}

Address {
  id,
  label,
  street,
  neighborhood,
  notes
}
```

### API surface (REST example)
- **Auth**: POST /auth/signup, POST /auth/login, POST /auth/reset
- **Users**: GET /me, PUT /me, GET /me/addresses, POST /me/addresses, PUT /me/addresses/:id, DELETE /me/addresses/:id
- **Cooks**: GET /cooks/:id, PUT /cooks/:id (owner), GET /cooks/:id/products
- **Products**: GET /products?search=&category=&neighborhood=, GET /products/:id, POST /products (cook), PUT /products/:id (cook), DELETE /products/:id (cook), PATCH /products/:id/availability
- **Orders (customer)**: POST /orders, GET /orders, GET /orders/:id
- **Orders (cook)**: GET /cook/orders, PATCH /cook/orders/:id/status
- **Uploads**: POST /uploads (signed URL or direct to storage)

### Auth & security
- JWT (or Firebase Auth ID tokens)
- Role-based access (cook can only mutate own cook/product/order docs)
- Input validation (Zod/Joi) + rate limiting + basic logging
- Image uploads via signed URLs; validate mime/size

### Business rules (MVP)
- Single-cook cart; prevent mixing cooks
- COD only; payment status stays unpaid
- Neighborhoods enumerated list (Casablanca)
- Delivery fee simple or omitted (MVP can show "COD; fee agreed with cook")
- Timeslots: configurable simple windows (e.g., today/evening or tomorrow/morning)

### Scalability & ops
- Paginate product listings; add simple indexes (by cookId, category, neighborhood)
- Background jobs minimal; rely on cook-driven status changes
- Backups (Firestore automatic / Mongo Atlas backups)
- Observability: basic request logs + error tracking (Sentry) + metrics later

## Branding & content
- **Name**: Beldi Bites
- **Tone**: warm, trustworthy, artisanal
- **Visual cues**: subtle zellige/star patterns, deep green primary, terracotta accent, sand neutrals
- **Arabic-first copy**; French toggle

## Success metrics (MVP)
- **Supply**: # active cooks onboarded, # products listed
- **Demand**: # monthly active customers, search-to-add-to-cart rate, checkout completion rate
- **Orders**: # orders/week, order acceptance time, completion time
- **Reliability**: crash-free sessions, API error rate, avg. page/API latency

## Development Commands

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Build for production
npm run build
```

### Backend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Build for production
npm run build
```