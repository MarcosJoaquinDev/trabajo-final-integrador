import { Link } from "react-router";
import "../theme.css";
import "./Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/registro", label: "Registrarse" },
];

export default function AuthPlaceholder({ title, description }) {
  return (
    <div className="login">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "/", label: "Volver al inicio" }}
      />

      <main className="login-main">
        <div className="container auth-placeholder">
          <p className="login-eyebrow">Todos al Agua Necochea</p>
          <h1 className="text-title">{title}</h1>
          <p>{description}</p>
          <Link className="btn btn-primary" to="/login">
            Volver al inicio de sesión
          </Link>
        </div>
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
