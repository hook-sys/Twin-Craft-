/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function ManufacturerTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero] = content.gallery;

  return (
    <div className="min-h-full bg-white font-sans text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-center gap-3">
            {content.logoUrl && (
              <img
                src={content.logoUrl}
                alt=""
                className="h-9 w-9 object-contain"
              />
            )}
            <span className="text-base font-semibold">
              {content.businessName}
            </span>
          </div>
          {content.email && (
            <a
              href={`mailto:${content.email}`}
              className={`hidden text-sm font-semibold text-slate-500 sm:block ${brow}`}
            >
              {L.exportInquiry}
            </a>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-900 text-white">
        {hero && (
          <img
            src={hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        )}
        <div className="relative mx-auto max-w-6xl px-6 py-28">
          {content.tagline && (
            <p className={`text-sm font-semibold text-amber-400 ${brow}`}>
              {content.tagline}
            </p>
          )}
          <h1
            className={`mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] sm:text-7xl ${displayTracking(
              content.language,
            )}`}
          >
            {content.businessName}
          </h1>
        </div>
      </section>

      {content.highlights.length > 0 && (
        <section className="border-b border-slate-200">
          <div className="mx-auto grid max-w-6xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {content.highlights.map((item) => (
              <div key={item} className="px-6 py-10 text-center">
                <p className="text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className={`text-sm font-semibold text-amber-600 ${brow}`}>
            {L.capacity}
          </p>
          <table className="mt-10 w-full border-collapse text-left">
            <tbody>
              {content.services.map((service, index) => (
                <tr key={service} className="border-b border-slate-200">
                  <td className="w-16 py-6 font-mono text-sm text-amber-600">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="py-6 text-xl font-medium">{service}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              {L.profile}
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
              {content.about}
            </p>
          </div>
        </section>
      )}

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className={`text-sm font-semibold text-amber-400 ${brow}`}>
            {L.exportInquiry}
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.address && (
              <div>
                <dt className="text-sm text-slate-400">{L.factory}</dt>
                <dd className="mt-2 text-base text-white">{content.address}</dd>
              </div>
            )}
            {content.phone && (
              <div>
                <dt className="text-sm text-slate-400">{L.phone}</dt>
                <dd className="mt-2 text-base text-white">{content.phone}</dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="text-sm text-slate-400">{L.email}</dt>
                <dd className="mt-2 text-base text-white">{content.email}</dd>
              </div>
            )}
            {content.hours && (
              <div>
                <dt className="text-sm text-slate-400">{L.workHours}</dt>
                <dd className="mt-2 text-base text-white">{content.hours}</dd>
              </div>
            )}
          </dl>
        </div>
      </footer>
    </div>
  );
}
