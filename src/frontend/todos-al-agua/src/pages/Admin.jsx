import { NavLink, Outlet } from "react-router";
import "../theme.css";
import "../pages/Cantina.css";
import "./Admin.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
];

export default function Admin() {
  const { user, logout } = useAuth();

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
            <button className="btn btn-primary" type="button" onClick={logout}>
              Cerrar sesión
            </button>
          </div>

          <nav className="admin-tabs" aria-label="Secciones del panel">
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                isActive ? "admin-tab is-active" : "admin-tab"
              }
            >
              Usuarios
            </NavLink>
            <NavLink
              to="/admin/menu"
              className={({ isActive }) =>
                isActive ? "admin-tab is-active" : "admin-tab"
              }
            >
              Menú
            </NavLink>
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
