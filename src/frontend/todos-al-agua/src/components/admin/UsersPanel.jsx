import { useAuth } from "../../auth/AuthContext";
import { useUsers } from "../../data/usersContext";

const PERMISSIONS = {
  admin: ["Ver usuarios", "Editar menú", "Acceso a /admin"],
  usuario: ["Ver carta"],
};

export default function UsersPanel() {
  const { users, updateRole } = useUsers();
  const { user, logout } = useAuth();

  function handleRoleChange(id, nextRol) {
    const target = users.find((current) => current.id === id);
    updateRole(id, nextRol);

    const isCurrentUser =
      target?.email.toLowerCase() === user?.email?.toLowerCase();

    if (isCurrentUser && nextRol !== "admin") {
      logout();
    }
  }

  return (
    <section>
      <h2 className="admin-panel-title">Usuarios y permisos</h2>
      <p className="admin-panel-copy">
        Listado de cuentas de demostración. Los permisos se derivan del rol
        asignado.
      </p>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Permisos</th>
              <th>Cambiar rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((current) => {
              const isCurrentUser =
                current.email.toLowerCase() === user?.email?.toLowerCase();

              return (
                <tr key={current.id}>
                  <td>
                    {current.nombre}
                    {isCurrentUser && (
                      <span className="admin-badge" style={{ marginLeft: 8 }}>
                        Vos
                      </span>
                    )}
                  </td>
                  <td>{current.email}</td>
                  <td>
                    <span
                      className={
                        current.rol === "admin"
                          ? "admin-badge admin-badge--admin"
                          : "admin-badge"
                      }
                    >
                      {current.rol}
                    </span>
                  </td>
                  <td>
                    <ul className="admin-permissions">
                      {(PERMISSIONS[current.rol] ?? []).map((permission) => (
                        <li key={permission}>{permission}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <select
                      className="admin-select"
                      aria-label={`Rol de ${current.nombre}`}
                      value={current.rol}
                      onChange={(event) =>
                        handleRoleChange(current.id, event.target.value)
                      }
                    >
                      <option value="usuario">usuario</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="admin-note">
        Si cambiás tu propio rol a “usuario”, se cierra la sesión y volvés al
        inicio de sesión, porque ya no tenés permisos para estar en el panel.
      </p>
    </section>
  );
}
