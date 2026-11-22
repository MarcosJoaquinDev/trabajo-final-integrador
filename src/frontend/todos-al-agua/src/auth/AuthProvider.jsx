import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { permisosDeRol, rolDesdeEmail } from "./permissions";
import { useUsers } from "../data/usersContext";

const STORAGE_KEY = "todos-al-agua.auth";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }) {
  const { users } = useUsers();
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(
    (userData) => {
      const email = (userData.email ?? "").trim();
      const matched = users.find(
        (current) => current.email.toLowerCase() === email.toLowerCase(),
      );
      const nextUser = {
        ...userData,
        email,
        rol: matched?.rol ?? rolDesdeEmail(email),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    },
    [users],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
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
    }),
    [user, permissions, hasPermission, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
