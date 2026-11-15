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

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}
