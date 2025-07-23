# 🛒 NestMart - E-commerce Backend API

NestMart is a fully featured e-commerce backend built with [NestJS](https://nestjs.com/). It includes user authentication, role-based authorization, product management, and MongoDB integration — ideal for learning, prototyping, or building scalable applications.

![NestJS](https://img.shields.io/badge/NestJS-v10-red?style=flat-square&logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-ORM-green?style=flat-square&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)

---

## 🚀 Features

- ✅ JWT Authentication with secure user login/register
- ✅ Role-based access control (`admin`, `user`)
- ✅ Modular structure with NestJS best practices
- ✅ MongoDB with Mongoose
- ✅ Global exception filters and pipes
- ✅ Guards, Interceptors, Middleware (like Morgan)
- ✅ Validated environment configuration using Joi
- ✅ Pagination, Search, and Filtering for products
- ✅ Docker support

---

## 📁 Project Structure
```bash
src/
│
├── auth/        # Auth module (guards, login, register)
├── users/       # User module with role-based logic
├── product/     # Product module (CRUD, filtering, etc.)
├── common/      # Decorators, Pipes, Filters, Interceptors
├── mongo/       # MongoDB connection
├── main.ts      # App entrypoint
└── app.module.ts # Root module
```

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/nestmart.git
cd nestmart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
PORT=3000
   
MONGO_URI=mongodb://localhost:27017/nestmart
   
JWT_SECRET=your_jwt_secret
   
JWT_EXPIRES_IN=1d
```

### 4. Run the app
```bash
npm run start:dev
```
