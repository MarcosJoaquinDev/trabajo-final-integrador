import { useCallback, useMemo, useState } from "react";
import { MenuContext } from "./menuContext";
import menuData from "./menu.json";

const STORAGE_KEY = "todos-al-agua.menu";
const ORIGINAL_MENU = menuData.menu;

function readStoredMenu() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return ORIGINAL_MENU;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ORIGINAL_MENU;
  } catch {
    return ORIGINAL_MENU;
  }
}

export default function MenuProvider({ children }) {
  const [menu, setMenu] = useState(readStoredMenu);

  const saveMenu = useCallback((nextMenu) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMenu));
    setMenu(nextMenu);
  }, []);

  const resetMenu = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMenu(ORIGINAL_MENU);
  }, []);

  const value = useMemo(
    () => ({ menu, saveMenu, resetMenu }),
    [menu, saveMenu, resetMenu],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
