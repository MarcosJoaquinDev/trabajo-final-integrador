import { useEffect, useMemo, useState } from "react";
import * as I from "./components/Icons.jsx";

const SECTIONS = [
  { id: "inicio", label: "Inicio", short: "Inicio", Icon: I.HomeIcon },
  { id: "acceso", label: "Acceso al panel", short: "Acceso", Icon: I.KeyIcon },
  { id: "navegacion", label: "Navegación del panel", short: "Navegación", Icon: I.CompassIcon },
  { id: "roles", label: "Roles y permisos", short: "Roles", Icon: I.ShieldIcon },
  { id: "usuarios", label: "Gestión de usuarios", short: "Usuarios", Icon: I.UsersIcon },
  { id: "menu", label: "Editor de menú", short: "Menú", Icon: I.MenuBookIcon },
  { id: "huerta", label: "Panel de huerta", short: "Huerta", Icon: I.SparkIcon },
  { id: "datos", label: "Datos y persistencia", short: "Datos", Icon: I.DatabaseIcon },
  { id: "problemas", label: "Solución de problemas", short: "Ayuda", Icon: I.LifebuoyIcon },
];

const FAQS = [
  {
    q: "Ingresé y quería ir a /admin, pero me llevaron a otra página",
    a: "Al iniciar sesión, GuestRoute te envía a tu sección inicial según tus permisos: administrador a /admin/usuarios, cantina a /admin/menu, huerta a /admin/huerta y usuario a /. Lo mismo ocurre al entrar a /admin: AdminIndex redirige a la primera sección que tu rol puede ver.",
  },
  {
    q: "Veo la pantalla “No tenés permisos para esta sección”",
    a: "Cada ruta del panel pide un permiso específico, no solo un rol. Si tu cuenta no lo tiene, ProtectedRoute te lleva a /sin-acceso y muestra la ruta que intentaste abrir. Desde ahí podés volver al inicio o cerrar sesión e ingresar con otra cuenta.",
  },
  {
    q: "No veo el enlace “Admin” en la navegación",
    a: "El enlace aparece solo para cuentas con el permiso acceso_admin: admin, cantina y huerta. Los usuarios comunes no lo ven. Si tenés un rol con acceso y tampoco aparece, cerrá sesión e ingresá de nuevo para refrescar los permisos.",
  },
  {
    q: "Mi rol tiene acceso al panel, pero veo una sola pestaña",
    a: "Es lo esperado: las pestañas de edición se filtran por permiso. El rol cantina ve “Menú”, el rol huerta ve “Huerta” y el rol admin ve las tres. “Ayuda” aparece siempre para quienes tienen acceso al panel. Los permisos son los que mandan, no el nombre del rol.",
  },
  {
    q: "Guardé el menú pero no veo los cambios en /cantina",
    a: "Los cambios se aplican al menú completo que muestra /cantina. Las tarjetas destacadas son estáticas y no se actualizan desde el panel. Confirmá que el mensaje de guardado haya sido verde (“Menú guardado. Ya se refleja en /cantina.”) y no un error de validación.",
  },
  {
    q: "Cambié mi propio rol y pasó algo raro con mi sesión",
    a: "Si pasás tu cuenta a usuario, perdés el acceso al panel y la sesión se cierra automáticamente. Si la cambiás a cantina o huerta seguís dentro, pero la sesión guardada todavía dice admin hasta que cierres e inicies sesión de nuevo: hacelo para ver tus permisos reales.",
  },
  {
    q: "Quiero editar los productos de la huerta y no encuentro cómo",
    a: "El panel /admin/huerta es un espacio reservado: hoy solo muestra un aviso de que la edición estará disponible próximamente. La página pública /huerta usa datos estáticos, así que todavía no se puede modificar desde el panel.",
  },
  {
    q: "Quiero volver a la carta original",
    a: "En el editor de menú, usá “Restablecer menú original”. Elimina la copia guardada en el navegador y recupera el menú inicial. No pide confirmación, así que usalo con cuidado.",
  },
  {
    q: "Un plato aparece como “Consultar” en lugar de un precio",
    a: "El precio quedó vacío y se guardó como null: la carta muestra “Consultar”. Cargá un número mayor o igual a cero y guardá de nuevo para que aparezca el valor.",
  },
  {
    q: "Se me perdió la sesión al cerrar el navegador",
    a: "La sesión se guarda en localStorage, así que normalmente se conserva. Si limpiaste los datos del sitio o cambiaste de navegador, iniciá sesión otra vez. La contraseña es simulada y el casillero “Recordarme” no cambia la persistencia.",
  },
];

function useCopy() {
  const [copied, setCopied] = useState("");

  function copy(value, key) {
    const done = () => {
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(done);
    } else {
      done();
    }
  }

  return { copied, copy };
}

function CopyValue({ value, label = value, copyKey }) {
  const { copied, copy } = useCopy();
  const active = copied === copyKey;
  return (
    <button
      className="copy-value"
      type="button"
      onClick={() => copy(value, copyKey)}
      title={`Copiar ${label}`}
    >
      <code>{label}</code>
      {active ? <I.CheckIcon size={14} /> : <I.CopyIcon size={14} />}
      <span className="sr-only">{active ? "Copiado" : "Copiar"}</span>
    </button>
  );
}

function Callout({ tone = "info", icon: Icon = I.InfoIcon, title, children }) {
  return (
    <div className={`callout callout--${tone}`}>
      <span className="callout-icon">
        <Icon size={18} />
      </span>
      <div>
        {title && <strong className="callout-title">{title}</strong>}
        <div className="callout-body">{children}</div>
      </div>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <li className="step">
      <span className="step-number">{number}</span>
      <div>
        <strong className="step-title">{title}</strong>
        <div className="step-body">{children}</div>
      </div>
    </li>
  );
}

function Section({ id, index, eyebrow, title, lead, children }) {
  return (
    <section id={id} className="guide-section">
      <header className="section-head">
        <p className="eyebrow">
          <span className="eyebrow-dot" /> {eyebrow}
        </p>
        <h2>
          <span className="section-index">{index}</span> {title}
        </h2>
        {lead && <p className="section-lead">{lead}</p>}
      </header>
      <div className="section-content">{children}</div>
    </section>
  );
}

function Card({ icon: Icon, title, children, tone = "default" }) {
  return (
    <div className={`info-card info-card--${tone}`}>
      {Icon && (
        <span className="info-card-icon">
          <Icon size={20} />
        </span>
      )}
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function DataTable({ head, rows }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {head.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("inicio");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(
      (section) =>
        section.label.toLowerCase().includes(q) ||
        section.short.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + 150;
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = section.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLabel =
    SECTIONS.find((section) => section.id === active)?.label ?? "Inicio";

  return (
    <div className="guide-page">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#inicio">
            <span className="brand-mark">
              <I.WavesIcon size={22} />
            </span>
            <span className="brand-text">
              <strong>Todos al Agua</strong>
              <small>Necochea</small>
            </span>
          </a>
          <span className="topbar-divider" aria-hidden="true" />
          <span className="topbar-title">Guía de administración</span>
          <div className="topbar-actions">
            <span className="topbar-badge">
              <I.ShieldIcon size={14} /> Acceso por rol
            </span>
            <button className="btn-ghost" type="button" onClick={() => window.print()}>
              <I.PrintIcon size={16} /> Imprimir
            </button>
          </div>
        </div>
      </header>

      <div className="guide-layout">
        <aside className="guide-sidebar">
          <div className="sidebar-inner">
            <p className="sidebar-label">En esta guía</p>
            <label className="sidebar-search">
              <I.SearchIcon size={16} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar sección…"
                aria-label="Buscar sección de la guía"
              />
            </label>
            <nav aria-label="Índice de la guía">
              <ul className="toc">
                {filteredSections.map(({ id, label, short, Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={active === id ? "toc-link is-active" : "toc-link"}
                      aria-current={active === id ? "location" : undefined}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                      <small>{short}</small>
                    </a>
                  </li>
                ))}
              </ul>
              {filteredSections.length === 0 && (
                <p className="toc-empty">No hay secciones para “{query}”.</p>
              )}
            </nav>
            <div className="sidebar-foot">
              <p className="sidebar-foot-label">Estás leyendo</p>
              <strong>{activeLabel}</strong>
              <p className="sidebar-foot-note">
                Documentación del panel <code>/admin</code>
              </p>
            </div>
          </div>
        </aside>

        <main className="guide-main">
          <section id="inicio" className="hero">
            <div className="hero-art" aria-hidden="true">
              <span className="hero-ring hero-ring--one" />
              <span className="hero-ring hero-ring--two" />
              <I.WavesIcon size={140} />
            </div>
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-dot" /> Documentación interna · Todos al Agua Necochea
            </p>
            <h1 className="text-title">Guía del usuario administrador</h1>
            <p className="hero-lead">
              Todo lo que necesitás saber para ingresar al panel, entender tu rol,
              administrar usuarios y mantener actualizada la carta de{" "}
              <strong>El Muelle – Cantina Inclusiva</strong>.
            </p>
            <div className="hero-meta">
              <span>
                <I.ShieldIcon size={16} /> Roles: <b>admin · cantina · huerta</b>
              </span>
              <span>
                <I.CompassIcon size={16} /> Ruta: <CopyValue value="/admin" copyKey="route" />
              </span>
              <span>
                <I.ClockIcon size={16} /> Lectura: ~10 min
              </span>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#acceso">
                Empezar <I.ArrowRightIcon size={16} />
              </a>
              <button className="btn btn-outline" type="button" onClick={() => window.print()}>
                <I.PrintIcon size={16} /> Guardar como PDF
              </button>
            </div>
          </section>

          <div className="quickstart">
            <div className="quickstart-head">
              <span className="quickstart-badge">
                <I.SparkIcon size={14} /> Inicio rápido
              </span>
              <h2>Tres pasos para arrancar</h2>
            </div>
            <div className="quickstart-grid">
              <Card icon={I.KeyIcon} title="1. Ingresá">
                Usá una cuenta con permiso de panel y entrá con cualquier contraseña de 6+ caracteres.
              </Card>
              <Card icon={I.CompassIcon} title="2. Según tu rol">
                Te llevamos a tu primera sección: usuarios, menú o huerta. Solo ves lo que podés editar.
              </Card>
              <Card icon={I.SaveIcon} title="3. Guardá y verificá">
                Confirmá los cambios y mirá el resultado en la carta pública de /cantina.
              </Card>
            </div>
          </div>

          <Section
            id="acceso"
            index="01"
            eyebrow="Primeros pasos"
            title="Acceso al panel"
            lead="Para entrar al panel hace falta una sesión iniciada y un rol con el permiso acceso_admin."
          >
            <Card icon={I.LockIcon} title="Cuentas de demostración" tone="soft">
              <p>
                Estas cuentas cubren los tres roles con acceso al panel. La contraseña es
                simulada: sirve cualquier texto de <strong>6 caracteres o más</strong>.
              </p>
              <DataTable
                head={["Cuenta", "Email", "Rol", "Sección inicial"]}
                rows={[
                  ["María González", <CopyValue key="m" value="admin@todosalagua.com" copyKey="mg" />, <span className="badge badge--admin">admin</span>, "/admin/usuarios"],
                  ["Muelle Cantina", <CopyValue key="c" value="cantina@todosalagua.com" copyKey="ct" />, <span className="badge">cantina</span>, "/admin/menu"],
                  ["Flor de Pan", <CopyValue key="h" value="huerta@todosalagua.com" copyKey="hu" />, <span className="badge">huerta</span>, "/admin/huerta"],
                ]}
              />
              <p>
                También hay cuentas de uso general como{" "}
                <code>carlos.ruiz@gmail.com</code> (rol <b>usuario</b>, sin acceso al panel)
                y <code>diego.martinez@gmail.com</code> (rol <b>admin</b>).
              </p>
            </Card>

            <h3 className="subheading">Cómo ingresar</h3>
            <ol className="steps">
              <Step number="1" title="Abrí el inicio de sesión">
                Entrá a <CopyValue value="/login" copyKey="login" />. Si ya iniciaste sesión,
                GuestRoute te redirige automáticamente a tu sección inicial según tus permisos.
              </Step>
              <Step number="2" title="Completá el formulario">
                Ingresá tu email y una contraseña de al menos 6 caracteres. El frontend no
                valida contraseñas contra un servidor: la autenticación es simulada.
              </Step>
              <Step number="3" title="Llegá a tu panel">
                Si entrás directo a <CopyValue value="/admin" copyKey="admin" />, el índice
                del panel te envía a la primera sección que tu rol puede ver.
              </Step>
            </ol>

            <Callout tone="info" icon={I.InfoIcon} title="Cómo se define tu rol">
              Si el email coincide con una cuenta de demostración, se usa su rol. Si no, se
              infiere por el texto: contiene “admin” → administrador, “cantina” → cantina,
              “huerta” → huerta; en cualquier otro caso → usuario. El orden importa: un email
              con “admin” y “cantina” se resuelve como administrador.
            </Callout>
            <Callout tone="danger" icon={I.AlertIcon} title="Sin sesión o sin permiso">
              Sin sesión, cualquier ruta del panel te lleva a <code>/login</code>. Con sesión
              pero sin el permiso de la ruta, te lleva a <code>/sin-acceso</code>, donde se
              explica qué sección intentaste abrir y podés cerrar sesión para usar otra cuenta.
            </Callout>
          </Section>

          <Section
            id="navegacion"
            index="02"
            eyebrow="Interfaz"
            title="Navegación del panel"
            lead="El panel comparte el estilo de la cantina y adapta su menú a los permisos de tu cuenta."
          >
            <DataTable
              head={["Elemento", "Dónde está", "Para qué sirve"]}
              rows={[
                ["Encabezado", "Arriba del panel", "Muestra “Sesión de <tu email>” para confirmar la cuenta activa."],
                ["Cerrar sesión", "Barra superior (escritorio y móvil)", "Finaliza la sesión y te devuelve al inicio de sesión."],
                ["Pestañas", "Debajo del encabezado", "Usuarios, Menú y Huerta según permisos; Ayuda está siempre disponible para quienes pueden entrar al panel."],
                ["Volver al inicio", "Botón de la barra superior", "Te lleva a la página principal del sitio."],
                ["Enlace “Admin”", "Navegación y pie de página", "Visible solo para roles con acceso_admin."],
              ]}
            />
            <div className="two-columns">
              <Card icon={I.UsersIcon} title="Pestaña Usuarios">
                Requiere <code>ver_usuarios</code>. Ruta: <code>/admin/usuarios</code>.
              </Card>
              <Card icon={I.MenuBookIcon} title="Pestaña Menú">
                Requiere <code>editar_menu</code>. Ruta: <code>/admin/menu</code>.
              </Card>
              <Card icon={I.LifebuoyIcon} title="Pestaña Ayuda" tone="soft">
                Disponible para todo rol con <code>acceso_admin</code>. Ruta:{" "}
                <code>/admin/ayuda</code>; abre esta guía en una pestaña nueva.
              </Card>
            </div>
            <Callout tone="info" icon={I.InfoIcon} title="Diseño adaptable">
              En pantallas chicas (640 px o menos), las tablas de usuarios y platos se
              reemplazan por tarjetas con los mismos datos y controles. Es un cambio visual
              automático, no un selector de vista.
            </Callout>
          </Section>

          <Section
            id="roles"
            index="03"
            eyebrow="Seguridad"
            title="Roles y permisos"
            lead="Hay cuatro roles y cinco permisos. El acceso se decide por permiso, no por el nombre del rol."
          >
            <DataTable
              head={["Rol", "Permisos", "Sección inicial"]}
              rows={[
                [
                  <span className="badge badge--admin">admin</span>,
                  "Acceso al panel · Ver usuarios · Editar menú de cantina · Editar huerta · Cambiar roles",
                  <code>/admin/usuarios</code>,
                ],
                [
                  <span className="badge">cantina</span>,
                  "Acceso al panel · Editar menú de cantina",
                  <code>/admin/menu</code>,
                ],
                [
                  <span className="badge">huerta</span>,
                  "Acceso al panel · Editar huerta",
                  <code>/admin/huerta</code>,
                ],
                [
                  <span className="badge">usuario</span>,
                  "Sin permisos de panel",
                  <code>/</code>,
                ],
              ]}
            />
            <h3 className="subheading">Permisos disponibles</h3>
            <DataTable
              head={["Permiso", "Etiqueta en el panel", "Quién lo tiene"]}
              rows={[
                ["acceso_admin", "Acceso al panel", "admin, cantina y huerta"],
                ["ver_usuarios", "Ver usuarios", "admin"],
                ["editar_menu", "Editar menú de cantina", "admin y cantina"],
                ["editar_huerta", "Editar huerta", "admin y huerta"],
                ["editar_roles", "Cambiar roles", "admin"],
              ]}
            />
            <Callout tone="info" icon={I.InfoIcon} title="Permisos, no roles">
              Cada ruta pide un permiso concreto. Por eso una cuenta <b>cantina</b> puede
              entrar al panel y editar el menú, pero no ver usuarios ni tocar la huerta. El
              botón “Cerrar sesión” está en la barra superior para todos los roles.
            </Callout>
          </Section>

          <Section
            id="usuarios"
            index="04"
            eyebrow="Cuentas"
            title="Gestión de usuarios"
            lead="Solo el rol admin puede ver esta sección y cambiar roles; los demás no la ven ni pueden acceder por URL."
          >
            <h3 className="subheading">Cambiar el rol de un usuario</h3>
            <ol className="steps">
              <Step number="1" title="Entrá a /admin/usuarios">
                Verás “Usuarios y permisos”: cada rol define a qué secciones puede acceder
                dentro del panel.
              </Step>
              <Step number="2" title="Revisá la tabla">
                Columnas: Nombre, Email, Rol, Permisos y Cambiar rol. Tu cuenta se marca
                con la etiqueta <b>Vos</b>. Los permisos se muestran con sus etiquetas; si
                el rol no tiene ninguno, aparece “Sin permisos de panel”.
              </Step>
              <Step number="3" title="Elegí el nuevo rol">
                El desplegable ofrece <code>admin</code>, <code>cantina</code>,{" "}
                <code>huerta</code> y <code>usuario</code>. Si tu cuenta no tiene el permiso
                <code>editar_roles</code>, verás “Sin permiso” en lugar del desplegable.
              </Step>
              <Step number="4" title="El cambio se aplica ya">
                Se guarda en el navegador sin botón de guardar. No hay confirmación ni opción
                de deshacer.
              </Step>
            </ol>

            <Callout tone="danger" icon={I.AlertIcon} title="Cuidado al cambiar tu propio rol">
              Si te pasás a <b>usuario</b>, perdés el acceso al panel y la sesión se cierra
              automáticamente. Si te pasás a <b>cantina</b> o <b>huerta</b> seguís dentro,
              pero la sesión sigue guardada como <b>admin</b> hasta que cierres e inicies
              sesión de nuevo: hacelo para que tus permisos reales se reflejen en la interfaz.
            </Callout>
            <Callout tone="warning" icon={I.InfoIcon} title="Alcance del panel">
              Las cuentas son de demostración. No se pueden crear ni eliminar usuarios desde
              aquí, y el registro público no agrega cuentas a este listado.
            </Callout>
          </Section>

          <Section
            id="menu"
            index="05"
            eyebrow="Contenido"
            title="Editor de menú"
            lead="Disponible para admin y cantina. Al guardar, los cambios se ven en la carta completa de /cantina."
          >
            <div className="two-columns">
              <Card icon={I.MenuBookIcon} title="Panel de categorías">
                Lista lateral con el nombre y la cantidad de platos. La categoría activa se
                resalta y se desplaza para que siempre quede visible.
              </Card>
              <Card icon={I.SaveIcon} title="Panel de edición">
                Datos de la categoría y tabla de platos con nombre, descripción, promoción
                y precio. El encabezado indica cuántas categorías y platos hay.
              </Card>
            </div>

            <h3 className="subheading">Campos editables</h3>
            <DataTable
              head={["Campo", "Descripción", "Observaciones"]}
              rows={[
                ["Nombre de la categoría", "Título que agrupa los platos.", "Obligatorio."],
                ["Nota (opcional)", "Ej.: “Todo con Fritas, Ensalada o Puré”.", "Se muestra como nota de guarnición."],
                ["Nombre del plato", "Nombre del producto.", "Obligatorio."],
                ["Descripción / promoción", "Texto de cada plato.", "Opcionales."],
                ["Precio", "Valor único o precios Chica / Grande.", "Número ≥ 0. Vacío = “Consultar”."],
              ]}
            />

            <h3 className="subheading">Botones y acciones</h3>
            <DataTable
              head={["Botón", "Qué hace"]}
              rows={[
                ["Agregar categoría", "Añade una categoría vacía y la deja seleccionada."],
                ["Agregar plato", "Agrega un plato nuevo a la categoría elegida."],
                ["Guardar cambios", "Valida y guarda la carta. Muestra un mensaje verde al terminar."],
                ["Descartar cambios", "Vuelve al último estado guardado, sin confirmación."],
                ["Restablecer menú original", "Borra la copia local y recupera el menú inicial, sin confirmación."],
                ["Eliminar categoría / plato", "Quita el elemento seleccionado. Botón rojo."],
              ]}
            />

            <Callout tone="success" icon={I.CheckCircleIcon} title="Guardado correcto">
              Al guardar verás: “Menú guardado. Ya se refleja en /cantina.” Los mensajes
              rojos indican errores de validación: revisá nombres y precios antes de seguir.
            </Callout>
            <Callout tone="warning" icon={I.InfoIcon} title="Validación y destacados">
              Todas las categorías y platos deben tener nombre, y los precios deben ser
              números válidos mayores o iguales a cero. Las tarjetas destacadas de la
              cantina son estáticas y no cambian con la edición.
            </Callout>
          </Section>

          <Section
            id="huerta"
            index="06"
            eyebrow="Próximamente"
            title="Panel de huerta"
            lead="Una sección nueva, reservada para los roles con permiso editar_huerta."
          >
            <Card icon={I.SparkIcon} title="Estado actual" tone="soft">
              En <code>/admin/huerta</code> verás el mensaje: “Este espacio está reservado
              para administrar los productos y precios de la huerta.” La edición estará
              disponible próximamente.
            </Card>
            <ul className="steps">
              <Step number="1" title="Quién puede entrar">
                El rol <b>huerta</b> llega acá directamente después de iniciar sesión; el
                rol <b>admin</b> accede desde la pestaña “Huerta”. Los demás roles no ven
                la pestaña y son redirigidos a <code>/sin-acceso</code>.
              </Step>
              <Step number="2" title="Qué se puede hacer hoy">
                Solo consultar el aviso. Todavía no hay productos, precios ni formularios
                editables, y la página pública <code>/huerta</code> usa datos estáticos.
              </Step>
            </ul>
          </Section>

          <Section
            id="datos"
            index="07"
            eyebrow="Funcionamiento"
            title="Datos y persistencia"
            lead="El panel funciona sin servidor: la sesión y los cambios viven en tu navegador."
          >
            <DataTable
              head={["Clave en localStorage", "Qué guarda"]}
              rows={[
                [<code>todos-al-agua.auth</code>, "La sesión iniciada, con el rol resuelto al ingresar."],
                [<code>todos-al-agua.users</code>, "Las cuentas y sus roles (7 cuentas de ejemplo)."],
                [<code>todos-al-agua.menu</code>, "La copia editada de la carta de la cantina."],
              ]}
            />
            <Callout tone="info" icon={I.DatabaseIcon} title="Sin sincronización">
              Los cambios son locales a este navegador y no se comparten entre usuarios. No
              hay backend, no se verifican contraseñas y limpiar los datos del sitio
              restaura la sesión, los roles y el menú originales. La huerta no guarda datos:
              sus productos son un módulo estático.
            </Callout>
            <p className="section-note">
              El menú original se toma de <code>src/data/menu.json</code> (una copia de
              <code> backend/repositories/data.json</code>) y se recupera con “Restablecer
              menú original”.
            </p>
          </Section>

          <Section
            id="problemas"
            index="08"
            eyebrow="Soporte"
            title="Solución de problemas"
            lead="Respuestas rápidas a las dudas más frecuentes. Tocá una pregunta para ver la respuesta."
          >
            <div className="faq-list">
              {FAQS.map((item, index) => (
                <div
                  key={item.q}
                  className={openFaq === index ? "faq-item is-open" : "faq-item"}
                >
                  <h3>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    >
                      <span>{item.q}</span>
                      <I.ChevronDownIcon size={18} />
                    </button>
                  </h3>
                  <div id={`faq-panel-${index}`} className="faq-answer" hidden={openFaq !== index}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>

      <footer className="guide-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-mark brand-mark--small">
              <I.WavesIcon size={18} />
            </span>
            <div>
              <strong>Todos al Agua Necochea</strong>
              <span>Guía de usuario administrador</span>
            </div>
          </div>
          <p>
            Documentación complementaria del frontend. Los datos del panel son de
            demostración y se guardan solo en tu navegador.
          </p>
        </div>
      </footer>
    </div>
  );
}
