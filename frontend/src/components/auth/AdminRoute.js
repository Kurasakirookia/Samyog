import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  // If user is not admin, redirect to home page
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // If user is admin, render the admin component
  return children;
};

export default AdminRoute;