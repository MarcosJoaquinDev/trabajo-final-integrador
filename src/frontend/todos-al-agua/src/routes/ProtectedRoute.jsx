import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ requiredPermission }) {
  const { isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/sin-acceso" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
