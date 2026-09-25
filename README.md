# 🤖 The Practical AI Prompt Playbook — E-Commerce Site

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce site for selling "The Practical AI Prompt Playbook" digital product.

## 🚀 Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Express.js + Node.js
- **Database:** MongoDB (Atlas)
- **Auth:** JWT (JSON Web Tokens)

## 📁 Project Structure

```
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Header, Footer, PaymentModal, PromoInput
│   │   ├── pages/        # Home, OrderStatus, AdminLogin, AdminDashboard
│   │   ├── context/      # CartContext
│   │   └── api/          # Axios config
│   └── public/           # Static assets (author pic, free PDF)
├── server/          # Express.js backend
│   ├── config/     # MongoDB connection
│   ├── models/     # Order, PromoCode, Admin
│   ├── routes/     # API routes
│   ├── middleware/  # JWT auth
│   ├── server.js   # Entry point
│   └── seed.js     # Seed promo codes
└── package.json    # Root scripts
```

## ⚡ Quick Start

### 1. Set up MongoDB
- Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
- Copy your connection string

### 2. Configure Environment
```bash
# Edit server/.env with your MongoDB URI
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Install Dependencies
```bash
npm install                   # Root dependencies
cd server && npm install      # Server dependencies
cd ../client && npm install   # Client dependencies
```

### 4. Seed Default Promo Code
```bash
npm run seed   # Creates the WALEED promo code (50% off)
```

### 5. Run Development
```bash
npm run dev    # Starts both server (port 5000) and client (port 5173)
```

### 6. Build for Production
```bash
npm run build  # Builds React app
npm start      # Serves everything from Express
```

## 💳 Payment Methods

| Method     | Number/Email                    | Account Name  |
|------------|--------------------------------|---------------|
| JazzCash   | 0321 542 3874                  | Muhammad Ali  |
| EasyPaisa  | 0321 542 3874                  | Muhammad Ali  |
| SadaPay    | 0305 538 9967                  | Muhammad Ali  |
| NayaPay    | 0321 542 3874                  | Muhammad Ali  |
| Binance    | alikhanwebdeveloper@gmail.com  | Muhammad Ali  |

## 🔐 Admin Setup

Visit `/admin/login` to access the admin dashboard. First-time setup:
```bash
POST /api/admin/setup
{ "username": "admin", "password": "
" }
```

## 📄 License
© 2026 Muhammad Ali • AliBuild Digital
