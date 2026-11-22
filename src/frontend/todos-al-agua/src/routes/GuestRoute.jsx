import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { destinoInicial } from "../auth/permissions";

export default function GuestRoute() {
  const { isAuthenticated, hasPermission } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={destinoInicial(hasPermission)} replace />;
  }

  return <Outlet />;
}
