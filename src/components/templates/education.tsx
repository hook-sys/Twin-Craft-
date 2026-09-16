/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";

export default function EducationTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);

  return (
    <div className="min-h-full bg-indigo-50 font-sans text-indigo-950">
      <header className="bg-gradient-to-br from-indigo-700 to-violet-700 px-6 py-14 text-white">
        <div className="mx-auto max-w-3xl text-center">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-white object-contain p-1"
            />
          )}
          <h1 className="text-3xl font-bold">{content.businessName}</h1>
          {content.tagline && (
            <p className="mt-3 text-indigo-100">{content.tagline}</p>
          )}
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700"
            >
              {L.admissionCta}
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {content.highlights.length > 0 && (
          <section className="grid gap-3 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-indigo-200 bg-white p-5 text-center"
              >
                <p className="font-semibold text-indigo-700">{item}</p>
              </div>
            ))}
          </section>
        )}

        {content.services.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">{L.subjects}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {content.services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-indigo-100"
                >
                  <p className="font-semibold">{service}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.about && (
          <section className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-indigo-100">
            <h2 className="text-xl font-bold">{L.instituteAbout}</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-indigo-900/80">
              {content.about}
            </p>
          </section>
        )}

        <section className="mt-10 rounded-2xl bg-indigo-700 p-6 text-white">
          <h2 className="text-xl font-bold">{L.classInfo}</h2>
          <div className="mt-3 space-y-1 text-indigo-100">
            {content.hours && <p>{L.hours}: {content.hours}</p>}
            {content.address && <p>{content.address}</p>}
            {content.phone && <p>{L.phone}: {content.phone}</p>}
            {content.email && <p>{content.email}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
