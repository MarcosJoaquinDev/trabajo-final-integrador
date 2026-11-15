import Eyebrow from "./Eyebrow";
import "./SectionHeading.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}) {
  return (
    <div className={["section-heading", className].filter(Boolean).join(" ")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-subtitle">{title}</h2>
      {description && <p className="text-body section-lead">{description}</p>}
    </div>
  );
}
