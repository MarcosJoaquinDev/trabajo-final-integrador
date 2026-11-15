import { CheckIcon } from "./icons";
import "./FeatureList.css";

export default function FeatureList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
