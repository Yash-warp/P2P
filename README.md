# Lendit - P2P Rental Marketplace (Monorepo)

A peer-to-peer (P2P) equipment rental marketplace inspired by Lendit India, featuring a modular architecture with separated **Frontend** and **Backend** directories.

---

## 📁 Project Architecture

```
P2P ecell Fe Startup/
├── frontend/                     # React + Vite + Tailwind CSS Application
│   ├── public/                   # Static assets (logo, icons, etc.)
│   ├── src/
│   │   ├── components/           # UI & Section components (Hero, Navbar, Marketplace, etc.)
│   │   ├── context/              # AppContext (global state, auth, rentals, messages)
│   │   ├── data/                 # Client mock data & helpers
│   │   ├── App.jsx               # Main App routing & layout
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Tailwind & tactile neumorphic styles
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite config (runs on :3000, proxies /api -> :5000)
│   ├── tailwind.config.js        # Design tokens & color system
│   └── package.json              # Frontend dependencies
│
├── backend/                      # Node.js + Express REST API Server
│   ├── src/
│   │   ├── controllers/          # Business logic (listings, rentals, users, messages, etc.)
│   │   ├── routes/               # API endpoints
│   │   ├── data/                 # In-memory store & seed data
│   │   └── server.js             # Express server entry point (runs on :5000)
│   ├── .env                      # Environment config (PORT=5000, CLIENT_URL)
│   ├── .env.example              # Environment template
│   └── package.json              # Backend dependencies (express, cors)
│
├── package.json                  # Root monorepo workspace scripts
└── README.md
```

---

## 🚀 Quick Start

### 1. Start Frontend (React + Vite)
```powershell
# From the project root:
.\run.ps1 npm run dev:frontend

# Or directly in frontend folder:
cd frontend
..\run.ps1 npm run dev
```
- **URL:** [http://localhost:3000/](http://localhost:3000/)

### 2. Start Backend (Express API)
```powershell
# From the project root:
.\run.ps1 npm run dev:backend

# Or directly in backend folder:
cd backend
..\run.ps1 npm run dev
```
- **URL:** [http://localhost:5000/](http://localhost:5000/)
- **Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & uptime status |
| `GET` | `/api/listings` | Fetch rental gear (filters: category, search, price, location) |
| `GET` | `/api/listings/categories` | Get category list with live item counts |
| `GET` | `/api/listings/:id` | Get single listing details |
| `POST` | `/api/listings` | Create a new equipment listing |
| `PUT` | `/api/listings/:id` | Update an existing listing |
| `DELETE`| `/api/listings/:id` | Delete a listing |
| `GET` | `/api/rentals` | Get rental requests & booking history |
| `POST` | `/api/rentals` | Submit a new rental booking request |
| `PATCH`| `/api/rentals/:id/status` | Update booking status (`pending`, `accepted`, `completed`, `cancelled`) |
| `GET` | `/api/users/me` | Get current user profile & verification details |
| `POST` | `/api/users/login` | User login |
| `POST` | `/api/users/register` | User signup |
| `GET` | `/api/messages` | Get user chat conversations |
| `POST` | `/api/messages/:id` | Send message in a conversation thread |
| `POST` | `/api/calculator/estimate`| Calculate estimated monthly ROI for gear |
| `GET` | `/api/activity` | Live rental & listing activity ticker feed |

