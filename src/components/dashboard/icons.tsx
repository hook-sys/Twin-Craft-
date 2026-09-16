const s = {
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
  <svg {...s} className={className}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z" />
  </svg>
);

export const UserIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 19.5c.8-3.6 3.4-5.4 7-5.4s6.2 1.8 7 5.4" />
  </svg>
);

export const BoxIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="m12 3 8 4v10l-8 4-8-4V7Z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </svg>
);

export const LayersIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="m12 3 8.5 4.5L12 12 3.5 7.5Z" />
    <path d="m4 12.5 8 4.3 8-4.3M4 17l8 4.3 8-4.3" />
  </svg>
);

export const UsersIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19c.6-3.2 2.8-4.8 5.5-4.8s4.9 1.6 5.5 4.8" />
    <path d="M16 6.2a3 3 0 0 1 0 5.8M17.5 14.6c2 .6 3.2 2.1 3.6 4.4" />
  </svg>
);

export const TruckIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <rect x="2.5" y="7" width="11" height="9" rx="2" />
    <path d="M13.5 10H17l3.5 3v3h-7" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
);

export const PenIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M4 20h4L20 8a2.5 2.5 0 0 0-3.5-3.5L4 16.5Z" />
    <path d="m14.5 6 3.5 3.5" />
  </svg>
);

export const ChartIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M5 20V11M12 20V4M19 20v-6" />
  </svg>
);

export const CardIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M3 10h18M7 15h4" />
  </svg>
);

export const PageIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4M9 12h6M9 16h4" />
  </svg>
);

export const BlogIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
    <path d="M7.5 9h9M7.5 12.5h9M7.5 16h5" />
  </svg>
);

export const HeadsetIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" />
    <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
  </svg>
);

export const GearIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />
  </svg>
);

export const ListIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const SearchIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

export const BellIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5S6.5 14 6.5 10Z" />
    <path d="M10 18.5a2.2 2.2 0 0 0 4 0" />
  </svg>
);

export const GlobeIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
  </svg>
);

export const CalendarIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
);

export const BoltIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M13 3 5.5 13.5H11l-.9 7.5 7.4-10.5H12Z" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUp = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M12 19V6M6 12l6-6 6 6" />
  </svg>
);

export const EyeIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ImageIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <rect x="3.5" y="5" width="17" height="14" rx="3" />
    <circle cx="9" cy="10" r="1.4" />
    <path d="m5 17 4.5-4.5 3.5 3.5 2.5-2.5L20 17" />
  </svg>
);

export const PaletteIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-.9 2-1.8 0-1.6-1.4-1.8-1.4-3 0-.9.8-1.6 1.8-1.6h1.8a4.3 4.3 0 0 0 4.3-4.3c0-3.6-3.8-6.3-8.5-6.3Z" />
    <circle cx="8" cy="10" r="1" />
    <circle cx="12" cy="7.5" r="1" />
    <circle cx="15.8" cy="10" r="1" />
  </svg>
);

export const PlusUserIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="10" cy="8.5" r="3.2" />
    <path d="M4 19c.6-3.2 2.8-4.8 6-4.8 1 0 1.9.2 2.7.5" />
    <path d="M17 14v6M14 17h6" />
  </svg>
);

export const CheckCircle = ({ className }: P) => (
  <svg {...s} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" />
  </svg>
);

export const MenuIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const WarningIcon = ({ className }: P) => (
  <svg {...s} className={className}>
    <path d="M12 4.5 20.5 19h-17Z" />
    <path d="M12 10v4M12 16.5h.01" />
  </svg>
);
