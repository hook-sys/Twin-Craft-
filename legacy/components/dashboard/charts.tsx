/** Grouped bar chart, drawn with plain elements so no chart library is needed. */
export function BarChart({
  data,
  max,
  axis,
}: {
  data: { label: string; a: number; b: number }[];
  max: number;
  axis: string[];
}) {
  return (
    <div className="mt-6 flex gap-3">
      <div className="flex w-10 shrink-0 flex-col justify-between py-1 text-right text-[11px] text-slate-400">
        {axis.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="absolute inset-0 flex flex-col justify-between">
          {axis.map((tick) => (
            <span key={tick} className="h-px w-full bg-slate-100" />
          ))}
        </div>

        <div className="relative flex h-44 items-end justify-between gap-2">
          {data.map((point) => (
            <div
              key={point.label}
              className="flex h-full min-w-0 flex-1 items-end justify-center gap-1.5"
            >
              <span
                className="w-3.5 rounded-t-[4px] bg-[#bfdbfe] sm:w-5"
                style={{ height: `${Math.round((point.a / max) * 100)}%` }}
              />
              <span
                className="w-3.5 rounded-t-[4px] bg-[#2563eb] sm:w-5"
                style={{ height: `${Math.round((point.b / max) * 100)}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between gap-2">
          {data.map((point) => (
            <span
              key={point.label}
              className="min-w-0 flex-1 truncate text-center text-[11px] text-slate-500"
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Donut, drawn as a single SVG circle with dash offsets per slice. */
export function Donut({
  slices,
  centerValue,
  centerLabel,
}: {
  slices: { label: string; value: number; color: string }[];
  centerValue: string;
  centerLabel: string;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // Precompute each slice's arc and its start offset: the SVG is rendered from
  // this list, so nothing mutates while React is building the tree.
  const arcs: { label: string; color: string; length: number; start: number }[] =
    [];
  for (const slice of slices) {
    const length = (slice.value / total) * circumference;
    arcs.push({
      label: slice.label,
      color: slice.color,
      length,
      start: arcs.reduce((sum, arc) => sum + arc.length, 0),
    });
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#eef2f7"
            strokeWidth="22"
          />
          {arcs.map((arc) => {
            const drawn = Math.max(arc.length - 3, 0);
            return (
              <circle
                key={arc.label}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth="22"
                strokeLinecap="round"
                strokeDasharray={`${drawn} ${circumference - drawn}`}
                strokeDashoffset={-arc.start}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold">{centerValue}</span>
          <span className="mt-0.5 text-[11px] text-slate-500">
            {centerLabel}
          </span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-3">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: slice.color }}
            />
            <span className="min-w-0 flex-1 truncate text-slate-600">
              {slice.label}
            </span>
            <span className="shrink-0 font-semibold">
              {Math.round((slice.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
