import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { PERMISOS } from "../../auth/permissions";
import { useMenu } from "../../data/menuContext";
import menuData from "../../data/menu.json";

const clone = (value) => JSON.parse(JSON.stringify(value));

function toPrice(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return Number(value);
}

function isValidPrice(value) {
  if (value === "" || value === null || value === undefined) {
    return true;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0;
}

function validate(menu) {
  for (const category of menu) {
    if (!category.categoria.trim()) {
      return "Todas las categorías deben tener un nombre.";
    }

    for (const item of category.items ?? []) {
      if (!item.nombre.trim()) {
        return "Todos los platos deben tener un nombre.";
      }

      if (item.precios) {
        if (!isValidPrice(item.precios.chica) || !isValidPrice(item.precios.grande)) {
          return "Los precios deben ser números válidos y mayores o iguales a cero.";
        }
      } else if (!isValidPrice(item.precio)) {
        return "Los precios deben ser números válidos y mayores o iguales a cero.";
      }
    }
  }

  return "";
}

function normalizeForSave(menu) {
  return menu.map((category) => ({
    ...category,
    categoria: category.categoria.trim(),
    items: (category.items ?? []).map((item) => {
      const next = {
        ...item,
        nombre: item.nombre.trim(),
        descripcion: (item.descripcion ?? "").trim(),
        promocion: (item.promocion ?? "").trim(),
      };

      if (item.precios) {
        next.precios = {
          chica: toPrice(item.precios.chica),
          grande: toPrice(item.precios.grande),
        };
      } else {
        next.precio = toPrice(item.precio);
      }

      return next;
    }),
  }));
}

export default function MenuPanel() {
  const { menu, saveMenu, resetMenu } = useMenu();
  const { hasPermission } = useAuth();
  const puedeEditar = hasPermission(PERMISOS.EDITAR_MENU);
  const [draft, setDraft] = useState(() => clone(menu));
  const [activeCategory, setActiveCategory] = useState(0);
  const [message, setMessage] = useState(null);

  const selectedIndex = draft.length ? Math.min(activeCategory, draft.length - 1) : -1;
  const selected = selectedIndex >= 0 ? draft[selectedIndex] : null;
  const totalItems = draft.reduce(
    (total, category) => total + (category.items?.length ?? 0),
    0,
  );

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
    const error = validate(draft);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const next = normalizeForSave(draft);
    saveMenu(next);
    setDraft(clone(next));
    setMessage({ type: "success", text: "Menú guardado. Ya se refleja en /cantina." });
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

  return (
    <section className="admin-menu">
      <div className="admin-menu-intro">
        <div>
          <h2 className="admin-panel-title">Editor del menú</h2>
          <p className="admin-panel-copy">
            Elegí una categoría a la izquierda y editá sus platos. Al guardar,
            los cambios se ven en la carta pública de /cantina.
          </p>
        </div>
        <span className="admin-menu-stats">
          <strong>{draft.length}</strong> categorías · <strong>{totalItems}</strong> platos
        </span>
      </div>

      {message && (
        <p className={`admin-message admin-message--${message.type}`}>
          {message.text}
        </p>
      )}

      {!puedeEditar && (
        <p className="admin-note">
          Tu cuenta no tiene permiso <code>editar_menu</code>. Podés consultar
          la carta, pero no modificarla.
        </p>
      )}

      <fieldset className="admin-readonly-fieldset" disabled={!puedeEditar}>
      <div className="admin-menu-grid">
        <aside className="admin-category-list" aria-label="Categorías del menú">
          <p className="admin-sidebar-label">Categorías</p>

          <div className="admin-category-scroll">
            {draft.map((category, index) => (
              <button
                className={
                  index === selectedIndex
                    ? "admin-category-item is-active"
                    : "admin-category-item"
                }
                key={index}
                type="button"
                onClick={() => setActiveCategory(index)}
              >
                <span className="admin-category-name">
                  {category.categoria || "Sin nombre"}
                </span>
                <span className="admin-category-count">
                  {category.items?.length ?? 0}
                </span>
              </button>
            ))}

            {draft.length === 0 && (
              <p className="admin-empty">Todavía no hay categorías.</p>
            )}
          </div>
        </aside>

        <div className="admin-category-editor">
          {selected && (
            <>
              <div className="admin-editor-header">
                <div className="admin-editor-fields">
                  <label>
                    <span className="admin-field-label">Nombre de la categoría</span>
                    <input
                      className="admin-input"
                      aria-label="Nombre de la categoría"
                      value={selected.categoria}
                      onChange={(event) =>
                        updateCategory(selectedIndex, {
                          categoria: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span className="admin-field-label">Nota (opcional)</span>
                    <input
                      className="admin-input admin-input--small"
                      aria-label="Nota de la categoría"
                      placeholder="Ej: Todo con Fritas, Ensalada o Puré"
                      value={selected.nota_guarnicion ?? ""}
                      onChange={(event) =>
                        updateCategory(selectedIndex, {
                          nota_guarnicion: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => removeCategory(selectedIndex)}
                >
                  Eliminar categoría
                </button>
              </div>

              <div className="admin-items-head">
                <h3>
                  Platos <span className="admin-count">{selected.items?.length ?? 0}</span>
                </h3>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => addItem(selectedIndex)}
                >
                  Agregar plato
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table admin-items-table">
                  <thead>
                    <tr>
                      <th>Plato</th>
                      <th>Descripción / promoción</th>
                      <th>Precio</th>
                      <th aria-label="Acciones" />
                    </tr>
                  </thead>
                  <tbody>
                    {(selected.items ?? []).map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>
                          <input
                            className="admin-input admin-input--small"
                            aria-label={`Nombre del plato ${itemIndex + 1}`}
                            value={item.nombre}
                            onChange={(event) =>
                              updateItem(selectedIndex, itemIndex, {
                                nombre: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="admin-input admin-input--small"
                            aria-label={`Descripción de ${item.nombre}`}
                            placeholder="Descripción"
                            value={item.descripcion ?? ""}
                            onChange={(event) =>
                              updateItem(selectedIndex, itemIndex, {
                                descripcion: event.target.value,
                              })
                            }
                          />
                          <input
                            className="admin-input admin-input--small"
                            aria-label={`Promoción de ${item.nombre}`}
                            placeholder="Promoción (opcional)"
                            value={item.promocion ?? ""}
                            onChange={(event) =>
                              updateItem(selectedIndex, itemIndex, {
                                promocion: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          {item.precios ? (
                            <div className="admin-price-pair">
                              <label>
                                <span>Chica</span>
                                <input
                                  className="admin-input admin-input--small"
                                  type="number"
                                  min="0"
                                  aria-label={`Precio chico de ${item.nombre}`}
                                  value={item.precios.chica ?? ""}
                                  onChange={(event) =>
                                    updateSize(
                                      selectedIndex,
                                      itemIndex,
                                      "chica",
                                      event.target.value,
                                    )
                                  }
                                />
                              </label>
                              <label>
                                <span>Grande</span>
                                <input
                                  className="admin-input admin-input--small"
                                  type="number"
                                  min="0"
                                  aria-label={`Precio grande de ${item.nombre}`}
                                  value={item.precios.grande ?? ""}
                                  onChange={(event) =>
                                    updateSize(
                                      selectedIndex,
                                      itemIndex,
                                      "grande",
                                      event.target.value,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ) : (
                            <input
                              className="admin-input admin-input--small"
                              type="number"
                              min="0"
                              aria-label={`Precio de ${item.nombre}`}
                              value={item.precio ?? ""}
                              onChange={(event) =>
                                updateItem(selectedIndex, itemIndex, {
                                  precio: event.target.value,
                                })
                              }
                            />
                          )}
                        </td>
                        <td>
                          <button
                            className="admin-icon-btn"
                            type="button"
                            title="Eliminar plato"
                            aria-label={`Eliminar ${item.nombre}`}
                            onClick={() => removeItem(selectedIndex, itemIndex)}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}

                    {!(selected.items?.length ?? 0) && (
                      <tr>
                        <td className="admin-empty-row" colSpan={4}>
                          Esta categoría todavía no tiene platos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {!selected && (
            <p className="admin-empty">Agregá una categoría para empezar a editar.</p>
          )}
        </div>
      </div>

      <div className="admin-actions">
        <button className="btn btn-primary" type="button" onClick={addCategory}>
          Agregar categoría
        </button>
        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Guardar cambios
        </button>
        <button className="btn" type="button" onClick={handleDiscard}>
          Descartar cambios
        </button>
        <button className="btn btn-danger" type="button" onClick={handleReset}>
          Restablecer menú original
        </button>
      </div>
      </fieldset>
    </section>
  );
}
