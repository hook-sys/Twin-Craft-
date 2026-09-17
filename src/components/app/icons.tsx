const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type P = { className?: string };

export const HomeIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z" />
  </svg>
);

export const TeamIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19c.6-3.2 2.8-4.8 5.5-4.8s4.9 1.6 5.5 4.8" />
    <path d="M16 6.2a3 3 0 0 1 0 5.8M17.5 14.6c2 .6 3.2 2.1 3.6 4.4" />
  </svg>
);

export const BuildingIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="M4 20V6.5L12 4v16M12 20h8V10l-8-2.5" />
    <path d="M7 9h2M7 12.5h2M7 16h2M15 13h2M15 16.5h2" />
  </svg>
);

export const UserIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 19.5c.8-3.6 3.4-5.4 7-5.4s6.2 1.8 7 5.4" />
  </svg>
);

export const ShieldIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
