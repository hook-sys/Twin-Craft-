/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";

export default function ConsultantTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);

  return (
    <div className="min-h-full bg-white font-serif text-neutral-900">
      <header className="border-b-4 border-double border-neutral-800 px-6 py-12">
        <div className="mx-auto max-w-2xl">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="mb-5 h-16 w-16 object-contain"
            />
          )}
          <h1 className="text-3xl tracking-tight">{content.businessName}</h1>
          {content.tagline && (
            <p className="mt-2 italic text-neutral-600">{content.tagline}</p>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {content.about && (
          <section>
            <h2 className="text-sm font-sans font-semibold text-neutral-600">
              {L.intro}
            </h2>
            <p className="mt-4 whitespace-pre-line text-lg leading-loose">
              {content.about}
            </p>
          </section>
        )}

        {content.services.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-sans font-semibold text-neutral-600">
              {L.servicesFormal}
            </h2>
            <ol className="mt-4 space-y-3">
              {content.services.map((service, index) => (
                <li key={service} className="flex gap-4 border-b pb-3">
                  <span className="font-sans text-sm text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{service}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {content.highlights.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-sans font-semibold text-neutral-600">
              {L.credentials}
            </h2>
            <ul className="mt-4 space-y-2">
              {content.highlights.map((item) => (
                <li key={item} className="border-l-2 border-neutral-800 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 border-t-4 border-double border-neutral-800 pt-6">
          <h2 className="text-sm font-sans font-semibold text-neutral-600">
            {L.chamber}
          </h2>
          <div className="mt-4 space-y-1 leading-relaxed">
            {content.address && <p>{content.address}</p>}
            {content.phone && <p>{L.phone}: {content.phone}</p>}
            {content.email && <p>{L.email}: {content.email}</p>}
            {content.hours && <p>{L.meetingHours}: {content.hours}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
