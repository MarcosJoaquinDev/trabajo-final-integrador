import { Link } from "react-router";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import "./Header.css";

export default function Header({
  links,
  cta = { href: "#contacto", label: "Inscribite" },
  logoHref = "#inicio",
}) {
  return (
    <header className="home-header">
      <div className="container header-inner">
        <Logo href={logoHref} />

        <nav className="home-nav" aria-label="Secciones">
          {links.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <Link className="header-login" to="/login">
          Iniciar sesión
        </Link>

        <Button href={cta.href} className="header-cta">
          {cta.label}
        </Button>
      </div>
    </header>
  );
}
