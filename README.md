# 🔐 Node.js Authentication API

A secure Node.js + Express.js API for user authentication and authorization, featuring:

- **User Registration (Signup)**
- **User Login (JWT-based authentication)**
- **Authorization Middleware** (protecting private routes)
- **Role-based Access Control** (optional)
- **Environment Variables for Configuration**
- **Security Best Practices Implemented**

---

## ✨ Features

- User registration with email and password
- Secure password hashing using **bcrypt**
- User login with JSON Web Tokens (**JWT**)
- Protected routes accessible only to authenticated users
- Middleware for authentication and authorization
- Basic role-based authorization (Admin/User) *(optional enhancement)*
- Clean, modular code structure for scalability

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs
- **Environment Config**: dotenv
- **Security Middleware**: Helmet, CORS, express-rate-limit

---

