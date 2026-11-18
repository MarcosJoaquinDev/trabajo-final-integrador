import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cantina from "../pages/Cantina";
import Huerta from "../pages/Huerta";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthPlaceholder from "../pages/AuthPlaceholder";

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
]);

export default router;
