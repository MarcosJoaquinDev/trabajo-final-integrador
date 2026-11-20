import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useUsers } from "../data/usersContext";

const STORAGE_KEY = "todos-al-agua.auth";
const ADMIN_ROLE = "admin";
const USER_ROLE = "usuario";

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
      const inferredRole = email.toLowerCase().includes(ADMIN_ROLE)
        ? ADMIN_ROLE
        : USER_ROLE;
      const nextUser = {
        ...userData,
        email,
        rol: matched?.rol ?? inferredRole,
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

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.rol === ADMIN_ROLE,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
