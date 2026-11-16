import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import FeatureList from "../ui/FeatureList";
import ScheduleCard from "../ui/ScheduleCard";
import "./Teaching.css";

const features = [
  "Opciones sin TACC para que nadie se quede afuera.",
  "Guarniciones a elección: fritas, ensalada o puré.",
  "Porciones abundantes para compartir en comunidad.",
];

const schedule = [
  { label: "Atención", value: "Mediodía y noche" },
  { label: "Pedidos", value: "Con anticipación" },
  { label: "Guarniciones", value: "Fritas, ensalada o puré" },
];

export default function CantinaInfo() {
  return (
    <section className="section" id="nosotros">
      <div className="container split">
        <div className="split-copy">
          <Eyebrow>Nuestra cantina</Eyebrow>
          <h2 className="text-subtitle">
            Comida casera, hecha para compartir
          </h2>
          <p className="text-body">
            El Muelle es la cantina inclusiva de Todos al Agua. Un espacio para
            encontrarse después de la pileta, almorzar en familia y descubrir
            platos pensados para toda la comunidad.
          </p>

          <FeatureList items={features} />

          <Button href="#menu">Ver el menú completo</Button>
        </div>

        <ScheduleCard
          id="horarios"
          kicker="Horarios y pedidos"
          title="Cuándo venir a El Muelle"
          schedule={schedule}
          note="Consultanos por los horarios actualizados, el menú del día y la disponibilidad de platos sin TACC."
          action={{ href: "#contacto", label: "Consultar disponibilidad" }}
        />
      </div>
    </section>
  );
}
