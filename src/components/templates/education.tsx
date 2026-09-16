/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function EducationTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero] = content.gallery;

  return (
    <div className="min-h-full bg-[#fbfaf7] font-sans text-[#1b1b3a]">
      <section className="bg-[#1b1b3a] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {content.logoUrl && (
                <img
                  src={content.logoUrl}
                  alt=""
                  className="h-10 w-10 rounded-xl bg-white object-contain p-1"
                />
              )}
              <span className={`text-sm font-semibold text-amber-300 ${brow}`}>
                {content.businessName}
              </span>
            </div>

            <h1
              className={`mt-8 text-4xl font-semibold leading-[1.1] sm:text-6xl ${displayTracking(
                content.language,
              )}`}
            >
              {content.tagline ?? content.businessName}
            </h1>

            {content.phone && (
              <a
                href={`tel:${content.phone}`}
                className="mt-10 inline-block rounded-xl bg-amber-300 px-8 py-4 text-base font-semibold text-[#1b1b3a]"
              >
                {L.admissionCta}
              </a>
            )}
          </div>

          <div className="overflow-hidden rounded-3xl">
            {hero ? (
              <img
                src={hero}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-indigo-400 to-violet-600" />
            )}
          </div>
        </div>
      </section>

      {content.highlights.length > 0 && (
        <section className="mx-auto -mt-12 max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <p
                key={item}
                className="rounded-2xl bg-white p-8 text-center text-lg font-semibold shadow-sm ring-1 ring-black/5"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className={`text-sm font-semibold text-indigo-600 ${brow}`}>
            {L.subjects}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => (
              <div
                key={service}
                className="rounded-2xl border border-[#1b1b3a]/10 bg-white p-7"
              >
                <span className="font-mono text-xs text-indigo-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-medium">{service}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="border-y border-[#1b1b3a]/10 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
            <h2
              className={`text-4xl font-semibold leading-tight ${displayTracking(
                content.language,
              )}`}
            >
              {L.instituteAbout}
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-[#1b1b3a]/75">
              {content.about}
            </p>
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-6xl px-6 py-20">
        <p className={`text-sm font-semibold text-indigo-600 ${brow}`}>
          {L.classInfo}
        </p>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.hours && (
            <div>
              <dt className="text-sm text-[#1b1b3a]/50">{L.hours}</dt>
              <dd className="mt-1 text-lg">{content.hours}</dd>
            </div>
          )}
          {content.address && (
            <div>
              <dt className="text-sm text-[#1b1b3a]/50">{L.address}</dt>
              <dd className="mt-1 text-lg">{content.address}</dd>
            </div>
          )}
          {content.phone && (
            <div>
              <dt className="text-sm text-[#1b1b3a]/50">{L.phone}</dt>
              <dd className="mt-1 text-lg">{content.phone}</dd>
            </div>
          )}
          {content.email && (
            <div>
              <dt className="text-sm text-[#1b1b3a]/50">{L.email}</dt>
              <dd className="mt-1 text-lg">{content.email}</dd>
            </div>
          )}
        </dl>
      </footer>
    </div>
  );
}
