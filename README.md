
# 📚 BookNook — Online Library

BookNook is a full-stack online library management application that allows users to discover books, manage their personal book collections, borrow available books, and return borrowed books.

The application features a responsive interface, secure user authentication, and a MongoDB-powered backend.

## 🌐 Live Website

- **Client:** https://booknook-client-zbaq.vercel.app
- **Server:** https://booknook-server-gold.vercel.app

## 🔗 GitHub Repositories

- **Client:** https://github.com/MahbubaNimmi15/booknook-client
- **Server:** https://github.com/MahbubaNimmi15/booknook-server

## ✨ Key Features

1. User registration and login with email/password.
2. Google OAuth authentication.
3. Responsive navigation with user profile and logout.
4. Homepage with a three-slide hero slider.
5. Latest books section displaying six recent books.
6. Browse all available books.
7. View individual book details.
8. Add new books to the library.
9. Edit and delete books from My Books.
10. Borrow available books.
11. Return borrowed books.
12. View personal borrowing history.
13. Protected pages for authenticated users.
14. Loading indicators and error messages.
15. Custom 404 page.
16. SEO metadata and page titles.

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
| All Books | Browse the library collection |
| Book Details | View information about a selected book |
| Add Book | Add books to the library |
| My Books | Manage personal book listings |
| My Borrows | View borrowed books and return them |
| Login | Sign in using email or Google |
| Register | Create a new account |
| 404 | Custom page for invalid routes |

## 🔐 Authentication

BookNook supports:

- Email and password authentication
- Google OAuth login
- Session-based authentication through Better Auth
- Protected routes for authenticated users

## ⚙️ Local Installation

### 1. Clone the Repository

bash
git clone https://github.com/MahbubaNimmi15/booknook-client.git


### 2. Navigate to the Project

bash
cd booknook-client


### 3. Install Dependencies

bash
npm install


### 4. Configure Environment Variables

Create a .env.local file in the project root.

Configure the environment variables required by your authentication, database, and backend API setup.

Example API configuration:

env
NEXT_PUBLIC_API_URL=https://booknook-server-gold.vercel.app


Never commit actual passwords, OAuth client secrets, database credentials, or authentication secrets to GitHub.

### 5. Run the Development Server

bash
npm run dev -- --webpack


### 6. Open the Application

Visit:

http://localhost:3000

## 📱 Responsive Design

BookNook uses Tailwind CSS to provide layouts for desktop, tablet, and mobile devices.

## 🚀 Deployment

The frontend and backend are deployed separately on Vercel.

**Frontend:**
https://booknook-client-zbaq.vercel.app

**Backend:**
https://booknook-server-gold.vercel.app


## 📌 Project Purpose

This project was developed as a full-stack web application to demonstrate authentication, database integration, CRUD operations, book borrowing functionality, responsive design, and deployment.
