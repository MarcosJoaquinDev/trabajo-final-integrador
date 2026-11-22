export const clone = (value) => JSON.parse(JSON.stringify(value));

export function toPrice(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return Number(value);
}

function isValidPrice(value) {
  if (value === "" || value === null || value === undefined) {
    return true;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0;
}

export function validateMenu(menu) {
  for (const category of menu) {
    if (!category.categoria.trim()) {
      return "Todas las categorías deben tener un nombre.";
    }

    for (const item of category.items ?? []) {
      if (!item.nombre.trim()) {
        return "Todos los platos deben tener un nombre.";
      }

      if (item.precios) {
        if (
          !isValidPrice(item.precios.chica) ||
          !isValidPrice(item.precios.grande)
        ) {
          return "Los precios deben ser números válidos y mayores o iguales a cero.";
        }
      } else if (!isValidPrice(item.precio)) {
        return "Los precios deben ser números válidos y mayores o iguales a cero.";
      }
    }
  }

  return "";
}

export function normalizeForSave(menu) {
  return menu.map((category) => ({
    ...category,
    categoria: category.categoria.trim(),
    items: (category.items ?? []).map((item) => {
      const next = {
        ...item,
        nombre: item.nombre.trim(),
        descripcion: (item.descripcion ?? "").trim(),
        promocion: (item.promocion ?? "").trim(),
      };

      if (item.precios) {
        next.precios = {
          chica: toPrice(item.precios.chica),
          grande: toPrice(item.precios.grande),
        };
      } else {
        next.precio = toPrice(item.precio);
      }

      return next;
    }),
  }));
}
