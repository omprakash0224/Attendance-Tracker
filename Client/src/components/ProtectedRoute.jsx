import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth'; // Adjust the import as necessary

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;

