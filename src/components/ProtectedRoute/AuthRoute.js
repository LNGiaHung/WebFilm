import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useNotify } from '../../hooks/useNotify';

const AuthRoute = ({ allowedRoles }) => {
  const { auth, user } = useAuth();
  const location = useLocation();
  const notify = useNotify();

  if (!auth.accessToken) {
    notify("Please log in to access this page.", "error");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.roles[0].name))) {
    notify("You don't have permission to access this page.", "error");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
