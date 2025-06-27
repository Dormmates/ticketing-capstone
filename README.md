# 🎟️ SLU CCA Ticketing System — Frontend

This is the **frontend** application for the **Saint Louis University Center for Culture and the Arts (CCA) Ticketing System**, built with **React**, **TypeScript**, **React Router**, and **Tailwind CSS**. It supports role-based access and dynamic modules for CCA staff, ticket distributors, and audience viewing.

---

## 📦 Tech Stack

- ⚛️ React + Vite
- 🧠 TypeScript
- 💄 Tailwind CSS
- 🔁 React Router DOM v6
- ⚙️ TanStack React Query (data fetching & caching)
- 💾 LocalStorage for authentication persistence

---

## 🚀 Features

### ✅ Core Modules

- **CCA Dashboard**

  - Show management (create/edit)
  - Distributor management
  - Analytics & ticket allocation

- **Distributor Dashboard**

  - Create audience reservations
  - View allocations and ticket records

- **Audience View**
  - View available shows and schedules (no login required)

### 🧰 Shared Features

- Reusable dropdowns, modals, loaders
- Role-based routing and layout rendering
- Auth context for login persistence

---

## 🔧 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Dormmates/frontend-capstone.git
cd ticketing-system-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the App

```bash
npm run dev
```
