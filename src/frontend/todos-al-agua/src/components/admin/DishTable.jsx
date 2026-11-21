import DishFields from "./DishFields";

export default function DishTable({ items, onChange, onSizeChange, onRemove }) {
  return (
    <div className="admin-table-wrap admin-items-table-wrap">
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
          {items.map((item, index) => (
            <tr key={index}>
              <DishFields
                item={item}
                index={index}
                onChange={(patch) => onChange(index, patch)}
                onSizeChange={(size, value) => onSizeChange(index, size, value)}
              >
                {({ name, desc, price }) => (
                  <>
                    <td>{name}</td>
                    <td>{desc}</td>
                    <td>{price}</td>
                    <td>
                      <button
                        className="admin-icon-btn"
                        type="button"
                        title="Eliminar plato"
                        aria-label={`Eliminar ${item.nombre}`}
                        onClick={() => onRemove(index)}
                      >
                        ×
                      </button>
                    </td>
                  </>
                )}
              </DishFields>
            </tr>
          ))}

          {!items.length && (
            <tr>
              <td className="admin-empty-row" colSpan={4}>
                Esta categoría todavía no tiene platos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
