import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import FeatureList from "../ui/FeatureList";
import ScheduleCard from "../ui/ScheduleCard";
import "./Teaching.css";

const features = [
  "Cultivos y plantines producidos con prácticas agroecológicas.",
  "Talleres y recorridos para aprender sobre huerta y ambiente.",
  "Venta de plantines y cosechas en la cantina y ferias locales.",
];

const schedule = [
  { label: "Visitas", value: "Con coordinación previa" },
  { label: "Talleres", value: "Sábados por la mañana" },
  { label: "Plantines", value: "Disponibles en la cantina" },
];

export default function HuertaInfo() {
  return (
    <section className="section" id="nosotros">
      <div className="container split">
        <div className="split-copy">
          <Eyebrow>Nuestra huerta</Eyebrow>
          <h2 className="text-subtitle">
            Un espacio para aprender y producir juntos
          </h2>
          <p className="text-body">
            La huerta de Todos al Agua es un lugar de encuentro donde cultivamos
            alimentos, compartimos saberes y fortalecemos lazos con la comunidad
            de Necochea.
          </p>

          <FeatureList items={features} />

          <Button href="#productos">Ver productos</Button>
        </div>

        <ScheduleCard
          id="horarios"
          kicker="Visitas y talleres"
          title="Cómo participar de la huerta"
          schedule={schedule}
          note="Consultanos por disponibilidad de plantines, próximas cosechas y fechas de talleres."
          action={{ href: "#contacto", label: "Consultar visita" }}
        />
      </div>
    </section>
  );
}
