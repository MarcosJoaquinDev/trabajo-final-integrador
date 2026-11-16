import data from "./menu.json";

export const cantinaName = data.restaurante;

export const menu = data.menu;

export const featuredCategories = [
  {
    categoria: "Pastas",
    title: "Pastas caseras",
    description:
      "Sorrentinos, ravioles, canelones y ñoquis con las salsas de la casa.",
    tag: "Desde $7.000",
    tone: "sun",
  },
  {
    categoria: "De Mar",
    title: "Sabores del mar",
    description:
      "Filet a la romana, rabas y papillot de merluza, bien de Necochea.",
    tag: "Especialidades",
    tone: "sky",
  },
  {
    categoria: "Pizzas",
    title: "Pizzas al horno",
    description:
      "Muzzarella, napolitana, especial y anchoas en tamaño chica o grande.",
    tag: "Chica o grande",
    tone: "coral",
  },
  {
    categoria: "Celiacos",
    title: "Opciones sin TACC",
    description:
      "Pastas, sándwiches, pizzeta y medialunas para una cantina inclusiva.",
    tag: "Sin TACC",
    tone: "primary",
  },
];

export function formatPrice(value) {
  if (value === null || value === undefined) {
    return "Consultar";
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
