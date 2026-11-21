const AUTH_LINKS = ["/login", "/registro"];

export function visibleNavLinks(links, user, canAccessAdmin) {
  const filtered = user
    ? links.filter((link) => !AUTH_LINKS.includes(link.href))
    : links;

  if (!canAccessAdmin) {
    return filtered;
  }

  if (filtered.some((link) => link.href === "/admin")) {
    return filtered;
  }

  return [...filtered, { href: "/admin", label: "Admin" }];
}

export function visibleCta(cta, user) {
  if (user && AUTH_LINKS.includes(cta.href)) {
    return { href: "/", label: "Volver al inicio" };
  }

  return cta;
}
