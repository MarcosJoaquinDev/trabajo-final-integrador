import "./ActivityCard.css";

export default function ActivityCard({ title, description, tag, tone, icon }) {
  return (
    <article className={`activity-card activity-card--${tone}`}>
      <span className="activity-icon">{icon}</span>
      <div className="activity-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="activity-tag">{tag}</span>
    </article>
  );
}
