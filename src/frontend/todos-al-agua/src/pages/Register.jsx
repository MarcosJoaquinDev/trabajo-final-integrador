import { useState } from "react";
import { apiAuth } from "../api/client";
import { Link, useLocation, useNavigate } from "react-router";
import "../theme.css";
import "./Login.css";
import "./Register.css";
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

  if (!values.name.trim()) {
    errors.name = "Ingresá tu nombre y apellido.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Ingresá tu nombre completo.";
  }

  if (!values.email.trim()) {
    errors.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ingresá un email válido.";
  }

  if (!values.password) {
    errors.password = "Ingresá una contraseña.";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirmá tu contraseña.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      await apiAuth.register(form.name.trim(), form.email.trim(), form.password);
      navigate("/login", {
        state: { registered: true, from: location.state?.from },
      });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login">
      <Header
        links={navLinks}
        logoHref="/"
        cta={{ href: "/login", label: "Iniciar sesión" }}
      />

      <main className="login-main">
        <div className="container login-layout">
          <section className="login-intro" aria-labelledby="register-intro-title">
            <Logo />

            <p className="login-eyebrow">Todos al Agua Necochea</p>
            <h1 id="register-intro-title" className="text-title">
              Sumate a la comunidad
            </h1>
            <p className="login-intro-copy">
              Creá tu cuenta para ser parte de la asociación y acceder a todos los
              espacios que ofrecemos en Necochea.
            </p>

            <ul className="login-benefits">
              <li>Accedé a las áreas de cantina y huerta.</li>
              <li>Enterate de las actividades y novedades.</li>
              <li>Formá parte de Flor de Pan y el Muelle Cantina.</li>
            </ul>
          </section>

          <section className="login-card" aria-labelledby="register-card-title">
            <h2 id="register-card-title">Crear cuenta</h2>
            <p className="login-card-subtitle">
              Completá tus datos para registrarte.
            </p>

            {errors.general && (
              <p className="login-error" role="alert" style={{ marginBottom: 16 }}>
                {errors.general}
              </p>
            )}

            <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="register-name">Nombre y apellido</label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "register-name-error" : undefined}
                />
                {errors.name && (
                  <p className="login-error" id="register-name-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "register-email-error" : undefined}
                />
                {errors.email && (
                  <p className="login-error" id="register-email-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="register-password">Contraseña</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "register-password-error" : undefined
                  }
                />
                {errors.password && (
                  <p className="login-error" id="register-password-error" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="register-confirm-password">Confirmar contraseña</label>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repetí tu contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword ? "register-confirm-error" : undefined
                  }
                />
                {errors.confirmPassword && (
                  <p className="login-error" id="register-confirm-error" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                {submitting ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <p className="login-register">
              ¿Ya tenés cuenta?{" "}
              <Link to="/login" state={location.state}>
                Iniciá sesión
              </Link>
            </p>
          </section>
        </div>
      </main>

      <Footer links={navLinks} />
    </div>
  );
}
