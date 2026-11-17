import ContactDetails from "../ui/ContactDetails";
import Eyebrow from "../ui/Eyebrow";
import { ClockIcon, MailIcon, PinIcon } from "../ui/icons";
import "./Contact.css";

const contactItems = [
  {
    icon: PinIcon,
    label: "Ubicación",
    value: "Necochea, Buenos Aires",
  },
  {
    icon: MailIcon,
    label: "Consultas",
    value: "hola@todosalagua.com.ar",
  },
  {
    icon: ClockIcon,
    label: "Respuesta",
    value: "Dentro de las 48 hs",
  },
];

export default function HuertaContact() {
  return (
    <section className="section contact-section" id="contacto">
      <div className="container">
        <div className="contact-card">
          <div className="contact-copy">
            <Eyebrow light>Contacto</Eyebrow>
            <h2 className="text-subtitle contact-title">
              ¿Querés visitar la huerta o hacer una consulta?
            </h2>
            <p className="text-body contact-text">
              Escribinos para coordinar visitas, sumarte a talleres, participar
              como voluntario o consultar por plantines y productos disponibles.
            </p>
          </div>

          <ContactDetails
            items={contactItems}
            action={{
              href: "mailto:hola@todosalagua.com.ar",
              label: "Hacer una consulta",
            }}
            note="También podés acercarte a la cantina de Todos al Agua para consultar por plantines."
          />
        </div>
      </div>
    </section>
  );
}
