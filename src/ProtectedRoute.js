import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from './UserContext';

function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;