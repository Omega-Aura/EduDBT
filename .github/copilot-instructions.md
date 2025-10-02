# Aadhaar DBT Awareness Platform - Project Instructions

## Project Overview

MERN Stack (MongoDB, Express.js, React, Node.js) Aadhaar DBT Awareness Platform for helping students understand and navigate Aadhaar linking, DBT enabling, and scholarship applications.

## Completed Setup Tasks

### ✅ Project Scaffolding

- Complete MERN stack structure created with backend (Node.js/Express) and frontend (React) directories
- Models, controllers, routes, components, and configuration files properly structured

### ✅ Feature Implementation

- User authentication with JWT (login, register, role-based access)
- Dashboard page with statistics, quick actions, and progress tracking
- Profile management with 5 tabs (Personal Info, Password, Aadhaar, Bank Details, Notifications)
- Learning Center with 11 comprehensive educational articles
- Responsive UI with Bootstrap 5 and React Bootstrap

### ✅ Database

- MongoDB Atlas connected (cluster0.tvzi0xg.mongodb.net/aadhaar-dbt)
- User model with complete profile fields
- Content model for educational articles
- Admin user: admin@dbtaware.gov.in / Admin@123

### ✅ Educational Content

Successfully added 6 comprehensive educational modules:

1. **Troubleshooting Common Aadhaar and DBT Issues** (troubleshooting, 15 min read)
2. **How to Check Your DBT Status Online** (dbt-info, 12 min read)
3. **Pre-Matric Scholarship Schemes for SC Students** (scholarship-guide, 20 min read)
4. **Step-by-Step Guide: Linking Aadhaar to Bank Account** (bank-linking, 18 min read)
5. **Step-by-Step Guide to Enable DBT** (bank-linking, 16 min read)
6. **Essential Documents Required** (aadhaar-basics, 20 min read)

### ✅ Dependencies

All packages installed and ready:

- Backend: express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors
- Frontend: react, react-router-dom, redux, axios, bootstrap, react-bootstrap

### ✅ Development Tasks

- Backend server configured to run on port 5000 with nodemon
- Frontend development server configured on port 3000
- Both servers can run concurrently

## Project Structure

```
SIH MERN Prototype/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Content.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── contentController.js
│   │   │   └── userController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── content.js
│   │   │   └── user.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── app.js
│   ├── seedData.js
│   ├── seedNewModules.js
│   ├── seedRemainingModules.js
│   ├── seedFinalModule.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.js
│   │   │   │   └── Footer.js
│   │   │   └── auth/
│   │   │       ├── Login.js
│   │   │       └── Register.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Profile.js
│   │   │   ├── LearningCenter.js
│   │   │   └── ArticleDetail.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   └── App.js
│   └── public/
└── .github/
    └── copilot-instructions.md

## Available Routes

### Backend API Endpoints
- **Auth**: POST /api/auth/register, POST /api/auth/login
- **Content**: GET /api/content, GET /api/content/:id, GET /api/content/category/:category
- **User Profile**:
  - GET /api/user/profile
  - PUT /api/user/profile
  - PUT /api/user/password
  - PUT /api/user/aadhaar
  - PUT /api/user/bank-details
  - PUT /api/user/notifications

### Frontend Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (protected)
- `/profile` - User profile management (protected)
- `/learning-center` - Educational articles
- `/learning-center/articles/:id` - Article detail
- `/learning-center/category/:category` - Articles by category

## Environment Variables Required

### Backend (.env)
```

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadhaar-dbt
JWT_SECRET=your_jwt_secret_key
PORT=5000

```

### Frontend (.env)
```

REACT_APP_API_URL=http://localhost:5000

````

## Running the Project

1. **Start Backend Server**:
   ```powershell
   cd backend
   npm start
````

Server runs on http://localhost:5000

2. **Start Frontend Server**:
   ```powershell
   cd frontend
   npm start
   ```
   Frontend runs on http://localhost:3000

## Key Features

### For Students

- Browse educational content about Aadhaar, DBT, and scholarships
- Step-by-step guides with screenshots and detailed instructions
- Troubleshooting guides for common issues
- Profile management with Aadhaar and bank details
- Dashboard with progress tracking

### For Administrators

- Content management system
- User management
- Analytics and reporting

## Technical Highlights

- JWT-based authentication with role-based access control
- RESTful API design
- Responsive UI with Bootstrap 5
- MongoDB for data persistence
- React Hooks for state management
- Protected routes with authentication middleware

## Recent Updates

- Fixed all navigation links from /content to /learning-center
- Implemented comprehensive profile management system
- Fixed date of birth handling in profile updates
- Added 6 detailed educational modules (12,000+ words each)
- Enhanced Learning Center with category filtering

## Future Enhancements

- Email verification system
- SMS notifications for updates
- Admin dashboard for content analytics
- Search functionality in Learning Center
- Bookmark favorite articles
- Download articles as PDF
