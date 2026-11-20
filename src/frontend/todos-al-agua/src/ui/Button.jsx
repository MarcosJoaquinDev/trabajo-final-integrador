import { Link } from "react-router";
import "./Button.css";

export default function Button({
  href,
  variant = "primary",
  block = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof href === "string" && href.startsWith("/")) {
    return (
      <Link className={classes} to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}
