import { featuredItems } from "../data/huerta";
import ActivityCard from "../ui/ActivityCard";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import { BasketIcon, LeafIcon, SproutIcon, StoreIcon } from "../ui/icons";
import "./HuertaHighlights.css";

const highlightIcons = {
  "Vivero y plantines": <SproutIcon />,
  "Huerta orgánica": <LeafIcon />,
  "Talleres y visitas": <BasketIcon />,
  "Puntos de venta": <StoreIcon />,
};

export default function HuertaHighlights() {
  return (
    <section className="section huerta-highlights" id="inicio">
      <div className="container">
        <div className="huerta-intro">
          <Eyebrow light dot>
            Huerta · Todos al Agua
          </Eyebrow>
          <h1 className="huerta-intro-title">Cultivamos comunidad</h1>
          <p className="huerta-intro-text">
            Un espacio para producir, aprender y compartir. En nuestra huerta y
            vivero cultivamos alimentos, plantines y saberes junto a la
            comunidad de Necochea.
          </p>
          <Button href="#productos" variant="light">
            Ver productos
          </Button>
        </div>

        <div className="huerta-highlight-grid">
          {featuredItems.map((item) => (
            <ActivityCard
              key={item.categoria}
              title={item.title}
              description={item.description}
              tag={item.tag}
              tone={item.tone}
              icon={highlightIcons[item.categoria]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
