import { WavesIcon } from "../ui/icons";
import "./Footer.css";

export default function Footer({ links }) {
  return (
    <footer className="home-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span>
            <WavesIcon />
          </span>
          Todos al Agua Necochea
        </p>

        <nav className="footer-nav" aria-label="Enlaces del pie">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p>© {new Date().getFullYear()} Todos al Agua</p>
      </div>
    </footer>
  );
}
