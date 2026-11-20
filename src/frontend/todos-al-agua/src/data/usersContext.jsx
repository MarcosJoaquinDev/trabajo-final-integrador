import { createContext, useContext } from "react";

export const UsersContext = createContext(null);

export function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers debe usarse dentro de un UsersProvider");
  }

  return context;
}
