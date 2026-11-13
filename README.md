# 📚 BookNook — Online Library Management System

BookNook is a full-stack online library management application that allows users to explore books, manage their personal book collections, borrow available books, and return borrowed books.

The application features a responsive interface, secure user authentication, and a MongoDB-powered backend.

## 🌐 Live Website

- **Frontend:** https://booknook-client-zbaq.vercel.app
- **Backend:** https://booknook-server-gold.vercel.app

## 🔗 GitHub Repositories

- **Frontend:** https://github.com/MahbubaNimmi15/booknook-client
- **Backend:** https://github.com/MahbubaNimmi15/booknook-server

## ✨ Key Features

### Authentication
- User registration and login using email and password
- Google OAuth authentication
- Session management using Better Auth
- Protected routes for authenticated users
- User profile display and logout functionality

### Book Management
- Browse all available books
- View detailed information about individual books
- Add new books to the library
- View personal book listings in My Books
- Edit and delete books added by the logged-in user
- Form validation for required fields, quantity, and rating

### Borrowing System
- Borrow available books
- View personal borrowing records
- Return borrowed books
- Update available book quantities after borrowing and returning
- Prevent borrowing unavailable books

### User Interface
- Responsive navigation bar
- Homepage with a three-slide hero slider
- Latest Books section displaying six recent books
- Responsive layouts for mobile, tablet, and desktop
- Loading indicators and error messages
- Custom 404 page
- SEO metadata and page titles

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication
- Better Auth
- Google OAuth

### Deployment
- Vercel
- GitHub

## 📄 Application Pages

| Page | Description |
|------|-------------|
| Home | Hero slider, latest books, and additional sections |
| All Books | Browse the complete book collection |
| Book Details | View information about a selected book and borrow it |
| Add Book | Add new books to the library |
| My Books | View, edit, and delete personal book listings |
| My Borrows | View borrowed books and return them |
| Login | Sign in with email/password or Google |
| Register | Create a new account |
| 404 | Custom page for invalid routes |

## 🔐 Authentication and Security

BookNook uses Better Auth for user authentication and session management.

Supported authentication methods:
- Email and password
- Google OAuth

Security features:
- Protected pages for authenticated users
- Server-side session validation
- Internal API key authentication between the frontend server and Express backend
- Ownership checks for editing, deleting, and returning books
- Environment variables for sensitive configuration

Sensitive credentials are stored in environment variables and must never be committed to GitHub.

## ⚙️ Local Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- MongoDB Atlas account or another MongoDB instance

### 1. Clone the Frontend Repository

bash
git clone https://github.com/MahbubaNimmi15/booknook-client.git


### 2. Navigate to the Project Directory

bash
cd booknook-client


### 3. Install Dependencies

bash
npm install


### 4. Configure Environment Variables

Create a file named .env.local in the frontend project root.

Add the following environment variables:

env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

NEXT_PUBLIC_API_URL=http://localhost:5000

INTERNAL_API_SECRET=your_shared_internal_api_secret


Replace the placeholder values with your own configuration.

Important notes:
- BETTER_AUTH_SECRET must be a secure random secret.
- Configure Google OAuth authorized origins and redirect URIs for your local application.
- INTERNAL_API_SECRET must match the value configured in the backend.
- Never commit .env.local to GitHub.
- The current frontend also uses a production backend fallback in certain API routes. Adjust those URLs if running a different backend environment.

### 5. Run the Frontend

bash
npm run dev -- --webpack


### 6. Open the Application

Visit:

http://localhost:3000

## ⚙️ Backend Setup

The Express backend is maintained in a separate repository.

### 1. Clone the Backend Repository

bash
git clone https://github.com/MahbubaNimmi15/booknook-server.git


### 2. Navigate to the Backend Directory

bash
cd booknook-server


### 3. Install Dependencies

bash
npm install


### 4. Configure Backend Environment Variables

Create a .env file in the backend project directory.

Example configuration:

env
PORT=5000

MONGODB_URI=your_mongodb_connection_string
DB_NAME=booknook

INTERNAL_API_SECRET=your_shared_internal_api_secret


Make sure the frontend and backend use the same INTERNAL_API_SECRET.

### 5. Run the Backend

Use the start command defined in the backend project's package.json.

For example, if a start script is configured:

bash
npm start


The backend runs locally at:

http://localhost:5000

## 📚 API Overview

The Express backend provides the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Check backend health |
| GET | /api/books | Retrieve all books |
| GET |  /api/books/:id | Retrieve a single book |
| POST | /api/books | Add a new book |
| PATCH | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |
| POST | /api/borrow | Borrow an available book |
| POST | /api/return | Return a borrowed book |

Write operations are protected using an internal API key. The frontend validates the user's session before forwarding authorized requests.

## 📱 Responsive Design

BookNook uses Tailwind CSS to provide responsive layouts across:

- Desktop computers
- Tablets
- Mobile devices

Navigation menus, book cards, images, and forms are designed to adapt to different screen sizes.

## 🚀 Deployment

The frontend and backend are deployed separately using Vercel.

### Frontend Deployment

https://booknook-client-zbaq.vercel.app

### Backend Deployment

https://booknook-server-gold.vercel.app

### Deployment Configuration

Configure the required environment variables in each Vercel project.

For the frontend, configure Better Auth, Google OAuth, MongoDB, and the shared internal API secret.

For the backend, configure MongoDB and the matching internal API secret.

Production Google OAuth must include the appropriate authorized redirect URI:

text
https://booknook-client-zbaq.vercel.app/api/auth/callback/google


Do not expose secret values in public repositories.

## ✅ Functional Testing

The following features have been manually tested:

- Email registration and login
- Google OAuth login
- Protected routes and logout
- Browsing all books
- Viewing book details
- Adding books
- Editing books
- Deleting books
- Borrowing books
- Returning borrowed books
- Required field validation
- Quantity and rating validation
- Mobile responsive layouts

## 📌 Project Purpose

BookNook was developed as a full-stack web application to demonstrate:

- Authentication and authorization
- REST API integration
- MongoDB database operations
- CRUD functionality
- Book borrowing and returning
- Responsive frontend development
- Full-stack deployment using Vercel

The project combines modern frontend technologies with a Node.js and Express backend to provide an interactive online library management experience.
