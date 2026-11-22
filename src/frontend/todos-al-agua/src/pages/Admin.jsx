import { NavLink, Outlet } from "react-router";
import "../theme.css";
import "../pages/Cantina.css";
import "./Admin.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
import { PERMISOS } from "../auth/permissions";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
];

const TABS = [
  { to: "/admin/usuarios", label: "Usuarios", permiso: PERMISOS.VER_USUARIOS },
  { to: "/admin/menu", label: "Menú", permiso: PERMISOS.EDITAR_MENU },
  { to: "/admin/huerta", label: "Huerta", permiso: PERMISOS.EDITAR_HUERTA },
  { to: "/admin/ayuda", label: "Ayuda", permiso: PERMISOS.ACCESO_ADMIN },
];

export default function Admin() {
  const { user, hasPermission } = useAuth();
  const visibleTabs = TABS.filter((tab) => hasPermission(tab.permiso));

  return (
    <div className="cantina admin-page">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "/", label: "Volver al inicio" }}
      />

      <main className="admin-main">
        <div className="container admin-layout">
          <div className="admin-heading">
            <div>
              <p className="admin-eyebrow">Todos al Agua Necochea</p>
              <h1 className="text-title">Panel de administración</h1>
              <p className="admin-subtitle">
                Sesión de <strong>{user?.email}</strong>
              </p>
            </div>
          </div>

          <nav className="admin-tabs" aria-label="Secciones del panel">
            {visibleTabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  isActive ? "admin-tab is-active" : "admin-tab"
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <div className="admin-panel">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
