import "./Eyebrow.css";

export default function Eyebrow({
  light = false,
  dot = false,
  className = "",
  children,
}) {
  const classes = ["eyebrow", light ? "eyebrow--light" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes}>
      {dot && <span className="eyebrow-dot" aria-hidden="true" />}
      {children}
    </p>
  );
}
