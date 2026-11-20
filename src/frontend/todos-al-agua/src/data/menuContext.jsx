import { createContext, useContext } from "react";

export const MenuContext = createContext(null);

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu debe usarse dentro de un MenuProvider");
  }

  return context;
}
