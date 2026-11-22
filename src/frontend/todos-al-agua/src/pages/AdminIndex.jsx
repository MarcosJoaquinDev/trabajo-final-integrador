import { Navigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { destinoInicial } from "../auth/permissions";

export default function AdminIndex() {
  const { hasPermission } = useAuth();

  return <Navigate to={destinoInicial(hasPermission)} replace />;
}
