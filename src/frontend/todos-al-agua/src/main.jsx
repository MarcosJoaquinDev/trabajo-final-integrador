import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import UsersProvider from "./data/UsersProvider";
import AuthProvider from "./auth/AuthProvider";
import MenuProvider from "./data/MenuProvider";
import router from "./routes/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsersProvider>
      <AuthProvider>
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </AuthProvider>
    </UsersProvider>
  </StrictMode>,
);
