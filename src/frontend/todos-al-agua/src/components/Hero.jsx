import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import HeroArt from "../ui/HeroArt";
import WaveDivider from "../ui/WaveDivider";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-inner">
        <div className="hero-copy">
          <Eyebrow light dot>
            Escuela de natación en Necochea
          </Eyebrow>
          <h1 className="text-title hero-title">Todos al Agua</h1>
          <p className="text-subtitle hero-subtitle">
            Un lugar para aprender, entrenar y disfrutar del agua.
          </p>
          <p className="text-body hero-text">
            Clases de natación para niños, jóvenes y adultos en un ambiente
            cuidado, con grupos por nivel y docentes que te acompañan desde el
            primer día.
          </p>

          <div className="hero-actions">
            <Button href="#contacto" variant="light">
              Quiero inscribirme
            </Button>
            <Button href="#actividades" variant="outline">
              Ver actividades
            </Button>
          </div>

          <ul className="hero-stats">
            <li>
              <strong>+300</strong>
              <span>alumnos en el agua</span>
            </li>
            <li>
              <strong>4</strong>
              <span>propuestas para todas las edades</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>grupos reducidos</span>
            </li>
          </ul>
        </div>

        <HeroArt />
      </div>

      <WaveDivider />
    </section>
  );
}
