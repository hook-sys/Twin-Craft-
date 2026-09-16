import {
  Compass,
  ImageIcon,
  LifeRing,
  Move,
  PenTool,
  Play,
  SectionIcon,
  Send,
  TrendUp,
  TypeT,
  VideoIcon,
  DotsIcon,
} from "@/components/marketing/chrome";
import type { UiLabels } from "@/lib/i18n";

/** The glass office block inside the mock site's hero. Pure SVG, no assets. */
function BuildingArt() {
  const columns = Array.from({ length: 7 });
  const rows = Array.from({ length: 11 });

  return (
    <svg viewBox="0 0 220 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfd9f5" />
          <stop offset="100%" stopColor="#e9f1fb" />
        </linearGradient>
        <linearGradient id="face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fb6e4" />
          <stop offset="55%" stopColor="#5f8fc9" />
          <stop offset="100%" stopColor="#3f6ca3" />
        </linearGradient>
        <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f5580" />
          <stop offset="100%" stopColor="#4a7bb0" />
        </linearGradient>
      </defs>

      <rect width="220" height="160" fill="url(#sky)" />
      <path d="M0 132h220v28H0Z" fill="#cfe0d2" />
      <path d="M52 18h108v122H52Z" fill="url(#face)" />
      <path d="M160 26v114l32-14V14Z" fill="url(#side)" />

      {rows.map((_, row) =>
        columns.map((__, col) => (
          <rect
            key={`${row}-${col}`}
            x={58 + col * 14.5}
            y={24 + row * 10.4}
            width="10"
            height="6.4"
            rx="1"
            fill="#eaf3ff"
            opacity={(row + col) % 4 === 0 ? 0.95 : 0.55}
          />
        )),
      )}

      <circle cx="26" cy="118" r="16" fill="#7fae86" />
      <path d="M24 118h4v22h-4Z" fill="#6b8f70" />
      <circle cx="200" cy="124" r="12" fill="#8cbb93" />
      <path d="M198 124h4v16h-4Z" fill="#6b8f70" />
    </svg>
  );
}

export function HeroMockup({ t }: { t: UiLabels }) {
  const tools = [
    { icon: <Move className="h-4 w-4" />, label: t.toolDrag },
    { icon: <TypeT className="h-4 w-4" />, label: t.toolText },
    { icon: <ImageIcon className="h-4 w-4" />, label: t.toolImage },
    { icon: <VideoIcon className="h-4 w-4" />, label: t.toolVideo },
    { icon: <SectionIcon className="h-4 w-4" />, label: t.toolSection },
    { icon: <DotsIcon className="h-4 w-4" />, label: t.toolMore },
  ];

  const cards = [
    { icon: <Compass className="h-4 w-4" />, label: t.mockCardA },
    { icon: <PenTool className="h-4 w-4" />, label: t.mockCardB },
    { icon: <TrendUp className="h-4 w-4" />, label: t.mockCardC },
    { icon: <LifeRing className="h-4 w-4" />, label: t.mockCardD },
  ];

  const navLinks = [
    t.mockNavHome,
    t.mockNavAbout,
    t.mockNavServices,
    t.mockNavProjects,
    t.mockNavContact,
  ];

  return (
    <div className="relative">
      {/* tilted sheet peeking out behind the browser card */}
      <div
        aria-hidden
        className="absolute -right-4 top-10 hidden h-[88%] w-[90%] rotate-[4deg] rounded-[34px] border border-white/60 bg-gradient-to-br from-white/60 via-violet-100/50 to-sky-100/50 shadow-[0_30px_80px_-40px_rgba(30,41,80,0.5)] backdrop-blur-md lg:block"
      />

      {/* floating editor toolbar */}
      <div className="absolute -left-2 top-16 z-30 hidden w-[62px] flex-col gap-0.5 rounded-[22px] border border-white/70 bg-white/80 p-1.5 shadow-[0_20px_50px_-25px_rgba(30,41,80,0.6)] backdrop-blur-xl sm:flex">
        {tools.map((tool) => (
          <span
            key={tool.label}
            className="flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-slate-500"
          >
            {tool.icon}
            <span className="text-[9px] leading-none">{tool.label}</span>
          </span>
        ))}
      </div>

      {/* the mock site */}
      <div className="relative z-20 rounded-[28px] border border-white/70 bg-white/85 p-3.5 shadow-[0_35px_90px_-45px_rgba(30,41,80,0.75)] backdrop-blur-xl sm:ml-8">
        <div className="rounded-[22px] bg-white/95 p-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#38bdf8] text-[9px] font-bold text-white">
                N
              </span>
              <span className="text-[11px] font-bold text-slate-900">
                {t.mockBrand}
              </span>
            </span>
            <span className="hidden gap-3 text-[9px] text-slate-500 sm:flex">
              {navLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </span>
          </div>

          <div className="grid gap-4 py-4 sm:grid-cols-[1fr_1.1fr] sm:items-center">
            <div>
              <p className="text-[15px] font-bold leading-snug text-slate-900 sm:text-lg">
                {t.mockTitle}
              </p>
              <p className="mt-2 text-[9px] leading-relaxed text-slate-500">
                {t.mockBody}
              </p>
              <span className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#101a3d] px-3 py-1.5 text-[9px] font-semibold text-white">
                  {t.mockCtaA}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[9px] font-semibold text-slate-600">
                  <Play className="h-2.5 w-2.5" />
                  {t.mockCtaB}
                </span>
              </span>
            </div>
            <div className="h-28 overflow-hidden rounded-xl sm:h-36">
              <BuildingArt />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {cards.map((card) => (
              <span
                key={card.label}
                className="flex flex-col gap-1.5 rounded-xl border border-slate-100 bg-slate-50/80 px-2 py-2.5 text-slate-500"
              >
                {card.icon}
                <span className="text-[8px] font-semibold leading-tight text-slate-700">
                  {card.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* floating "Get Quote" button */}
      <span className="absolute -top-3 right-6 z-30 hidden rounded-full bg-[#101a3d] px-4 py-2 text-[11px] font-semibold text-white shadow-lg shadow-slate-900/20 sm:block">
        {t.mockQuote}
      </span>

      {/* floating type + colour swatch */}
      <span className="absolute right-[-10px] top-[46%] z-30 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_20px_50px_-25px_rgba(30,41,80,0.6)] backdrop-blur-xl md:inline-flex">
        <span className="text-sm font-bold text-slate-900">Aa</span>
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#101a3d]" />
          <span className="h-3 w-3 rounded-full bg-teal-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-pink-400" />
          <span className="h-3 w-3 rounded-full bg-violet-400" />
        </span>
      </span>

      {/* floating story chip */}
      <span className="absolute -bottom-6 right-2 z-30 hidden max-w-[190px] items-center gap-2.5 rounded-2xl border border-white/70 bg-[#efeaff]/90 px-4 py-3 shadow-[0_20px_50px_-25px_rgba(30,41,80,0.6)] backdrop-blur-xl md:inline-flex">
        <Send className="h-4 w-4 shrink-0 text-violet-600" />
        <span className="text-[11px] font-semibold leading-tight text-slate-700">
          {t.chipStory}
        </span>
      </span>
    </div>
  );
}
