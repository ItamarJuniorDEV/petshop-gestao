import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;