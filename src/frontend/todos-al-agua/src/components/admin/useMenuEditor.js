import { useEffect, useRef, useState } from "react";
import { useMenu } from "../../data/menuContext";
import menuData from "../../data/menu.json";
import { clone, normalizeForSave, validateMenu } from "../../utils/menuUtils";

export default function useMenuEditor() {
  const { menu, saveMenu, resetMenu } = useMenu();
  const [draft, setDraft] = useState(() => clone(menu));
  const [activeCategory, setActiveCategory] = useState(0);
  const [message, setMessage] = useState(null);
  const categoryScrollRef = useRef(null);
  const activeButtonRef = useRef(null);

  const selectedIndex = draft.length
    ? Math.min(activeCategory, draft.length - 1)
    : -1;
  const selected = selectedIndex >= 0 ? draft[selectedIndex] : null;
  const totalItems = draft.reduce(
    (total, category) => total + (category.items?.length ?? 0),
    0,
  );

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [selectedIndex]);

  function updateCategory(index, patch) {
    setDraft((current) =>
      current.map((category, i) =>
        i === index ? { ...category, ...patch } : category,
      ),
    );
  }

  function updateItem(categoryIndex, itemIndex, patch) {
    setDraft((current) =>
      current.map((category, i) => {
        if (i !== categoryIndex) {
          return category;
        }
        return {
          ...category,
          items: (category.items ?? []).map((item, j) =>
            j === itemIndex ? { ...item, ...patch } : item,
          ),
        };
      }),
    );
  }

  function updateSize(categoryIndex, itemIndex, size, value) {
    setDraft((current) =>
      current.map((category, i) => {
        if (i !== categoryIndex) {
          return category;
        }
        return {
          ...category,
          items: (category.items ?? []).map((item, j) =>
            j === itemIndex
              ? { ...item, precios: { ...item.precios, [size]: value } }
              : item,
          ),
        };
      }),
    );
  }

  function addItem(categoryIndex) {
    setDraft((current) =>
      current.map((category, i) =>
        i === categoryIndex
          ? {
              ...category,
              items: [
                ...(category.items ?? []),
                { nombre: "", descripcion: "", precio: "" },
              ],
            }
          : category,
      ),
    );
  }

  function removeItem(categoryIndex, itemIndex) {
    setDraft((current) =>
      current.map((category, i) =>
        i === categoryIndex
          ? {
              ...category,
              items: (category.items ?? []).filter((_, j) => j !== itemIndex),
            }
          : category,
      ),
    );
  }

  function addCategory() {
    setActiveCategory(draft.length);
    setDraft((current) => [
      ...current,
      { categoria: "", nota_guarnicion: "", items: [] },
    ]);
  }

  function removeCategory(index) {
    if (index <= selectedIndex) {
      setActiveCategory(Math.max(0, selectedIndex - 1));
    }
    setDraft((current) => current.filter((_, i) => i !== index));
  }

  function handleSave() {
    const error = validateMenu(draft);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const next = normalizeForSave(draft);
    saveMenu(next);
    setDraft(clone(next));
    setMessage({
      type: "success",
      text: "Menú guardado. Ya se refleja en /cantina.",
    });
  }

  function handleDiscard() {
    setDraft(clone(menu));
    setMessage(null);
  }

  function handleReset() {
    resetMenu();
    setDraft(clone(menuData.menu));
    setActiveCategory(0);
    setMessage({ type: "success", text: "Menú original restablecido." });
  }

  return {
    draft,
    selected,
    selectedIndex,
    totalItems,
    message,
    categoryScrollRef,
    activeButtonRef,
    setActiveCategory,
    updateCategory,
    updateItem,
    updateSize,
    addItem,
    removeItem,
    addCategory,
    removeCategory,
    handleSave,
    handleDiscard,
    handleReset,
  };
}
