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
