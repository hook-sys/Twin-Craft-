import Link from "next/link";

/**
 * The soft pastel field the marketing pages sit on. Pure CSS: large blurred
 * radial washes rather than images, so it costs nothing to load and scales.
 */
export function Backdrop() {
  /** Glossy pastel sphere: a radial highlight plus a soft ground shadow. */
  const ball =
    "absolute rounded-full shadow-[0_25px_50px_-20px_rgba(70,90,140,0.35)]";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(160deg,#eef4fd_0%,#e9ecfb_45%,#f3ecfb_75%,#eaf5f2_100%)]"
    >
      {/* wide colour washes */}
      <div className="absolute -left-52 top-[-12rem] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,#c3d8ff,transparent_68%)] blur-3xl" />
      <div className="absolute right-[-16rem] top-[-8rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_40%_40%,#d9c9ff,transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[-16rem] left-[18%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_50%_40%,#c7ebdb,transparent_68%)] blur-3xl" />
      <div className="absolute bottom-[8rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffe1cd,transparent_70%)] blur-3xl" />

      {/* glossy spheres along the edges */}
      <div
        className={`${ball} -left-24 top-[18%] h-64 w-64 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#dfeaff_45%,#a9c2ee_100%)] opacity-90`}
      />
      <div
        className={`${ball} -left-10 top-[52%] h-40 w-40 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#e6f7ee_45%,#a9d8bf_100%)] opacity-90`}
      />
      <div
        className={`${ball} left-[6%] bottom-[8%] h-24 w-24 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#f6e7ff_45%,#c9a9ef_100%)] opacity-90`}
      />
      <div
        className={`${ball} -right-24 top-[10%] h-72 w-72 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#f1e6ff_45%,#c0a6ee_100%)] opacity-90`}
      />
      <div
        className={`${ball} right-[4%] top-[46%] h-28 w-28 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#ffeede_45%,#f0c9a5_100%)] opacity-90`}
      />
      <div
        className={`${ball} -right-16 bottom-[6%] h-52 w-52 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#e4edff_45%,#aabfef_100%)] opacity-90`}
      />
      <div
        className={`${ball} left-[38%] top-[6%] h-20 w-20 bg-[radial-gradient(circle_at_30%_26%,#ffffff,#fff0e2_45%,#f3cfae_100%)] opacity-80`}
      />
    </div>
  );
}

export function BrandMark({
  className = "",
  letter = "P",
}: {
  className?: string;
  letter?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#38bdf8] font-bold text-white shadow-lg shadow-indigo-500/25 ${className}`}
    >
      {letter}
    </span>
  );
}

export function Brand({
  name,
  sub,
  href = "/",
  letter = "P",
}: {
  name: string;
  sub?: string;
  href?: string;
  letter?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <BrandMark className="h-11 w-11 text-lg" letter={letter} />
      <span className="leading-tight">
        <span className="block text-xl font-bold text-slate-900">{name}</span>
        {sub && <span className="block text-xs text-slate-500">{sub}</span>}
      </span>
    </Link>
  );
}

export function Glass({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/70 shadow-[0_20px_60px_-25px_rgba(30,41,80,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-600 backdrop-blur">
      {children}
    </span>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#38bdf8] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110"
    >
      {children}
      <Arrow className="h-4 w-4" />
    </Link>
  );
}

export function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-7 py-3.5 font-semibold text-slate-700 backdrop-blur transition hover:bg-white"
    >
      {children}
    </Link>
  );
}

export function IconTile({
  tone = "indigo",
  children,
}: {
  tone?: "indigo" | "violet" | "emerald" | "amber";
  children: React.ReactNode;
}) {
  const tones = {
    indigo: "bg-indigo-100 text-indigo-600",
    violet: "bg-violet-100 text-violet-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
  } as const;

  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function Bolt({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M13 3 5.5 13.5H11l-.9 7.5 7.4-10.5H12Z" />
    </svg>
  );
}

export function Layers({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5Z" />
      <path d="m4 12.5 8 4.3 8-4.3" />
      <path d="m4 17 8 4.3 8-4.3" />
    </svg>
  );
}

export function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function Cursor({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="m5 3 6.5 17 2.4-6.8 6.8-2.4Z" />
    </svg>
  );
}

export function Rocket({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M13.5 4.5c3.5-1.6 6 .9 4.4 4.4-1.3 2.9-4.3 6-7.9 8L6 13c2-3.6 5.1-6.6 7.5-8.5Z" />
      <path d="M7 14.5 5 19l4.5-2" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </svg>
  );
}

export function Search({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function Play({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M9 6.5v11l9-5.5Z" />
    </svg>
  );
}

export function Move({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3v18M3 12h18M12 3 9.5 5.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5" />
    </svg>
  );
}

export function TypeT({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 6h14M12 6v13M9 19h6" />
    </svg>
  );
}

export function ImageIcon({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <circle cx="9" cy="10" r="1.4" />
      <path d="m5 17 4.5-4.5 3.5 3.5 2.5-2.5L20 17" />
    </svg>
  );
}

export function VideoIcon({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3" y="6" width="12" height="12" rx="3" />
      <path d="m16 12 5-3v9l-5-3Z" />
    </svg>
  );
}

export function SectionIcon({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3.5" y="4.5" width="17" height="6" rx="2" />
      <rect x="3.5" y="13.5" width="17" height="6" rx="2" />
    </svg>
  );
}

export function DotsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
    </svg>
  );
}

export function Send({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M20.5 3.5 11 13" />
      <path d="M20.5 3.5 14 20.5l-3-7.5-7.5-3Z" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function Menu({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Clock({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Wallet({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17v3" />
      <rect x="3.5" y="8" width="17" height="11" rx="3" />
      <circle cx="16.5" cy="13.5" r="1.2" />
    </svg>
  );
}

export function Compass({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.7 4.3L9 15l1.7-4.3Z" />
    </svg>
  );
}

export function PenTool({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3 6 9l-2 9 9-2 6-6Z" />
      <path d="m10.5 13.5 6.5-6.5" />
    </svg>
  );
}

export function TrendUp({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <path d="m4 16 5-5 3.5 3.5L20 7" />
      <path d="M15 7h5v5" />
    </svg>
  );
}

export function LifeRing({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m6 6 3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" />
    </svg>
  );
}
