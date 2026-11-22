import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { permisosDeRol } from "./permissions";
import { getToken, setToken, apiAuth } from "../api/client";

function userFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload.email, rol: payload.rol, id: payload.id };
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => userFromToken(getToken()));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si el token venció o es inválido, limpiamos la sesión.
    if (getToken() && !user) {
      setToken(null);
    }
  }, [user]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { token } = await apiAuth.login(email, password);
      setToken(token);
      const nextUser = userFromToken(token);
      if (!nextUser) {
        throw new Error("No se pudo leer la sesión del servidor");
      }
      setUser(nextUser);
      return nextUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const permissions = useMemo(() => permisosDeRol(user?.rol), [user?.rol]);

  const hasPermission = useCallback(
    (permission) => permissions.includes(permission),
    [permissions],
  );

  const value = useMemo(
    () => ({
      user,
      permissions,
      isAuthenticated: Boolean(user),
      isAdmin: user?.rol === "admin",
      hasPermission,
      login,
      logout,
      loading,
    }),
    [user, permissions, hasPermission, login, logout, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
