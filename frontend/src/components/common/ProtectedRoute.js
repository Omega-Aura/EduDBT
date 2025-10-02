import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Spinner, Container } from 'react-bootstrap';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login with return path if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading...</p>
      </Container>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    const returnPath = encodeURIComponent(location.pathname + location.search);
    const message = encodeURIComponent('Please log in to access this feature.');
    return <Navigate to={`/login?from=${returnPath}&message=${message}`} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
