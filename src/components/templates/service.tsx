/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function ServiceTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero] = content.gallery;

  return (
    <div className="min-h-full bg-white font-sans text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {hero && (
          <img
            src={hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}
        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <div className="flex items-center gap-3">
            {content.logoUrl && (
              <img
                src={content.logoUrl}
                alt=""
                className="h-10 w-10 rounded-full bg-white object-contain p-1"
              />
            )}
            <span className={`text-sm font-semibold text-sky-300 ${brow}`}>
              {content.businessName}
            </span>
          </div>

          <h1
            className={`mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl ${displayTracking(
              content.language,
            )}`}
          >
            {content.tagline ?? content.businessName}
          </h1>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            {content.phone && (
              <a
                href={`tel:${content.phone}`}
                className="rounded-full bg-sky-400 px-9 py-4 text-base font-semibold text-slate-950"
              >
                {L.callNow} — {content.phone}
              </a>
            )}
            {content.hours && (
              <span className="text-sm text-slate-300">
                {L.hours}: {content.hours}
              </span>
            )}
          </div>
        </div>
      </section>

      {content.highlights.length > 0 && (
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {content.highlights.map((item) => (
              <p
                key={item}
                className="px-4 py-10 text-center text-base font-medium text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className={`text-sm font-semibold text-sky-700 ${brow}`}>
            {L.workWeDo}
          </p>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {content.services.map((service, index) => (
              <div
                key={service}
                className="flex items-baseline gap-5 border-b border-slate-200 py-7"
              >
                <span className="font-mono text-sm text-sky-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium">{service}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
            <h2
              className={`text-4xl font-semibold leading-tight ${displayTracking(
                content.language,
              )}`}
            >
              {L.identity}
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
              {content.about}
            </p>
          </div>
        </section>
      )}

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className={`text-sm font-semibold text-sky-300 ${brow}`}>
            {L.contact}
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {content.phone && (
              <a
                href={`tel:${content.phone}`}
                className="text-2xl font-semibold text-white"
              >
                {content.phone}
              </a>
            )}
            {content.email && <p className="text-lg">{content.email}</p>}
            {content.address && <p className="text-lg">{content.address}</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
