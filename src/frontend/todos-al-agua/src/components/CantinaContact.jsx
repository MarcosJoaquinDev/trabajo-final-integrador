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
    label: "Pedidos",
    value: "hola@todosalagua.com.ar",
  },
  {
    icon: ClockIcon,
    label: "Respuesta",
    value: "Dentro de las 48 hs",
  },
];

export default function CantinaContact() {
  return (
    <section className="section contact-section" id="contacto">
      <div className="container">
        <div className="contact-card">
          <div className="contact-copy">
            <Eyebrow light>Pedidos</Eyebrow>
            <h2 className="text-subtitle contact-title">
              ¿Te quedaste con ganas de probar algo?
            </h2>
            <p className="text-body contact-text">
              Consultanos por el menú del día, las opciones sin TACC y los
              pedidos para llevar. Te respondemos a la brevedad.
            </p>
          </div>

          <ContactDetails
            items={contactItems}
            action={{
              href: "mailto:hola@todosalagua.com.ar",
              label: "Hacer un pedido",
            }}
            note="También podés acercarte a El Muelle y consultar por la carta del día."
          />
        </div>
      </div>
    </section>
  );
}
