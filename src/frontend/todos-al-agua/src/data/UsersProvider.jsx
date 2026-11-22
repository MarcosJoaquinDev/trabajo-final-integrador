import { useCallback, useEffect, useMemo, useState } from "react";
import { UsersContext } from "./usersContext";
import { ROLES } from "../auth/permissions";
import { apiUsers, getToken } from "../api/client";

const SEED_USERS = [
  { id: "u-1", nombre: "María González", email: "admin@todosalagua.com", rol: ROLES.ADMIN },
  { id: "u-2", nombre: "Carlos Ruiz", email: "carlos.ruiz@gmail.com", rol: ROLES.USUARIO },
  { id: "u-3", nombre: "Lucía Fernández", email: "lucia.fernandez@gmail.com", rol: ROLES.USUARIO },
  { id: "u-4", nombre: "Diego Martínez", email: "diego.martinez@gmail.com", rol: ROLES.ADMIN },
  { id: "u-5", nombre: "Ana López", email: "ana.lopez@gmail.com", rol: ROLES.USUARIO },
  { id: "u-6", nombre: "Muelle Cantina", email: "cantina@todosalagua.com", rol: ROLES.CANTINA },
  { id: "u-7", nombre: "Flor de Pan", email: "huerta@todosalagua.com", rol: ROLES.HUERTA },
];

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState(SEED_USERS);

  useEffect(() => {
    if (!getToken()) return undefined;
    let active = true;
    apiUsers
      .getAll()
      .then((data) => {
        if (active && Array.isArray(data) && data.length) {
          setUsers(
            data.map((u) => ({
              id: u.id,
              nombre: u.name ?? u.nombre ?? u.email,
              email: u.email,
              rol: u.rol ?? ROLES.USUARIO,
            })),
          );
        }
      })
      .catch(() => {
        // Sin token o sin backend, se mantienen los usuarios locales.
      });
    return () => {
      active = false;
    };
  }, []);

  const updateRole = useCallback((id, rol) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, rol } : user,
      ),
    );
    apiUsers.update(id, { rol }).catch(() => {});
  }, []);

  const value = useMemo(() => ({ users, updateRole }), [users, updateRole]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}
