import { useAuth } from "../../auth/AuthContext";
import { PERMISOS } from "../../auth/permissions";
import CategorySidebar from "./CategorySidebar";
import DishTable from "./DishTable";
import DishCards from "./DishCards";
import useMenuEditor from "./useMenuEditor";

export default function MenuPanel() {
  const { hasPermission } = useAuth();
  const puedeEditar = hasPermission(PERMISOS.EDITAR_MENU);
  const {
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
  } = useMenuEditor();

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
          <CategorySidebar
            categories={draft}
            selectedIndex={selectedIndex}
            scrollRef={categoryScrollRef}
            activeButtonRef={activeButtonRef}
            onSelect={setActiveCategory}
          />

          <div className="admin-category-editor">
            {selected ? (
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
                    Platos{" "}
                    <span className="admin-count">{selected.items?.length ?? 0}</span>
                  </h3>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => addItem(selectedIndex)}
                  >
                    Agregar plato
                  </button>
                </div>

                <DishTable
                  items={selected.items ?? []}
                  onChange={(index, patch) => updateItem(selectedIndex, index, patch)}
                  onSizeChange={(index, size, value) =>
                    updateSize(selectedIndex, index, size, value)
                  }
                  onRemove={(index) => removeItem(selectedIndex, index)}
                />

                <DishCards
                  items={selected.items ?? []}
                  onChange={(index, patch) => updateItem(selectedIndex, index, patch)}
                  onSizeChange={(index, size, value) =>
                    updateSize(selectedIndex, index, size, value)
                  }
                  onRemove={(index) => removeItem(selectedIndex, index)}
                />
              </>
            ) : (
              <p className="admin-empty">
                Agregá una categoría para empezar a editar.
              </p>
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
