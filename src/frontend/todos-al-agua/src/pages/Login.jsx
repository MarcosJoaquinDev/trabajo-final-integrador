import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "../theme.css";
import "./Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cantina", label: "Cantina" },
  { href: "/huerta", label: "Huerta" },
];

function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ingresá un email válido.";
  }

  if (!values.password) {
    errors.password = "Ingresá tu contraseña.";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const registered = location.state?.registered;
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    navigate("/");
  }

  return (
    <div className="login">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "/registro", label: "Registrarse" }}
      />

      <main className="login-main">
        <div className="container login-layout">
          <section className="login-intro" aria-labelledby="login-intro-title">
            <Logo />

            <p className="login-eyebrow">Todos al Agua Necochea</p>
            <h1 id="login-intro-title" className="text-title">
              Tu cuenta, tu lugar
            </h1>
            <p className="login-intro-copy">
              Ingresá con tu cuenta para acceder a las áreas de cantina y huerta y
              mantenerte al tanto de todo lo que pasa en la asociación.
            </p>

            <ul className="login-benefits">
              <li>Consultá la carta y los horarios del Muelle Cantina.</li>
              <li>Enterate de las actividades de Flor de Pan.</li>
              <li>Accedé a los espacios según tus permisos.</li>
            </ul>
          </section>

          <section className="login-card" aria-labelledby="login-card-title">
            <h2 id="login-card-title">Iniciá sesión</h2>
            <p className="login-card-subtitle">
              Ingresá tus datos para continuar.
            </p>

            {registered && (
              <p className="login-success" role="status">
                ¡Registro exitoso! Iniciá sesión con tu cuenta.
              </p>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                />
                {errors.email && (
                  <p className="login-error" id="login-email-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "login-password-error" : undefined
                  }
                />
                {errors.password && (
                  <p className="login-error" id="login-password-error" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  Recordarme
                </label>
                <Link className="login-forgot" to="/recuperar">
                  ¿Olvidé mi contraseña?
                </Link>
              </div>

              <button className="btn btn-primary btn-block" type="submit">
                Ingresar
              </button>
            </form>

            <p className="login-register">
              ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
            </p>
          </section>
        </div>
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
