export default function HuertaPanel() {
  return (
    <section>
      <h2 className="admin-panel-title">Huerta</h2>
      <p className="admin-panel-copy">
        Este espacio está reservado para administrar los productos y precios de
        la huerta.
      </p>
      <p className="admin-note">
        La edición de la huerta estará disponible próximamente. Por ahora tu
        cuenta tiene el permiso <code>editar_huerta</code> y puede acceder a esta
        sección.
      </p>
    </section>
  );
}
