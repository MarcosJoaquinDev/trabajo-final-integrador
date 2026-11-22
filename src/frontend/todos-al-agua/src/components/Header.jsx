import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { visibleCta, visibleNavLinks } from "../utils/navLinks";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import "./Header.css";

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5 5 19" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function Header({
  links,
  cta = { href: "#contacto", label: "Inscribite" },
  logoHref = "#inicio",
}) {
  const { user, hasPermission, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleLinks = visibleNavLinks(
    links,
    user,
    hasPermission("acceso_admin"),
  );
  const headerCta = visibleCta(cta, user);

  function handleLogout() {
    setMenuOpen(false);
    logout();
  }

  function renderLink(link) {
    return link.href.startsWith("/") ? (
      <NavLink
        key={link.href}
        to={link.href}
        end={link.href === "/"}
        className={({ isActive }) => (isActive ? "is-active" : undefined)}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </NavLink>
    ) : (
      <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
        {link.label}
      </a>
    );
  }

  const linkItems = visibleLinks.map(renderLink);
  const mobileLinks = visibleLinks
    .filter((link) => !["/login", "/registro"].includes(link.href))
    .map(renderLink);

  return (
    <header className="home-header">
      <div className="container header-inner">
        <Logo href={logoHref} />

        <nav className="home-nav" aria-label="Secciones">
          {linkItems}
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

        <button
          className="header-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="header-mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <nav
        id="header-mobile-menu"
        className={`header-mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Navegación móvil"
        hidden={!menuOpen}
      >
        <div className="container header-mobile-inner">
          {mobileLinks}
          {user ? (
            <button className="header-mobile-logout" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              className="header-mobile-login"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </NavLink>
          )}
          <Button href={headerCta.href} className="header-mobile-cta">
            {headerCta.label}
          </Button>
        </div>
      </nav>
    </header>
  );
}
