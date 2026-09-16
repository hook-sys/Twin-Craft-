import type { IconName } from "@/lib/site-content";

type Props = { className?: string };

const shared = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Truck({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <path d="M2 7.5A1.5 1.5 0 0 1 3.5 6h9A1.5 1.5 0 0 1 14 7.5V16H2Z" />
      <path d="M14 10h3.6a2 2 0 0 1 1.7.96L21.5 15v1h-7.5Z" />
      <circle cx="6.5" cy="17.5" r="2" />
      <circle cx="17.5" cy="17.5" r="2" />
    </svg>
  );
}

function Shield({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

function Badge({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <circle cx="12" cy="9.5" r="6" />
      <path d="m9 12.5-1.2 7L12 17.2l4.2 2.3-1.2-7" />
      <path d="m9.7 9.4 1.7 1.7 3.1-3.3" />
    </svg>
  );
}

function Clock({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

function Tag({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <path d="M3.5 11.4V4.5a1 1 0 0 1 1-1h6.9a1 1 0 0 1 .7.3l8.1 8.1a1 1 0 0 1 0 1.4l-6.9 6.9a1 1 0 0 1-1.4 0L3.8 12.1a1 1 0 0 1-.3-.7Z" />
      <circle cx="7.8" cy="7.8" r="1.3" />
    </svg>
  );
}

function Sparkle({ className }: Props) {
  return (
    <svg {...shared} className={className}>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7L4.5 11l5.6-1.9Z" />
      <path d="M18.5 4v2.6M17.2 5.3h2.6" />
    </svg>
  );
}

const registry: Record<IconName, (props: Props) => React.ReactNode> = {
  truck: Truck,
  shield: Shield,
  badge: Badge,
  clock: Clock,
  tag: Tag,
  sparkle: Sparkle,
};

export function BadgeIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = registry[name] ?? Sparkle;
  return <Icon className={className} />;
}

export const ICON_CHOICES: IconName[] = [
  "truck",
  "shield",
  "badge",
  "clock",
  "tag",
  "sparkle",
];
