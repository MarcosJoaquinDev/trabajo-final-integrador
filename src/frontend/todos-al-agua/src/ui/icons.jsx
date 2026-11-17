function Icon({
  children,
  viewBox = "0 0 24 24",
  strokeWidth = 1.8,
  ...props
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function WavesIcon() {
  return (
    <Icon viewBox="0 0 32 32" strokeWidth="2.2">
      <path d="M4 13c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3" />
      <path d="M4 21c3 0 3-3 6-3s3 3 6 3 3-3 6-3 3 3 6 3" />
    </Icon>
  );
}

export function CheckIcon() {
  return (
    <Icon strokeWidth="2.5">
      <path d="m5 12 4 4L19 6" />
    </Icon>
  );
}

export function PinIcon() {
  return (
    <Icon>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  );
}

export function ClockIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

export function ChildSwimIcon() {
  return (
    <Icon>
      <path d="M2 17c2 0 2-1.5 4-1.5S8 17 10 17s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M2 21c2 0 2-1.5 4-1.5S8 21 10 21s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <circle cx="8" cy="7" r="2.2" />
      <path d="M10.5 9h3.5l2.5 3" />
    </Icon>
  );
}

export function AdultSwimIcon() {
  return (
    <Icon>
      <circle cx="12" cy="5" r="2.2" />
      <path d="M12 8.5v5l-3.5 6" />
      <path d="M12 13.5l4 2 1.5 4" />
      <path d="M6 10.5l3.5-1.2 2.5 1.2 3-1.5 3 1.5" />
    </Icon>
  );
}

export function AquagymIcon() {
  return (
    <Icon>
      <path d="M20.8 8.6c0 4.6-8.8 10.4-8.8 10.4S3.2 13.2 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
      <path d="M6 12h3l1.5-2.5L13 15l1.5-3H18" />
    </Icon>
  );
}

export function TrainingIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function PastaIcon() {
  return (
    <Icon>
      <path d="M4 11h16" />
      <path d="M5 11c0 4 3 7 7 7s7-3 7-7" />
      <path d="M7 5c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
      <path d="M7 8c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
    </Icon>
  );
}

export function FishIcon() {
  return (
    <Icon>
      <path d="M4 12c3-4 8-6 12-5 2 .5 3.5 1.5 4.5 3-1 1.5-2.5 2.5-4.5 3-4 1-9-1-12-1Z" />
      <path d="m20 10 2-2v8l-2-2" />
      <circle cx="9" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function PizzaIcon() {
  return (
    <Icon>
      <path d="M12 3 3 20h18L12 3Z" />
      <path d="M7 14h10" />
      <circle cx="11" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="16" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="16" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function LeafIcon() {
  return (
    <Icon>
      <path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" />
      <path d="M5 20c3-5 7-9 12-12" />
    </Icon>
  );
}

export function PlateIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </Icon>
  );
}

export function CheckCircleIcon() {
  return (
    <Icon strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16.5 9" />
    </Icon>
  );
}

export function StarIcon() {
  return (
    <Icon strokeWidth="1.9">
      <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3Z" />
    </Icon>
  );
}

export function SproutIcon() {
  return (
    <Icon>
      <path d="M12 21v-7" />
      <path d="M12 14c0-4 3-7 8-7 0 5-3 7-8 7Z" />
      <path d="M12 16c0-3-2-5-6-5 0 4 2 5 6 5Z" />
      <path d="M5 21h14" />
    </Icon>
  );
}

export function BasketIcon() {
  return (
    <Icon>
      <path d="M4 10h16l-1.5 8a2 2 0 0 1-2 1.6H7.5a2 2 0 0 1-2-1.6L4 10Z" />
      <path d="M8 10 11 5" />
      <path d="M16 10 13 5" />
      <path d="M8 14h8" />
    </Icon>
  );
}

export function StoreIcon() {
  return (
    <Icon>
      <path d="M3 9h18l-1 3H4L3 9Z" />
      <path d="M5 12v7h14v-7" />
      <path d="M9 19v-4h6v4" />
      <path d="M4 6h16" />
    </Icon>
  );
}
