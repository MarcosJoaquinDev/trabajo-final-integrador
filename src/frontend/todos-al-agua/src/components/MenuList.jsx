import { formatPrice, menu } from "../data/cantinaMenu";
import SectionHeading from "../ui/SectionHeading";
import "./MenuList.css";

function ItemPrice({ item }) {
  if (item.precios) {
    return (
      <span className="menu-item-price menu-item-price--sizes">
        <span>Chica {formatPrice(item.precios.chica)}</span>
        <span>Grande {formatPrice(item.precios.grande)}</span>
      </span>
    );
  }

  return (
    <span className="menu-item-price">{formatPrice(item.precio)}</span>
  );
}

export default function MenuList() {
  return (
    <section className="section section--soft" id="menu">
      <div className="container">
        <SectionHeading
          eyebrow="Menú completo"
          title="Toda la carta de El Muelle"
          description="Precios en pesos argentinos. Consultanos por disponibilidad, platos del día y opciones sin TACC."
        />

        <div className="menu-grid">
          {menu.map((category) => (
            <article className="menu-category" key={category.categoria}>
              <h3>{category.categoria}</h3>

              {category.nota_guarnicion && (
                <p className="menu-category-note">
                  {category.nota_guarnicion}
                </p>
              )}

              <ul className="menu-items">
                {category.items.map((item) => (
                  <li className="menu-item" key={item.nombre}>
                    <div className="menu-item-info">
                      <p className="menu-item-name">{item.nombre}</p>
                      {item.descripcion && (
                        <p className="menu-item-desc">{item.descripcion}</p>
                      )}
                      {item.promocion && (
                        <span className="menu-promo">{item.promocion}</span>
                      )}
                    </div>

                    <ItemPrice item={item} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
