# Fitness Centre Frontend

A Vue 3 + Vite application for managing a fitness centre. Provides a modern UI for members and bookings management.

## Features

- **Dashboard**: Overview of fitness centre statistics
- **Members Management**: View, create, edit, delete members, view class bookings
- **Bookings Management**: View, create, edit, and delete class bookings
- **Authentication**: Login/Logout with token-based auth

## Requirements

- Node.js 18+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Running Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

Build output will be in the `dist` folder.

## Configuration

The API URL is configured in `src/services/api.js`. By default it points to `http://127.0.0.1:8000`.

## Project Structure

```
src/
├── components/     # Reusable components (DataTable, Navbar, Sidebar)
├── layouts/        # Layout components (MainLayout)
├── pages/          # Page components (Dashboard, Members, Bookings, Login)
├── router/         # Vue Router configuration
├── services/       # API services (api, auth, user, booking)
├── store/          # Vuex store
├── App.vue         # Root component
└── main.js         # App entry point
```

## Test Credentials

In test-backend, if following is done:
php artisan migrate:fresh --seed
Can use credential below to login:

- **Username**: `admin`
- **Password**: `password123`
