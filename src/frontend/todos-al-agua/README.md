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

La sesión (JWT) se guarda en `localStorage` (`todos-al-agua.token`). El menú y los usuarios se leen de la API del backend (Express + Firebase Firestore), con `localStorage` como fallback si el servidor no está disponible. El cliente HTTP está en `src/api/client.js` y usa `VITE_API_URL` (por defecto `http://localhost:3000`). El menú inicial es una copia de `backend/repositories/data.json`.

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

No se usan librerías de UI ni estado global externo: el estado son Contexts de React. La comunicación con la API se hace con `fetch` nativo en `src/api/client.js`; el token JWT se envía en `Authorization: Bearer`.

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

Para probar el panel: iniciar sesión con `admin@todosalagua.com` / `123456` y entrar a `/admin`.

## Backend (API + Firebase)

Ubicación: `src/backend`. Express + Firebase Firestore + JWT.

```bash
cd src/backend
npm install
cp .env.example .env      # completar con las credenciales de Firebase
npm run dev               # http://localhost:3000
node seed.js              # carga menu y usuario admin en Firestore (una vez)
```

### Variables de entorno (`src/backend/.env`)

```env
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
STORAGE_BUCKET=...
MESSAGING_SENDER_ID=...
APP_ID=...
CANTINA_TOKEN=secreto_para_firmar_jwt
ROL_ADMIN=admin
PORT=3000
FRONTEND_URL=http://localhost:5173   # luego, la URL del frontend deployado
```

### Endpoints principales

- `POST /users/register` — alta de usuario
- `POST /users/login` — devuelve `{ token }`
- `GET /users`, `PUT /users/:id`, `DELETE /users/:id` — protegidos con JWT + rol admin
- `GET /menu`, `GET /menu/:id` — públicos
- `POST /menu`, `PUT /menu/:id`, `DELETE /menu/:id` y los de ítems — protegidos

## Deploy

### Backend en Render (plan gratuito)
1. Crear cuenta en **render.com** y conectar el repositorio de GitHub.
2. *New Web Service* → seleccionar el repo → **Root Directory: `src/backend`**.
3. Render detecta `render.yaml`: `buildCommand: npm install`, `startCommand: npm start`.
4. Cargar las variables de entorno del `.env` (todas las del listado anterior).
5. Copiar la URL que te da Render (ej. `https://todos-al-agua-backend.onrender.com`).

> Render Free se duerme al estar inactivo: el primer request puede tardar ~30 s.

### Frontend en Vercel (plan gratuito)
1. Crear cuenta en **vercel.com** y conectar el repositorio.
2. *New Project* → seleccionar el repo → **Root Directory: `src/frontend/todos-al-agua`**.
3. Framework: Vite (detecta `npm run build` y `dist/`).
4. Agregar la variable de entorno: `VITE_API_URL = https://TU-BACKEND.onrender.com`.
5. `vercel.json` ya incluye el rewrite para que las rutas `/admin/...` funcionen al recargar.

### Frontend en Netlify (alternativa)
- `netlify.toml` ya trae `base`, `command`, `publish` y el redirect SPA.
- Agregar `VITE_API_URL` en *Site settings → Environment variables*.

### CORS
En el backend, `FRONTEND_URL` debe ser la URL del frontend deployado (o `*` para pruebas). Sin eso, el navegador bloquea las llamadas.
