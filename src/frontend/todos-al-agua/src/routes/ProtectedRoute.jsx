import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ requiredRole }) {
  const { user } = useAuth();
  const location = useLocation();

  const hasAccess = Boolean(user) && (!requiredRole || user.rol === requiredRole);

  if (!hasAccess) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
