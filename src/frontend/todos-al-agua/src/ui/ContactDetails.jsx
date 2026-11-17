import Button from "./Button";
import "./ContactDetails.css";

export default function ContactDetails({ items, action, note }) {
  return (
    <div className="contact-panel">
      <ul className="contact-list">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label}>
              <Icon />
              <span>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </span>
            </li>
          );
        })}
      </ul>

      <Button href={action.href} variant="light" block>
        {action.label}
      </Button>
      <p className="contact-note">{note}</p>
    </div>
  );
}
