import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { visibleCta, visibleNavLinks } from "../utils/navLinks";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import "./Header.css";

export default function Header({
  links,
  cta = { href: "#contacto", label: "Inscribite" },
  logoHref = "#inicio",
}) {
  const { user, hasPermission, logout } = useAuth();
  const visibleLinks = visibleNavLinks(
    links,
    user,
    hasPermission("acceso_admin"),
  );
  const headerCta = visibleCta(cta, user);

  return (
    <header className="home-header">
      <div className="container header-inner">
        <Logo href={logoHref} />

        <nav className="home-nav" aria-label="Secciones">
          {visibleLinks.map((link) =>
            link.href.startsWith("/") ? (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  isActive ? "is-active" : undefined
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        {user ? (
          <button
            className="header-login header-logout"
            type="button"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        ) : (
          <NavLink className="header-login" to="/login">
            Iniciar sesión
          </NavLink>
        )}

        <Button href={headerCta.href} className="header-cta">
          {headerCta.label}
        </Button>
      </div>
    </header>
  );
}
