# Beldi Bites Backend API

Node.js + Express + TypeScript + MongoDB backend for the Beldi Bites marketplace.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** running locally or MongoDB Atlas account
- **Git**

### Installation

```bash
# Clone and navigate to backend
cd beldi_bites/backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env file with your configuration
```

### Environment Setup

Create `.env` file from `.env.example`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/beldi_bites
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

**Important**: Change `JWT_SECRET` to a secure random string in production.

### MongoDB Setup Options

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Default connection: mongodb://localhost:27017/beldi_bites
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and database
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address in Atlas Network Access

### Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production build and run
npm run build
npm start

# Type checking only
npm run typecheck

# Linting
npm run lint
```

Server starts on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```
Returns server status and environment info.

### Authentication

#### User Registration
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "password": "securepassword123",
  "role": "cook",
  "phone": "+212666123456",
  "neighborhood": "Maarif"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "673c1f2e...",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "role": "cook",
    "language": "ar",
    "addresses": [],
    "createdAt": "2024-09-24T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🗄️ Database Models

### User Model
```typescript
{
  id: string;
  name: string;
  email: string;          // unique, indexed
  phone?: string;
  password: string;       // bcrypt hashed
  role: 'cook' | 'customer'; // indexed
  avatarUrl?: string;
  language: 'ar' | 'fr';  // default: 'ar'
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Cook Model
```typescript
{
  id: string;
  userId: string;         // ref to User, unique, indexed
  displayName: string;
  bio?: string;
  neighborhood: string;   // indexed, from CASABLANCA_NEIGHBORHOODS
  delivery: {
    enabled: boolean;     // default: true
    pickupEnabled: boolean; // default: true
  };
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Address Schema
```typescript
{
  id: string;
  label: string;          // e.g., "Home", "Work"
  street: string;
  neighborhood: string;   // from CASABLANCA_NEIGHBORHOODS
  notes?: string;
}
```

## 🏙️ Casablanca Neighborhoods

The API supports these predefined neighborhoods:

```typescript
[
  'Ain Chock', 'Ain Sebaa', 'Al Fida', 'Anfa', 'Belvédère',
  'Bernoussi', 'Bourgogne', 'Casa-Anfa', 'Centre-ville',
  'Derb Ghallef', 'Hay Hassani', 'Hay Mohammadi', 'La Gironde',
  'Lissasfa', 'Maarif', 'Masbah', 'Moulay Rachid', 'Oasis',
  'Oulfa', 'Racine', 'Roches Noires', 'Salmia', 'Sbata',
  'Sidi Belyout', 'Sidi Bernoussi', 'Sidi Maarouf', 'Sidi Moumen'
]
```

## 🔐 Security Features

### Password Security
- **bcrypt** hashing with 12 rounds (configurable via `BCRYPT_ROUNDS`)
- Minimum 6 characters, maximum 100 characters
- Passwords never returned in API responses

### JWT Authentication
- **Tokens** expire in 7 days (configurable via `JWT_EXPIRES_IN`)
- **Payload** includes: user ID, email, role
- **Algorithm**: HS256

### Input Validation
- **Zod schemas** for request validation
- **Email format** validation
- **Role validation** (cook/customer only)
- **Neighborhood validation** against predefined list

### API Security
- **Helmet.js** for security headers
- **CORS** configured for development/production
- **Request size limits** (10MB for file uploads)
- **Error handling** without sensitive data leaks

## 🛠️ Development

### Project Structure
```
src/
├── config/
│   └── database.ts     # MongoDB connection setup
├── models/
│   ├── User.ts         # User MongoDB schema
│   └── Cook.ts         # Cook MongoDB schema
├── routes/
│   └── auth.ts         # Authentication endpoints
├── types/
│   └── index.ts        # TypeScript interfaces
├── utils/
│   ├── auth.ts         # JWT & password utilities
│   ├── constants.ts    # App constants (neighborhoods)
│   └── validation.ts   # Zod validation schemas
└── index.ts            # Express app entry point
```

### Adding New Endpoints

1. **Create route handler** in `src/routes/`
2. **Add validation schema** in `src/utils/validation.ts`
3. **Import route** in `src/index.ts`
4. **Add TypeScript types** in `src/types/`

Example:
```typescript
// src/routes/products.ts
import { Router } from 'express';
import { productSchema } from '@/utils/validation';

const router = Router();

router.post('/products', async (req, res) => {
  const validation = productSchema.safeParse(req.body);
  // Handle validation and business logic
});

export { router as productsRouter };
```

### Database Utilities

```bash
# Connect to local MongoDB
mongosh beldi_bites

# View collections
show collections

# Query users
db.users.find().pretty()

# Query cooks
db.cooks.find().pretty()
```

### Testing API with cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Register user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "customer"
  }'
```

## 🚀 Deployment

### Production Environment

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/beldi_bites
JWT_SECRET=very-long-random-production-secret
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring

### Health Check Endpoint

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-09-24T10:00:00.000Z",
  "environment": "development"
}
```

### Database Connection Events

The server logs MongoDB connection status:
- ✅ `MongoDB Connected: cluster0-shard-00-00.mongodb.net`
- ❌ `Database connection error: ...`
- ⚠️ `MongoDB disconnected`

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check Atlas connection string.

#### JWT Secret Warning
```
Warning: Using fallback JWT secret
```
**Solution**: Set proper `JWT_SECRET` in `.env` file.

#### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Change `PORT` in `.env` or kill existing process:
```bash
lsof -ti:3000 | xargs kill
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# MongoDB query debugging
DEBUG=mongoose* npm run dev
```

## 📝 API Documentation

Full API documentation will be generated with tools like Swagger/OpenAPI once more endpoints are implemented.

Current endpoints:
- `POST /api/auth/signup` - User registration
- `GET /api/health` - Health check

Planned endpoints:
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/cooks/:id` - Get cook profile
- `POST /api/products` - Create product listing

---

For frontend integration, see the main [README.md](../README.md) in the project root.