# Todos al Agua — Frontend

SPA de la asociación Todos al Agua Necochea: carta de la cantina, huerta, autenticación simulada y panel de administración.

## 1. Arquitectura

React + Vite, sin framework de estilos. Entrada: `src/main.jsx`, que arma el árbol de providers y el router.

```
src/
├── main.jsx              # arranque: UsersProvider → AuthProvider → MenuProvider → Router
├── routes/index.jsx      # rutas públicas + /admin protegido
├── pages/                # Home, Cantina, Huerta, Login, Register, Admin
├── components/           # secciones de las páginas
├── components/admin/     # UsersPanel y MenuPanel
├── ui/                   # Button, Logo, SectionHeading, icons, etc.
├── auth/                 # sesión simulada (Context + Provider)
├── data/                 # menu.json + Providers de usuarios y menú
└── theme.css             # tokens de color y tipografía
```

Rutas:

| Ruta | Descripción |
|---|---|
| `/`, `/cantina`, `/huerta` | Páginas públicas |
| `/login`, `/registro` | Autenticación (solo invitados) |
| `/recuperar`, `/sin-acceso` | Utilidades |
| `/admin` | Redirige según el rol del usuario |
| `/admin/usuarios` | Usuarios y cambio de rol (`ver_usuarios`) |
| `/admin/menu` | Editor de la carta (`editar_menu`) |
| `/admin/huerta` | Próximamente (`editar_huerta`) |

`ProtectedRoute` pide un permiso por ruta. Sin sesión redirige a `/login`; con sesión pero sin permiso, a `/sin-acceso`. `GuestRoute` impide ver `/login` y `/registro` estando logueado. El registro pasa por `/login` conservando la ruta intentada.

Roles y permisos (`src/auth/permissions.js`):

| Rol | Permisos |
|---|---|
| `admin` | acceso al panel, ver usuarios, editar menú, editar huerta, cambiar roles |
| `cantina` | acceso al panel, editar menú |
| `huerta` | acceso al panel, editar huerta |
| `usuario` | sin acceso al panel |

La sesión y los datos del panel se guardan en `localStorage` (`todos-al-agua.auth`, `todos-al-agua.users`, `todos-al-agua.menu`). El menú inicial es una copia de `backend/repositories/data.json`.

## 2. Colores

Los tokens están en `src/theme.css`. Cada sección usa su propia paleta: azul para el sitio general, y la paleta cálida de la cantina en `pages/Cantina.css` (también la usa el panel `/admin`).

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#0055A5` | Marca general, botones, títulos |
| `--color-background` | `#00A8E8` | Acentos |
| `--color-grey` | `#EEEEEE` | Fondo claro |
| `--color-danger` | `#C62828` | Errores, eliminar |
| `--color-warning` | `#F9B934` | Foco, avisos |
| `--color-cantina-espresso` | `#3B2A1E` | Footer |
| `--color-cantina-brown` | `#6F4A2F` | Botones y títulos cantina |
| `--color-cantina-terracotta` | `#B85C38` | Acentos y activos |
| `--color-cantina-gold` | `#D8A13C` | Foco |
| `--color-cantina-cream` | `#F8F1E7` | Fondo cantina |
| `--color-cantina-paper` | `#fffbf5` | Tarjetas |

Tipografía: Montserrat (`--font-family-base`).

## 3. Bibliotecas

| Paquete | Uso |
|---|---|
| `react`, `react-dom` (19) | UI |
| `react-router` (8) | Enrutado con `createBrowserRouter`, `Outlet`, `Navigate` |
| `vite` (8) | Dev server y build |
| `@vitejs/plugin-react`, `@rolldown/plugin-babel`, `babel-plugin-react-compiler` | Transformación JSX y React Compiler |
| `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | Lint |

No se usan librerías de UI, estado global externo ni cliente HTTP: el estado son Contexts de React y la persistencia es `localStorage`.

## Instalación y uso

Requiere **Node 20.19+ o 22.12+**.

```bash
cd src/frontend/todos-al-agua
npm install
npm run dev
```

Abrir `http://localhost:5173`.

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/
npm run lint      # ESLint
```

Para probar el panel: iniciar sesión con `admin@todosalagua.com` (o cualquier email que contenga `admin`) y entrar a `/admin`.
