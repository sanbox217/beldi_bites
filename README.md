# Beldi Bites

A mobile-first marketplace connecting Moroccan home cooks in Casablanca with nearby customers who want fresh, authentic, homemade foods.

## 🥘 About

Beldi Bites enables home cooks to create storefronts, list traditional Moroccan foods (msemen, beghrir, harsha, bread, krachel, sweets, tajines) with photos and prices, and manage orders. Customers can discover nearby homemade foods, browse by neighborhood/category, and place cash-on-delivery (COD) orders.

## 🎯 MVP Scope

- **Arabic-first** interface with French optional (RTL support)
- **Casablanca-only** coverage with predefined neighborhoods
- **Cash-on-delivery** payments only
- **Single-cook cart** limitation
- **Mobile-first** design with cultural Moroccan motifs

## 🏗️ Architecture

```
beldi_bites/
├── backend/          # Node.js + Express + MongoDB API
├── fronted/          # React + TypeScript + Vite frontend
├── CLAUDE.md         # Project specifications and development guide
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/sanbox217/beldi_bites.git
cd beldi_bites
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on `http://localhost:3000`

### 3. Setup Frontend

```bash
cd fronted
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 📱 Features

### Authentication & Accounts ✅
- [x] Email/password registration with role selection (cook/customer)
- [x] Mobile-first Sign Up screen with validation
- [x] Arabic RTL support with French toggle
- [x] Automatic cook profile creation with neighborhood selection

### Cook Tools (Planned)
- [ ] Profile management (bio, photo, neighborhood)
- [ ] Menu CRUD (name, description, price, images, availability)
- [ ] Order inbox with status updates

### Discovery (Planned)
- [ ] Home feed with nearby foods
- [ ] Search and filters (category, neighborhood)
- [ ] Cook storefronts and product details

### Cart & Checkout (Planned)
- [ ] Single-cook cart with delivery/pickup toggle
- [ ] Address selection and time slot booking
- [ ] COD-only checkout flow

### Orders & Tracking (Planned)
- [ ] Customer order history and status tracking
- [ ] Cook order management with status updates
- [ ] Order lifecycle: Pending → Accepted → In Progress → Completed

## 🛠️ Development

### Project Structure

```
backend/
├── src/
│   ├── config/       # Database and app configuration
│   ├── models/       # MongoDB/Mongoose models
│   ├── routes/       # API route handlers
│   ├── utils/        # Utilities (auth, validation, constants)
│   └── types/        # TypeScript type definitions
└── package.json

fronted/
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Route components
│   ├── services/     # API client and external services
│   ├── types/        # TypeScript interfaces
│   └── utils/        # Frontend utilities and constants
└── package.json
```

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Backend `.env`:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/beldi_bites
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

## 🌍 Localization

- **Primary Language**: Arabic (RTL)
- **Secondary Language**: French (LTR)
- **UI Framework**: react-i18next
- **Cultural Design**: Subtle zellige patterns, deep green/terracotta colors

## 🎨 Design System

- **Primary Color**: Deep Green (Emerald-600)
- **Accent Color**: Terracotta
- **Neutral**: Sand tones
- **Typography**: RTL-aware layouts
- **Components**: shadcn/ui with Tailwind CSS

## 📊 Success Metrics (MVP)

- **Supply**: Active cooks onboarded, products listed
- **Demand**: Monthly active customers, search-to-cart conversion
- **Orders**: Weekly orders, acceptance/completion times
- **Reliability**: Crash-free sessions, API response times

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/SCRUM-XXX-description`
2. Follow TypeScript and ESLint conventions
3. Test on both Arabic/French languages
4. Create PR with detailed description
5. Reference JIRA tickets in commits

## 📝 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Project Specifications (CLAUDE.md)](./CLAUDE.md)
- [Backend Setup Guide](./backend/README.md)
- [JIRA Project](https://beldibites.atlassian.net/)

---

**Built with ❤️ for authentic Moroccan home cooking**