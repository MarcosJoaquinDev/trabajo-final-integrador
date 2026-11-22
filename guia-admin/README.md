# Guía de usuario administrador · Todos al Agua Necochea

Proyecto **independiente** que contiene una página de documentación para los
administradores del panel `/admin` del frontend `src/frontend/todos-al-agua`.

No modifica el frontend original: es una SPA propia (React + Vite) que replica
sus tokens de diseño (`theme.css`) y su paleta de cantina, y documenta el
comportamiento real del panel de administración.

## Contenido de la guía

| Sección | Qué explica |
| --- | --- |
| Acceso al panel | Cuentas por rol, inferencia del rol desde el email y `GuestRoute`. |
| Navegación del panel | Pestañas según permiso, índice `/admin`, cierre de sesión y vista móvil. |
| Roles y permisos | 4 roles, 5 permisos, `ProtectedRoute` y pantalla `/sin-acceso`. |
| Gestión de usuarios | Cambio de rol, etiqueta “Vos” y efectos de cambiar tu propio rol. |
| Editor de menú | Categorías, platos, validaciones, botones y vistas adaptable. |
| Panel de huerta | Acceso por permiso y estado de placeholder. |
| Datos y persistencia | Claves de `localStorage` y alcance local de los cambios. |
| Solución de problemas | Preguntas frecuentes desplegables. |

Incluye índice lateral con búsqueda, resaltado de sección activa, botón para
copiar rutas/emails, impresión/PDF y diseño responsive.

## Instalación y uso

Requiere Node 20.19+ o 22.12+ (igual que el frontend principal).

```bash
cd guia-admin
npm install
npm run dev
```

Abrir `http://localhost:5174` (el frontend principal usa el puerto 5173).

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/
```

## Deploy en Netlify

El proyecto incluye `netlify.toml`. Al importar el repositorio, configurá
**Base directory: `guia-admin`**; Netlify toma de ese archivo el comando
`npm run build`, la carpeta `dist` y Node 22.

Alternativa sin Git: ejecutá `npm run build` y arrastrá la carpeta `dist` a
https://app.netlify.com/drop.

## Relación con el frontend

La información de esta guía se basa en:

- `src/auth/permissions.js` — roles, permisos y reglas de inferencia/redirección.
- `src/auth/AuthProvider.jsx` — sesión simulada y `hasPermission`.
- `src/routes/index.jsx`, `ProtectedRoute.jsx`, `GuestRoute.jsx` — rutas y guards.
- `src/pages/Admin.jsx`, `AdminIndex.jsx`, `SinAcceso.jsx` — panel, índice y acceso denegado.
- `src/components/admin/UsersPanel.jsx` — usuarios y cambio de roles.
- `src/components/admin/MenuPanel.jsx`, `useMenuEditor.js`, `menuUtils.js` — editor de menú.
- `src/components/admin/HuertaPanel.jsx` — sección de huerta (placeholder).
- `src/data/UsersProvider.jsx` y `src/data/MenuProvider.jsx` — persistencia.
