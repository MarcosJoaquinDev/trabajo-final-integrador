import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cantina from "../pages/Cantina";
import Huerta from "../pages/Huerta";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthPlaceholder from "../pages/AuthPlaceholder";
import SinAcceso from "../pages/SinAcceso";
import Admin from "../pages/Admin";
import AdminIndex from "../pages/AdminIndex";
import UsersPanel from "../components/admin/UsersPanel";
import MenuPanel from "../components/admin/MenuPanel";
import HuertaPanel from "../components/admin/HuertaPanel";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import { PERMISOS } from "../auth/permissions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cantina",
    element: <Cantina />,
  },
  {
    path: "/huerta",
    element: <Huerta />,
  },
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/registro", element: <Register /> },
    ],
  },
  {
    path: "/recuperar",
    element: (
      <AuthPlaceholder
        title="Recuperar contraseña"
        description="La recuperación de contraseña estará disponible próximamente."
      />
    ),
  },
  {
    path: "/sin-acceso",
    element: <SinAcceso />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute requiredPermission={PERMISOS.ACCESO_ADMIN} />,
    children: [
      {
        element: <Admin />,
        children: [
          { index: true, element: <AdminIndex /> },
          {
            element: <ProtectedRoute requiredPermission={PERMISOS.VER_USUARIOS} />,
            children: [{ path: "usuarios", element: <UsersPanel /> }],
          },
          {
            element: <ProtectedRoute requiredPermission={PERMISOS.EDITAR_MENU} />,
            children: [{ path: "menu", element: <MenuPanel /> }],
          },
          {
            element: <ProtectedRoute requiredPermission={PERMISOS.EDITAR_HUERTA} />,
            children: [{ path: "huerta", element: <HuertaPanel /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
