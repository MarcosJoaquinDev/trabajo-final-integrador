import "../theme.css";
import "./Home.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Activities from "../components/Activities";
import Teaching from "../components/Teaching";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const navLinks = [
  { href: "#actividades", label: "Actividades" },
  { href: "/about", label: "Nosotros" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
];

export default function Home() {
  return (
    <div className="home">
      <Header links={navLinks} />

      <main>
        <Hero />
        <Activities />
        <Teaching />
        <Contact />
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
