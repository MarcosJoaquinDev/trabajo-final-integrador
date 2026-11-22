import { useCallback, useEffect, useMemo, useState } from "react";
import { UsersContext } from "./usersContext";
import { apiUsers, getToken } from "../api/client";

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!getToken()) return undefined;
    let active = true;

    apiUsers
      .getAll()
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        setUsers(
          data.map((u) => ({
            id: u.id,
            nombre: u.name ?? u.nombre ?? u.email,
            email: u.email,
            rol: u.rol ?? "usuario",
          })),
        );
      })
      .catch(() => {
        // Sin permisos o sin backend: la lista queda vacía.
      });

    return () => {
      active = false;
    };
  }, []);

  const updateRole = useCallback((id, rol) => {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, rol } : user)),
    );
    apiUsers.update(id, { rol }).catch(() => {});
  }, []);

  const value = useMemo(() => ({ users, updateRole }), [users, updateRole]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
