# 🎓 Aadhaar DBT Awareness Platform# Aadhaar DBT Awareness Platform

A comprehensive MERN Stack web application designed to help students understand and navigate Aadhaar linking, DBT (Direct Benefit Transfer) enabling, and scholarship applications.A comprehensive MERN Stack web application designed to educate students about Aadhaar-DBT (Direct Benefit Transfer) integration for seamless scholarship disbursements.

## 📋 Table of Contents## 🎯 Problem Statement

- [Features](#features)Many students are unaware of the distinction between Aadhaar-linked and Direct Benefit Transfer (DBT) enabled Aadhaar-seeded bank accounts, leading to delays in scholarship disbursements and challenges in accessing government benefits.

- [Tech Stack](#tech-stack)

- [Prerequisites](#prerequisites)## 🚀 Solution

- [Installation](#installation)

- [Environment Setup](#environment-setup)Our platform provides:

- [Running the Application](#running-the-application)

- [Project Structure](#project-structure)- **Educational Content**: Comprehensive guides about Aadhaar and DBT

- [Seeding Data](#seeding-data)- **Step-by-step Tutorials**: Bank linking and scholarship application processes

- [API Documentation](#api-documentation)- **Status Tracking**: Monitor application progress

- [Contributing](#contributing)- **Multi-language Support**: Content in multiple Indian languages

- [License](#license)- **24/7 Support**: Help and troubleshooting assistance

## ✨ Features## 🛠️ Technology Stack

### For Students### Backend

- 🔐 **User Authentication** - Secure JWT-based login/registration with role-based access

- 📊 **Personalized Dashboard** - Track learning progress, articles read, and quiz scores- **Node.js** with Express.js framework

- 📚 **Learning Center** - 11+ comprehensive educational articles about Aadhaar, DBT, and scholarships- **MongoDB** with Mongoose ODM

- 🎯 **Interactive Quizzes** - Test knowledge with multiple-choice quizzes- **JWT** for authentication

- 👤 **Profile Management** - Manage personal info, Aadhaar details, bank details- **Bcrypt** for password hashing

- 🤖 **AI Chatbot** - Get instant answers using Google Gemini 2.0 Flash AI- **Express Validator** for input validation

- 🌐 **Multi-language Support** - 13 Indian languages (Hindi, Bengali, Tamil, etc.)- **Winston** for logging

- 📈 **Progress Tracking** - Real-time tracking of articles read and quiz completion- **Helmet** for security headers

- 🔔 **Notifications** - Important alerts about scholarships and deadlines- **Rate limiting** for API protection

### For Administrators### Frontend

- 👥 **User Management** - View and manage registered users

- 📝 **Content Management** - Create, edit, and manage educational content- **React.js** with hooks and functional components

- 📊 **Analytics** - Track user engagement and learning patterns- **Redux Toolkit** for state management

- **React Router** for navigation

## 🛠️ Tech Stack- **Bootstrap** for responsive UI

- **Formik & Yup** for form handling and validation

### Frontend- **Axios** for API communication

- **React 18** - UI library- **React Icons** for consistent iconography

- **React Router v6** - Client-side routing

- **Redux Toolkit** - State management## 📁 Project Structure

- **Bootstrap 5** - UI framework

- **React Bootstrap** - React components for Bootstrap```

- **Axios** - HTTP clientaadhaar-dbt-platform/

- **Formik + Yup** - Form handling and validation├── backend/ # Node.js Express API

- **i18next** - Internationalization (13 languages)│ ├── src/

- **React Icons** - Icon library│ │ ├── config/ # Database and JWT configuration

│ │ ├── controllers/ # Route controllers

### Backend│ │ ├── middleware/ # Authentication, validation, error handling

- **Node.js** - Runtime environment│ │ ├── models/ # MongoDB schemas

- **Express.js** - Web framework│ │ ├── routes/ # API routes

- **MongoDB** - Database (MongoDB Atlas)│ │ └── app.js # Express app configuration

- **Mongoose** - ODM for MongoDB│ ├── package.json

- **JWT** - Authentication│ └── server.js # Entry point

- **bcryptjs** - Password hashing│

- **Google Gemini AI** - Chatbot intelligence├── frontend/ # React.js application

- **express-validator** - Input validation│ ├── public/

- **cors** - Cross-origin resource sharing│ ├── src/

│ │ ├── components/ # Reusable components

## 📦 Prerequisites│ │ ├── hooks/ # Custom hooks

│ │ ├── pages/ # Page components

Before you begin, ensure you have the following installed:│ │ ├── services/ # API services

│ │ ├── store/ # Redux store and slices

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)│ │ ├── App.js # Main app component

- **npm** (v8 or higher) - Comes with Node.js│ │ └── index.js # Entry point

- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)│ └── package.json

- **Google Gemini API Key** - [Get API Key](https://makersuite.google.com/app/apikey)│

- **Git** - [Download](https://git-scm.com/)└── README.md

````

## 🚀 Installation

## 🚦 Getting Started

### 1. Clone the Repository

### Prerequisites

```bash

git clone <repository-url>- Node.js (v16 or higher)

cd "SIH MERN Prototype"- MongoDB (v4.4 or higher)

```- npm or yarn



### 2. Install Backend Dependencies### Backend Setup



```bash1. Navigate to backend directory:

cd backend

npm install```bash

```cd backend

````

### 3. Install Frontend Dependencies

2. Install dependencies:

````bash

cd ../frontend```bash

npm installnpm install

````

## 🔧 Environment Setup3. Create environment file:

### Backend Environment Variables```bash

cp .env.example .env

1. Copy the example environment file:```

   ```````bash

   cd backend4. Configure environment variables in `.env`:

   cp .env.example .env

   ``````env
   ```````

NODE_ENV=development

2. Edit `backend/.env` and fill in your values:PORT=5000

MONGODB_URI=mongodb://localhost:27017/aadhaar-dbt

```propertiesJWT_SECRET=your-super-secret-jwt-key

# EnvironmentJWT_EXPIRES_IN=24h

NODE_ENV=developmentCORS_ORIGIN=http://localhost:3000

```

# Server Configuration

PORT=50005. Start the development server:

# MongoDB Configuration```bash

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadhaar-dbt?retryWrites=true&w=majoritynpm run dev

````

# JWT Configuration

JWT_SECRET=your-super-secret-jwt-key-change-in-productionThe backend API will be available at `http://localhost:5000`

JWT_EXPIRES_IN=24h

### Frontend Setup

# Email Service (Optional)

EMAIL_SERVICE_API_KEY=your-email-service-key1. Navigate to frontend directory:



# SMS Service (Optional)```bash

SMS_SERVICE_API_KEY=your-sms-service-keycd frontend

````

# CORS Configuration

CORS_ORIGIN=http://localhost:30002. Install dependencies:

# Rate Limiting```bash

RATE_LIMIT_WINDOW_MS=900000npm install

RATE_LIMIT_MAX_REQUESTS=100```

# Google Gemini API Key3. Create environment file:

GEMINI_API_KEY=your-gemini-api-key-here

````bash

cp .env.example .env

### Frontend Environment Variables```



1. Copy the example environment file:4. Configure environment variables in `.env`:

   ```bash

   cd frontend```env

   cp .env.example .envREACT_APP_API_URL=http://localhost:5000/api

   ```REACT_APP_ENVIRONMENT=development

```

2. Edit `frontend/.env`:

5. Start the development server:

```properties

# API Configuration```bash

REACT_APP_API_URL=http://localhost:5000/apinpm start

```

# Environment

REACT_APP_ENVIRONMENT=developmentThe frontend application will be available at `http://localhost:3000`



# Version## 📚 API Endpoints

REACT_APP_VERSION=1.0.0

```### Authentication



## 🎯 Running the Application- `POST /api/auth/register` - User registration

- `POST /api/auth/login` - User login

### Option 1: Run Both Servers Separately- `GET /api/auth/me` - Get current user

- `POST /api/auth/logout` - User logout

**Terminal 1 - Backend:**- `POST /api/auth/forgot-password` - Password reset

```bash

cd backend### Content Management

npm run dev

```- `GET /api/content` - Get all content (with pagination and filtering)

Server runs on: http://localhost:5000- `GET /api/content/:id` - Get specific content

- `GET /api/content/featured` - Get featured content

**Terminal 2 - Frontend:**- `GET /api/content/categories` - Get content categories

```bash- `POST /api/content` - Create content (Admin only)

cd frontend- `PUT /api/content/:id` - Update content (Admin only)

npm start- `DELETE /api/content/:id` - Delete content (Admin only)

```

Frontend runs on: http://localhost:3000## 🔐 Security Features



### Option 2: Run with PM2 (Production)- **JWT Authentication**: Secure token-based authentication

- **Password Hashing**: Bcrypt for secure password storage

```bash- **Rate Limiting**: Prevent abuse and DDoS attacks

# Install PM2 globally- **Input Validation**: Comprehensive validation using express-validator

npm install -g pm2- **Security Headers**: Helmet.js for HTTP security headers

- **CORS Configuration**: Controlled cross-origin resource sharing

# Start backend- **Error Handling**: Centralized error handling with logging

cd backend

pm2 start server.js --name "aadhaar-backend"## 🎨 UI/UX Features



# Start frontend (build first)- **Responsive Design**: Mobile-first approach with Bootstrap

cd ../frontend- **Accessibility**: WCAG compliant components

npm run build- **Progressive Enhancement**: Works without JavaScript

pm2 serve build 3000 --name "aadhaar-frontend"- **Loading States**: User feedback during API calls

```- **Error Boundaries**: Graceful error handling

- **Form Validation**: Real-time validation with user-friendly messages

## 📁 Project Structure

## 🧪 Testing

```

SIH MERN Prototype/### Backend Testing

├── backend/

│   ├── src/```bash

│   │   ├── controllers/      # Request handlerscd backend

│   │   ├── models/           # Mongoose modelsnpm test

│   │   ├── routes/           # API routes```

│   │   ├── middleware/       # Custom middleware

│   │   ├── services/         # Business logic (Gemini AI)### Frontend Testing

│   │   └── config/           # Configuration files

│   ├── seedData.js           # Seed educational content```bash

│   ├── seedQuizData.js       # Seed quiz questionscd frontend

│   ├── .env.example          # Environment templatenpm test

│   └── server.js             # Entry point```

├── frontend/

│   ├── public/## 🚀 Deployment

│   │   ├── chatbot-logo.png  # Chatbot icon

│   │   └── locales/          # Translation files (13 languages)### Backend Deployment (PM2)

│   ├── src/

│   │   ├── components/       # React components```bash

│   │   │   ├── layout/       # Header, Footernpm install -g pm2

│   │   │   ├── auth/         # Login, Registerpm2 start ecosystem.config.js --env production

│   │   │   ├── chatbot/      # AI Chatbot```

│   │   │   └── common/       # Reusable components

│   │   ├── pages/            # Page components### Frontend Deployment

│   │   ├── store/            # Redux store

│   │   ├── services/         # API services```bash

│   │   ├── hooks/            # Custom hooksnpm run build

│   │   └── App.js            # Root component# Deploy build folder to your hosting service

│   └── .env.example          # Environment template```

└── README.md

```## 🤝 Contributing



## 🌱 Seeding Data1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

### Seed Educational Content (Required)3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

```bash5. Open a Pull Request

cd backend

node seedData.js## 📝 License

```

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This will create:

- 11 comprehensive educational articles## 🙏 Acknowledgments

- Categories: Aadhaar Basics, DBT Info, Scholarship Guide, Bank Linking, Troubleshooting

- Sample admin user: `admin@dbtaware.gov.in` / `Admin@123`- **Smart India Hackathon 2024** for the problem statement

- **Government of India** for DBT and Aadhaar initiatives

### Seed Quiz Questions (Optional)- **Open Source Community** for the amazing tools and libraries



```bash## 📞 Support

cd backend

node seedQuizData.jsFor support and queries:

```

- Email: support@dbtaware.gov.in

This will create:- Phone: 1800-XXX-XXXX

- Multiple-choice quizzes for each learning module- Documentation: [Wiki](https://github.com/your-repo/wiki)

- Questions with 4 options each

- Correct answers marked---



## 🔌 API Documentation**Built with ❤️ for Smart India Hackathon 2024**


### Authentication Routes

| Method | Endpoint              | Description           | Auth Required |
|--------|----------------------|----------------------|---------------|
| POST   | `/api/auth/register` | Register new user    | No            |
| POST   | `/api/auth/login`    | Login user          | No            |
| GET    | `/api/auth/me`       | Get current user    | Yes           |
| POST   | `/api/auth/logout`   | Logout user         | Yes           |

### User Routes

| Method | Endpoint                    | Description              | Auth Required |
|--------|----------------------------|--------------------------|---------------|
| GET    | `/api/user/profile`        | Get user profile         | Yes           |
| PUT    | `/api/user/profile`        | Update profile           | Yes           |
| PUT    | `/api/user/password`       | Update password          | Yes           |
| PUT    | `/api/user/aadhaar`        | Update Aadhaar details   | Yes           |
| PUT    | `/api/user/bank-details`   | Update bank details      | Yes           |
| GET    | `/api/user/stats`          | Get learning statistics  | Yes           |
| POST   | `/api/user/track-article`  | Track article read       | Yes           |

### Content Routes

| Method | Endpoint                     | Description                | Auth Required |
|--------|------------------------------|----------------------------|---------------|
| GET    | `/api/content`               | Get all articles           | No            |
| GET    | `/api/content/:id`           | Get article by ID          | No            |
| GET    | `/api/content/category/:cat` | Get articles by category   | No            |

### Chatbot Routes

| Method | Endpoint                | Description           | Auth Required |
|--------|------------------------|----------------------|---------------|
| POST   | `/api/chatbot/message` | Send message to AI   | Optional      |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Default Credentials

After seeding data, you can login with:

**Admin Account:**
- Email: `admin@dbtaware.gov.in`
- Password: `Admin@123`

**Test Student Account (create manually):**
- Register through the UI at http://localhost:3000/register

## 🌐 Supported Languages

- 🇬🇧 English (en)
- 🇮🇳 हिंदी (hi)
- 🇮🇳 বাংলা (bn)
- 🇮🇳 मराठी (mr)
- 🇮🇳 తెలుగు (te)
- 🇮🇳 தமிழ் (ta)
- 🇮🇳 ગુજરાતી (gu)
- 🇮🇳 اردو (ur)
- 🇮🇳 ಕನ್ನಡ (kn)
- 🇮🇳 ଓଡିଆ (or)
- 🇮🇳 മലയാളം (ml)
- 🇮🇳 ਪੰਜਾਬੀ (pa)
- 🇮🇳 অসমীয়া (as)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues

- Ensure MongoDB Atlas IP whitelist includes your IP (or use 0.0.0.0/0 for testing)
- Check connection string format
- Verify username/password are URL-encoded

### Frontend Not Connecting to Backend

- Verify `REACT_APP_API_URL` in `frontend/.env`
- Check CORS settings in `backend/.env`
- Ensure backend server is running

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed for Smart India Hackathon 2025

## 🙏 Acknowledgments

- Google Gemini AI for chatbot capabilities
- MongoDB Atlas for database hosting
- React and Node.js communities

---

**For issues and questions, please open an issue on GitHub.**
````
