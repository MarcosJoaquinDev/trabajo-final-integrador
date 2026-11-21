import { useAuth } from "../../auth/AuthContext";
import {
  ETIQUETAS_PERMISO,
  PERMISOS,
  ROLES,
  permisosDeRol,
} from "../../auth/permissions";
import { useUsers } from "../../data/usersContext";

const ROLES_DISPONIBLES = [
  ROLES.ADMIN,
  ROLES.CANTINA,
  ROLES.HUERTA,
  ROLES.USUARIO,
];

export default function UsersPanel() {
  const { users, updateRole } = useUsers();
  const { user, hasPermission, logout } = useAuth();
  const puedeEditarRoles = hasPermission(PERMISOS.EDITAR_ROLES);

  function handleRoleChange(id, nextRol) {
    const target = users.find((current) => current.id === id);
    updateRole(id, nextRol);

    const isCurrentUser =
      target?.email.toLowerCase() === user?.email?.toLowerCase();

    if (isCurrentUser && !permisosDeRol(nextRol).includes(PERMISOS.ACCESO_ADMIN)) {
      logout();
    }
  }

  return (
    <section>
      <h2 className="admin-panel-title">Usuarios y permisos</h2>
      <p className="admin-panel-copy">
        Cada rol define a qué secciones puede acceder dentro del panel.
      </p>

      <div className="admin-table-wrap admin-table-desktop">
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
              const permisos = permisosDeRol(current.rol);

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
                        current.rol === ROLES.ADMIN
                          ? "admin-badge admin-badge--admin"
                          : "admin-badge"
                      }
                    >
                      {current.rol}
                    </span>
                  </td>
                  <td>
                    <ul className="admin-permissions">
                      {permisos.length ? (
                        permisos.map((permission) => (
                          <li key={permission}>
                            {ETIQUETAS_PERMISO[permission] ?? permission}
                          </li>
                        ))
                      ) : (
                        <li>Sin permisos de panel</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    {puedeEditarRoles ? (
                      <select
                        className="admin-select"
                        aria-label={`Rol de ${current.nombre}`}
                        value={current.rol}
                        onChange={(event) =>
                          handleRoleChange(current.id, event.target.value)
                        }
                      >
                        {ROLES_DISPONIBLES.map((rol) => (
                          <option key={rol} value={rol}>
                            {rol}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="admin-badge">Sin permiso</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="admin-user-cards">
        {users.map((current) => {
          const isCurrentUser =
            current.email.toLowerCase() === user?.email?.toLowerCase();
          const permisos = permisosDeRol(current.rol);

          return (
            <article className="admin-user-card" key={current.id}>
              <div className="admin-user-card-head">
                <div>
                  <strong>{current.nombre}</strong>
                  {isCurrentUser && (
                    <span className="admin-badge admin-user-card-vos">Vos</span>
                  )}
                </div>
                <span
                  className={
                    current.rol === ROLES.ADMIN
                      ? "admin-badge admin-badge--admin"
                      : "admin-badge"
                  }
                >
                  {current.rol}
                </span>
              </div>

              <p className="admin-user-card-email">{current.email}</p>

              <ul className="admin-permissions">
                {permisos.length ? (
                  permisos.map((permission) => (
                    <li key={permission}>
                      {ETIQUETAS_PERMISO[permission] ?? permission}
                    </li>
                  ))
                ) : (
                  <li>Sin permisos de panel</li>
                )}
              </ul>

              <label className="admin-user-card-role">
                <span className="admin-field-label">Cambiar rol</span>
                {puedeEditarRoles ? (
                  <select
                    className="admin-select"
                    aria-label={`Rol de ${current.nombre}`}
                    value={current.rol}
                    onChange={(event) =>
                      handleRoleChange(current.id, event.target.value)
                    }
                  >
                    {ROLES_DISPONIBLES.map((rol) => (
                      <option key={rol} value={rol}>
                        {rol}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="admin-badge">Sin permiso</span>
                )}
              </label>
            </article>
          );
        })}
      </div>

      <p className="admin-note">
        Si cambiás tu propio rol y perdés el acceso al panel, se cierra la
        sesión automáticamente.
      </p>
    </section>
  );
}
