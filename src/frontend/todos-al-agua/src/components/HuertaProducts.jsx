import { categories } from "../data/huerta";
import { formatPrice } from "../utils/formatPrice";
import SectionHeading from "../ui/SectionHeading";
import "./HuertaProducts.css";

export default function HuertaProducts() {
  return (
    <section className="section section--soft" id="productos">
      <div className="container">
        <SectionHeading
          eyebrow="Productos"
          title="Lo que cultivamos y compartimos"
          description="Precios de referencia, sujetos a disponibilidad y temporada. Consultanos por stock y cosechas del día."
        />

        <div className="huerta-grid">
          {categories.map((category) => (
            <article className="huerta-category" key={category.categoria}>
              <h3>{category.categoria}</h3>

              <ul className="huerta-items">
                {category.items.map((item) => (
                  <li className="huerta-item" key={item.nombre}>
                    <div className="huerta-item-info">
                      <p className="huerta-item-name">{item.nombre}</p>
                      {item.descripcion && (
                        <p className="huerta-item-desc">{item.descripcion}</p>
                      )}
                    </div>

                    <span className="huerta-item-price">
                      {formatPrice(item.precio)}
                    </span>
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
