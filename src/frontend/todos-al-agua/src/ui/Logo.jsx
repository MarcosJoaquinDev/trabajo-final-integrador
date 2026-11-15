import { WavesIcon } from "./icons";
import "./Logo.css";

export default function Logo({
  href,
  title = "Todos al Agua",
  subtitle = "Necochea",
  className = "",
}) {
  const classes = ["brand", className].filter(Boolean).join(" ");

  const content = (
    <>
      <span className="brand-mark">
        <WavesIcon />
      </span>
      <span className="brand-text">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={`${title} ${subtitle}, ir al inicio`}
      >
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
