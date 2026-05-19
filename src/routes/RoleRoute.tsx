import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../types/User';
import { useAuth } from '../context/AuthContext';

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not in allowed roles, redirect to unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If allowed, render the outlet
  return <Outlet />;
};

export default RoleRoute;
