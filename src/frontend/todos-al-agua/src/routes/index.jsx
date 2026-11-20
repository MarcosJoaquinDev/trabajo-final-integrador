import { createBrowserRouter, Navigate } from "react-router";
import Home from "../pages/Home";
import Cantina from "../pages/Cantina";
import Huerta from "../pages/Huerta";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthPlaceholder from "../pages/AuthPlaceholder";
import Admin from "../pages/Admin";
import UsersPanel from "../components/admin/UsersPanel";
import MenuPanel from "../components/admin/MenuPanel";
import ProtectedRoute from "./ProtectedRoute";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Register />,
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
    path: "/admin",
    element: <ProtectedRoute requiredRole="admin" />,
    children: [
      {
        element: <Admin />,
        children: [
          { index: true, element: <Navigate to="/admin/usuarios" replace /> },
          { path: "usuarios", element: <UsersPanel /> },
          { path: "menu", element: <MenuPanel /> },
        ],
      },
    ],
  },
]);

export default router;
