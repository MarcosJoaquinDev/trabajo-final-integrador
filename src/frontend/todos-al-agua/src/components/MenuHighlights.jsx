import { featuredCategories } from "../data/cantinaMenu";
import ActivityCard from "../ui/ActivityCard";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import { FishIcon, LeafIcon, PastaIcon, PizzaIcon } from "../ui/icons";
import "./MenuHighlights.css";

const highlightIcons = {
  Pastas: <PastaIcon />,
  "De Mar": <FishIcon />,
  Pizzas: <PizzaIcon />,
  Celiacos: <LeafIcon />,
};

export default function MenuHighlights() {
  return (
    <section className="section menu-highlights" id="carta">
      <div className="container">
        <div className="menu-intro">
          <Eyebrow light dot>
            El Muelle · Cantina inclusiva
          </Eyebrow>
          <h1 className="menu-intro-title">Sabores para compartir</h1>
          <p className="menu-intro-text">
            La cantina de Todos al Agua en Necochea. Pastas caseras, pizzas al horno y opciones sin TACC en un espacio pensado
            para toda la comunidad.
          </p>
          <Button href="#menu" variant="light">
            Ver el menú completo
          </Button>
        </div>

        <div className="menu-highlight-grid">
          {featuredCategories.map((category) => (
            <ActivityCard
              key={category.categoria}
              title={category.title}
              description={category.description}
              tag={category.tag}
              tone={category.tone}
              icon={highlightIcons[category.categoria]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
