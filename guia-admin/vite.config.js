import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // El frontend principal usa 5173; usamos otro puerto para evitar conflictos.
    port: 5174,
  },
});
