/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function ConsultantTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);

  return (
    <div className="min-h-full bg-[#faf9f6] font-serif text-neutral-900">
      <header className="mx-auto max-w-5xl px-6 pb-16 pt-14">
        <div className="flex items-center justify-between gap-6 border-b border-neutral-300 pb-6">
          <div className="flex items-center gap-3">
            {content.logoUrl && (
              <img
                src={content.logoUrl}
                alt=""
                className="h-10 w-10 object-contain"
              />
            )}
            <span className={`font-sans text-sm text-neutral-600 ${brow}`}>
              {content.businessName}
            </span>
          </div>
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="font-sans text-sm text-neutral-600"
            >
              {content.phone}
            </a>
          )}
        </div>

        <h1
          className={`mt-20 max-w-3xl text-5xl leading-[1.08] sm:text-6xl ${displayTracking(
            content.language,
          )}`}
        >
          {content.businessName}
        </h1>
        {content.tagline && (
          <p className="mt-6 max-w-xl text-xl italic text-neutral-600">
            {content.tagline}
          </p>
        )}
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {content.about && (
          <section className="grid gap-10 border-t border-neutral-300 py-16 lg:grid-cols-[14rem_1fr]">
            <h2 className={`font-sans text-sm text-neutral-600 ${brow}`}>
              {L.intro}
            </h2>
            <p className="whitespace-pre-line text-xl leading-[1.9]">
              {content.about}
            </p>
          </section>
        )}

        {content.services.length > 0 && (
          <section className="grid gap-10 border-t border-neutral-300 py-16 lg:grid-cols-[14rem_1fr]">
            <h2 className={`font-sans text-sm text-neutral-600 ${brow}`}>
              {L.servicesFormal}
            </h2>
            <ol>
              {content.services.map((service, index) => (
                <li
                  key={service}
                  className="flex items-baseline gap-6 border-b border-neutral-200 py-5 last:border-0"
                >
                  <span className="font-sans text-sm text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl">{service}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {content.highlights.length > 0 && (
          <section className="grid gap-10 border-t border-neutral-300 py-16 lg:grid-cols-[14rem_1fr]">
            <h2 className={`font-sans text-sm text-neutral-600 ${brow}`}>
              {L.credentials}
            </h2>
            <ul className="space-y-5">
              {content.highlights.map((item) => (
                <li key={item} className="border-l border-neutral-900 pl-5 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="grid gap-10 border-t border-neutral-300 py-16 lg:grid-cols-[14rem_1fr]">
          <h2 className={`font-sans text-sm text-neutral-600 ${brow}`}>
            {L.chamber}
          </h2>
          <dl className="grid gap-6 sm:grid-cols-2">
            {content.address && (
              <div>
                <dt className="font-sans text-sm text-neutral-600">
                  {L.address}
                </dt>
                <dd className="mt-1 text-lg">{content.address}</dd>
              </div>
            )}
            {content.phone && (
              <div>
                <dt className="font-sans text-sm text-neutral-600">
                  {L.phone}
                </dt>
                <dd className="mt-1 text-lg">{content.phone}</dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="font-sans text-sm text-neutral-600">
                  {L.email}
                </dt>
                <dd className="mt-1 text-lg">{content.email}</dd>
              </div>
            )}
            {content.hours && (
              <div>
                <dt className="font-sans text-sm text-neutral-600">
                  {L.meetingHours}
                </dt>
                <dd className="mt-1 text-lg">{content.hours}</dd>
              </div>
            )}
          </dl>
        </section>
      </main>
    </div>
  );
}
