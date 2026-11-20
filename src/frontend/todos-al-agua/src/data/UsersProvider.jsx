import { useCallback, useMemo, useState } from "react";
import { UsersContext } from "./usersContext";

const STORAGE_KEY = "todos-al-agua.users";

const SEED_USERS = [
  { id: "u-1", nombre: "María González", email: "admin@todosalagua.com", rol: "admin" },
  { id: "u-2", nombre: "Carlos Ruiz", email: "carlos.ruiz@gmail.com", rol: "usuario" },
  { id: "u-3", nombre: "Lucía Fernández", email: "lucia.fernandez@gmail.com", rol: "usuario" },
  { id: "u-4", nombre: "Diego Martínez", email: "diego.martinez@gmail.com", rol: "admin" },
  { id: "u-5", nombre: "Ana López", email: "ana.lopez@gmail.com", rol: "usuario" },
];

function readStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState(readStoredUsers);

  const updateRole = useCallback((id, rol) => {
    setUsers((current) => {
      const next = current.map((user) =>
        user.id === id ? { ...user, rol } : user,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({ users, updateRole }), [users, updateRole]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
