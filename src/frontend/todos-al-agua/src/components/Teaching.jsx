import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import FeatureList from "../ui/FeatureList";
import ScheduleCard from "../ui/ScheduleCard";
import "./Teaching.css";

const features = [
  "Seguimiento personalizado en cada etapa.",
  "Clases pensadas para disfrutar y aprender sin presión.",
  "Un espacio seguro para chicos, jóvenes y adultos.",
];

const schedule = [
  { label: "Lunes a viernes", value: "Mañana y tarde" },
  { label: "Sábados", value: "Actividades especiales" },
  { label: "Niveles", value: "Inicial, intermedio y avanzado" },
];

export default function Teaching() {
  return (
    <section className="section section--soft" id="nosotros">
      <div className="container split">
        <div className="split-copy">
          <Eyebrow>Nuestra forma de enseñar</Eyebrow>
          <h2 className="text-subtitle">
            Aprender a nadar también es ganar confianza
          </h2>
          <p className="text-body">
            En Todos al Agua creemos que cada proceso es distinto. Por eso
            armamos grupos por nivel, trabajamos con objetivos claros y
            celebramos cada avance, dentro y fuera de la pileta.
          </p>

          <FeatureList items={features} />

          <Button href="#contacto">Conocé nuestra propuesta</Button>
        </div>

        <ScheduleCard
          id="horarios"
          kicker="Horarios"
          title="Elegí el turno que mejor te quede"
          schedule={schedule}
          note="Los horarios se organizan por nivel y edad. Escribinos y te contamos qué grupo te corresponde."
          action={{ href: "#contacto", label: "Consultar horarios" }}
        />
      </div>
    </section>
  );
}
