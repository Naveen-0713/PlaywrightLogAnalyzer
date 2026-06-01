# React Login + Dashboard Application

A responsive, user-friendly React web application that demonstrates a complete front-end workflow from authentication to analytics visualization.

---

## 🚀 Features

### Authentication
- Sign Up with name, username, password and role selection
- Login with created credentials
- Form validation (empty fields, password match, minimum length)
- Session management using localStorage
- Protected routes (dashboard blocked without login)

### Dashboard
- Key metric cards (Total Users, Revenue, Active Sessions, Errors)
- Interactive bar chart (Monthly Users & Revenue)
- Dynamic data grid with:
  - Search / Filter
  - Column sorting
  - Pagination
- Logout functionality

### Pages & Routing
- `/` — Login & Sign Up
- `/dashboard` — Main dashboard (all roles)
- `/users` — Registered users list (Admin only)
- `/settings` — Account settings (all roles)

### Role-Based Access
| Role   | Dashboard | Users Page | Settings |
|--------|-----------|------------|----------|
| User   | ✅        | ❌         | ✅       |
| Editor | ✅        | ❌         | ✅       |
| Admin  | ✅        | ✅         | ✅       |

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React | UI Framework |
| React Router DOM | Client-side routing |
| Recharts | Bar chart visualization |
| localStorage | Session & user storage |
| CSS | Custom styling |

---

## 📁 Project Structure


src/
├── main.jsx
├── App.jsx
│
├── services/
│   └── api.js
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Users.jsx
│   └── Settings.jsx
│
└── styles/
└── global.css

---

## ⚙️ Setup & Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies
```bash
npm install
```

3. Install required packages
```bash
npm install react-router-dom recharts
```

4. Run the development server
```bash
npm run dev
```

5. Open in browser

---

## 🔐 How to Use

1. Open the app
2. Click **Sign Up** tab
3. Fill in your name, username, password and select a role
4. Switch to **Login** tab and sign in
5. Explore the dashboard

> **Note:** Admin role gets access to the Users page in the navbar

---

## ⚠️ Disclaimer

This is a **frontend-only demo application**.
- No real backend or database
- Passwords stored in plain text in localStorage
- Not suitable for production use
- Built for demo / portfolio / learning purposes only

---

## 📄 License

MIT License — free to use and modify