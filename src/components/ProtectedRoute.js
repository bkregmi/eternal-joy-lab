import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, but save the current location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;