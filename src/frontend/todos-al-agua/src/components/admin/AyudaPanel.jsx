import Button from "../../ui/Button";

// En desarrollo apunta al proyecto `guia-admin` (puerto 5174).
// En producción se configura con VITE_GUIA_ADMIN_URL.
const GUIA_URL = import.meta.env.VITE_GUIA_ADMIN_URL || "http://localhost:5174";

export default function AyudaPanel() {
  return (
    <section>
      <h2 className="admin-panel-title">Ayuda</h2>
      <p className="admin-panel-copy">
        La guía de administrador explica cómo ingresar al panel, qué permisos tiene
        cada rol, cómo gestionar usuarios y cómo editar la carta de la cantina.
      </p>

      <div className="admin-actions">
        <Button href={GUIA_URL} target="_blank" rel="noopener noreferrer">
          Abrir guía de administración
        </Button>
      </div>

      <p className="admin-note admin-help-note">
        La guía se abre en una pestaña nueva. Si el enlace no funciona, configurá
        la variable <code>VITE_GUIA_ADMIN_URL</code> con la URL donde esté publicada.
      </p>
    </section>
  );
}
