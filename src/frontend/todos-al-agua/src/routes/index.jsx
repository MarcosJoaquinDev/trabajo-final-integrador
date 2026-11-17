import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cantina from "../pages/Cantina";
import Huerta from "../pages/Huerta";

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
]);

export default router;
