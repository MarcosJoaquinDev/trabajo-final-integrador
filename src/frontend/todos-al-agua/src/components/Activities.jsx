import ActivityCard from "../ui/ActivityCard";
import SectionHeading from "../ui/SectionHeading";
import {
  AdultSwimIcon,
  AquagymIcon,
  ChildSwimIcon,
  TrainingIcon,
} from "../ui/icons";
import "./Activities.css";

const activities = [
  {
    title: "Natación infantil",
    description:
      "Juegos, confianza y técnica para que los chicos disfruten del agua desde el primer día.",
    tag: "Desde 4 años",
    tone: "sky",
    icon: <ChildSwimIcon />,
  },
  {
    title: "Natación para adultos",
    description:
      "Aprendé a nadar o mejorá tu estilo en grupos por nivel, sin apuro y con seguimiento.",
    tag: "Inicial a avanzado",
    tone: "primary",
    icon: <AdultSwimIcon />,
  },
  {
    title: "Aquagym",
    description:
      "Entrenamiento de bajo impacto para moverte, tonificar y cuidar tus articulaciones.",
    tag: "Todo el año",
    tone: "sun",
    icon: <AquagymIcon />,
  },
  {
    title: "Perfeccionamiento",
    description:
      "Trabajo técnico de estilos, respiración y resistencia para nadadores que quieren más.",
    tag: "Nivel intermedio",
    tone: "coral",
    icon: <TrainingIcon />,
  },
];

export default function Activities() {
  return (
    <section className="section" id="actividades">
      <div className="container">
        <SectionHeading
          eyebrow="Nuestras actividades"
          title="Encontrá tu lugar en el agua"
          description="Desde los primeros chapuzones hasta el entrenamiento técnico: elegí la propuesta que mejor se adapte a vos."
        />

        <div className="activity-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
