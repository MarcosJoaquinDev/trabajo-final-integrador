import "../theme.css";
import "./Huerta.css";
import Header from "../components/Header";
import HuertaHighlights from "../components/HuertaHighlights";
import HuertaProducts from "../components/HuertaProducts";
import HuertaInfo from "../components/HuertaInfo";
import HuertaContact from "../components/HuertaContact";
import Footer from "../components/Footer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Nosotros" },
  { href: "/cantina", label: "Cantina" },
  { href: "/login", label: "Iniciar sesión" },
];

export default function Huerta() {
  return (
    <div className="huerta">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "#contacto", label: "Visitas" }}
      />

      <main>
        <HuertaHighlights />
        <HuertaProducts />
        <HuertaInfo />
        <HuertaContact />
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
