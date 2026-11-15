import Button from "../ui/Button";
import Logo from "../ui/Logo";
import "./Header.css";

export default function Header({ links }) {
  return (
    <header className="home-header">
      <div className="container header-inner">
        <Logo href="#inicio" />

        <nav className="home-nav" aria-label="Secciones">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#contacto" className="header-cta">
          Inscribite
        </Button>
      </div>
    </header>
  );
}
