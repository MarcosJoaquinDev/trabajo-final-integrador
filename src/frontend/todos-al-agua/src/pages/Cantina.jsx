import "../theme.css";
import "./Cantina.css";
import Header from "../components/Header";
import MenuHighlights from "../components/MenuHighlights";
import MenuList from "../components/MenuList";
import CantinaInfo from "../components/CantinaInfo";
import CantinaContact from "../components/CantinaContact";
import Footer from "../components/Footer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/huerta", label: "Huerta" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/registro", label: "Registrarse" },
];

export default function Cantina() {
  return (
    <div className="cantina">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "#contacto", label: "Pedidos" }}
      />

      <main>
        <MenuHighlights />
        <MenuList />
        <CantinaInfo />
        <CantinaContact />
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
