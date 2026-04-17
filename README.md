# 🚀 MERN RBAC User Management System

A full-stack **User Management System** built using the MERN stack, implementing secure authentication and role-based access control (RBAC). This application demonstrates real-world backend architecture, secure API design, and role-driven frontend behavior.

---

## 🔐 Key Features

### Authentication & Security
- Secure user authentication using **JWT (JSON Web Tokens)**
- Password hashing with **bcrypt**
- Protected API routes with middleware-based authorization
- Environment-based configuration for sensitive credentials

---

### 🛡️ Role-Based Access Control (RBAC)
- Supports multiple user roles:
  - **Admin** – full system control
  - **User** – limited self-access
- Backend-enforced role permissions
- Frontend role-based UI rendering
- Unauthorized access handled with proper HTTP responses (401/403)

---

### 👥 User Management (Admin)
- View all users in the system
- Create new users with role assignment
- Update user details (name, email, role, status)
- Soft delete (deactivate) users
- Prevent inactive users from accessing the system

---

### 👤 User Self Management
- View personal profile details
- Update own name and password securely
- Restricted from accessing other users’ data
- Role and permissions cannot be modified by the user

---

### ⚙️ Backend Architecture
- RESTful API design using **Node.js & Express**
- Modular structure with controllers, routes, and middleware
- MongoDB with Mongoose for flexible data modeling
- Pre-save hooks for automatic password hashing
- Centralized error handling

---

### 🌐 Frontend Features
- Built with **React (Vite)**
- Axios-based API communication
- Persistent authentication using localStorage
- Protected routes for authenticated access
- Role-based navigation and page access
- Clean and minimal UI for usability

---

### 🔄 End-to-End Flow
- User logs in → receives JWT token  
- Token used for all protected API requests  
- Backend verifies identity + role permissions  
- UI dynamically adapts based on user role  

---

## 🚀 Deployment Ready
- Backend and frontend can be deployed independently
- Supports environment-based configuration for production
- Designed for scalability and maintainability

---

## 🔗 Links
- Deployment Link: https://rbac-user-management.vercel.app
- Backend Deployment Link: https://rbac-user-management-production.up.railway.app/api
- Demo Video: https://youtu.be/Bg-3M5MuRWo

---

## 🎯 Summary

This project showcases:
- Secure authentication workflows  
- Robust role-based authorization  
- Clean full-stack integration  
- Real-world application architecture  