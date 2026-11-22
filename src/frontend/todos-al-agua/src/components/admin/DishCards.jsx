import DishFields from "./DishFields";

export default function DishCards({ items, onChange, onSizeChange, onRemove }) {
  if (!items.length) {
    return <p className="admin-empty">Esta categoría todavía no tiene platos.</p>;
  }

  return (
    <div className="admin-dish-cards">
      {items.map((item, index) => (
        <article className="admin-dish-card" key={index}>
          <DishFields
            item={item}
            index={index}
            withLabels
            onChange={(patch) => onChange(index, patch)}
            onSizeChange={(size, value) => onSizeChange(index, size, value)}
          >
            {({ name, desc, price }) => (
              <>
                <div className="admin-dish-card-head">
                  {name}
                  <button
                    className="admin-icon-btn"
                    type="button"
                    title="Eliminar plato"
                    aria-label={`Eliminar ${item.nombre}`}
                    onClick={() => onRemove(index)}
                  >
                    ×
                  </button>
                </div>
                {desc}
                <div className="admin-dish-card-price">{price}</div>
              </>
            )}
          </DishFields>
        </article>
      ))}
    </div>
  );
}
