// src/Components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.usertype)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
