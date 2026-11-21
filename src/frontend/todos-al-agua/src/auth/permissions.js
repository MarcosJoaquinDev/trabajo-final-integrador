export const ROLES = {
  ADMIN: "admin",
  CANTINA: "cantina",
  HUERTA: "huerta",
  USUARIO: "usuario",
};

export const PERMISOS = {
  ACCESO_ADMIN: "acceso_admin",
  VER_USUARIOS: "ver_usuarios",
  EDITAR_MENU: "editar_menu",
  EDITAR_HUERTA: "editar_huerta",
  EDITAR_ROLES: "editar_roles",
};

export const ETIQUETAS_PERMISO = {
  [PERMISOS.ACCESO_ADMIN]: "Acceso al panel",
  [PERMISOS.VER_USUARIOS]: "Ver usuarios",
  [PERMISOS.EDITAR_MENU]: "Editar menú de cantina",
  [PERMISOS.EDITAR_HUERTA]: "Editar huerta",
  [PERMISOS.EDITAR_ROLES]: "Cambiar roles",
};

export const PERMISOS_POR_ROL = {
  [ROLES.ADMIN]: Object.values(PERMISOS),
  [ROLES.CANTINA]: [PERMISOS.ACCESO_ADMIN, PERMISOS.EDITAR_MENU],
  [ROLES.HUERTA]: [PERMISOS.ACCESO_ADMIN, PERMISOS.EDITAR_HUERTA],
  [ROLES.USUARIO]: [],
};

export function permisosDeRol(rol) {
  return PERMISOS_POR_ROL[rol] ?? PERMISOS_POR_ROL[ROLES.USUARIO];
}

export function rolDesdeEmail(email) {
  const texto = (email ?? "").toLowerCase();
  if (texto.includes(ROLES.ADMIN)) {
    return ROLES.ADMIN;
  }
  if (texto.includes(ROLES.CANTINA)) {
    return ROLES.CANTINA;
  }
  if (texto.includes(ROLES.HUERTA)) {
    return ROLES.HUERTA;
  }
  return ROLES.USUARIO;
}

export function destinoInicial(hasPermission) {
  if (hasPermission(PERMISOS.VER_USUARIOS)) {
    return "/admin/usuarios";
  }
  if (hasPermission(PERMISOS.EDITAR_MENU)) {
    return "/admin/menu";
  }
  if (hasPermission(PERMISOS.EDITAR_HUERTA)) {
    return "/admin/huerta";
  }
  return "/";
}
