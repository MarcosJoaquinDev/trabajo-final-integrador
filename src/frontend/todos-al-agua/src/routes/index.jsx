import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cantina from "../pages/Cantina";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cantina",
    element: <Cantina />,
  },
]);

export default router;
