import { CheckCircleIcon, StarIcon } from "./icons";
import "./HeroArt.css";

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-orb">
        <svg className="hero-waves" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="158" stroke="rgba(255,255,255,.32)" />
          <circle
            cx="210"
            cy="210"
            r="118"
            stroke="rgba(255,255,255,.26)"
            strokeDasharray="6 10"
          />
          <path
            d="M78 196c36 0 36-28 72-28s36 28 72 28 36-28 72-28 36 28 48 28"
            stroke="rgba(255,255,255,.32)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M78 232c36 0 36-28 72-28s36 28 72 28 36-28 72-28 36 28 48 28"
            stroke="rgba(255,255,255,.78)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M78 268c36 0 36-28 72-28s36 28 72 28 36-28 72-28 36 28 48 28"
            stroke="rgba(255,255,255,.46)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="hero-float hero-float--top">
        <span className="hero-float-icon">
          <CheckCircleIcon />
        </span>
        <span>
          <strong>Clases para todas las edades</strong>
          <small>Desde los 4 años</small>
        </span>
      </div>

      <div className="hero-float hero-float--bottom">
        <span className="hero-float-icon hero-float-icon--sun">
          <StarIcon />
        </span>
        <span>
          <strong>Grupos reducidos</strong>
          <small>Atención personalizada</small>
        </span>
      </div>
    </div>
  );
}
