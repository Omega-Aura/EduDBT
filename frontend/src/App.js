import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store/store';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ChatbotButton from './components/chatbot/ChatbotButton';
// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LearningCenter from './pages/LearningCenter';
import ArticleDetail from './pages/ArticleDetail';
import QuizHub from './pages/QuizHub';
import QuizTake from './pages/QuizTake';
import QuizResults from './pages/QuizResults';
import Help from './pages/Help';
import AdminPanel from './pages/AdminPanel';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Loading component for translation loading
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <HelmetProvider>
          <Suspense fallback={<PageLoader />}>
            <Router>
            <Layout>
              {/* Global Floating Chatbot */}
              <ChatbotButton />
              
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/help" element={<Help />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/learning-center" element={
                <ProtectedRoute>
                  <LearningCenter />
                </ProtectedRoute>
              } />
              <Route path="/learning-center/articles/:id" element={
                <ProtectedRoute>
                  <ArticleDetail />
                </ProtectedRoute>
              } />
              <Route path="/learning-center/category/:category" element={
                <ProtectedRoute>
                  <LearningCenter />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/quiz-hub" element={
                <ProtectedRoute>
                  <QuizHub />
                </ProtectedRoute>
              } />
              <Route path="/quiz/:quizId" element={
                <ProtectedRoute>
                  <QuizTake />
                </ProtectedRoute>
              } />
              <Route path="/quiz/results/:attemptId" element={
                <ProtectedRoute>
                  <QuizResults />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* 404 Not Found */}
              <Route path="*" element={
                <div className="container py-5 text-center">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              } />
              </Routes>
            </Layout>
          </Router>
          </Suspense>
        </HelmetProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;