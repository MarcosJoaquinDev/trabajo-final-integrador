import Button from "./Button";
import { ClockIcon } from "./icons";
import "./ScheduleCard.css";

export default function ScheduleCard({
  id,
  kicker,
  title,
  schedule,
  note,
  action,
}) {
  return (
    <div className="split-card" id={id}>
      <p className="split-card-kicker">{kicker}</p>
      <h3>{title}</h3>

      <ul className="schedule-list">
        {schedule.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>

      <div className="split-card-note">
        <ClockIcon />
        <p>{note}</p>
      </div>

      <Button href={action.href} block>
        {action.label}
      </Button>
    </div>
  );
}
