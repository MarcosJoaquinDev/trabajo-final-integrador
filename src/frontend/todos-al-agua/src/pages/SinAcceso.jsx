import { Link, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthContext";
import "../theme.css";
import "../pages/Cantina.css";
import "../pages/Admin.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
];

export default function SinAcceso() {
  const location = useLocation();
  const { logout } = useAuth();
  const from = location.state?.from;

  return (
    <div className="cantina admin-page">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "/", label: "Volver al inicio" }}
      />

      <main className="admin-main">
        <div className="container">
          <div className="sin-acceso">
            <span className="admin-eyebrow">Acceso restringido</span>
            <h1 className="text-title">No tenés permisos para esta sección</h1>
            <p className="admin-panel-copy">
              {from ? (
                <>
                  Intentaste acceder a <code>{from}</code>, pero tu cuenta no
                  tiene los permisos necesarios.
                </>
              ) : (
                <>Tu cuenta no tiene los permisos necesarios para esta sección.</>
              )}
            </p>

            <div className="admin-actions">
              <Link className="btn btn-primary" to="/">
                Volver al inicio
              </Link>
              <button className="btn btn-danger" type="button" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
