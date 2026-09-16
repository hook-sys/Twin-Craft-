/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";

export default function ManufacturerTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);

  return (
    <div className="min-h-full bg-slate-900 font-sans text-slate-100">
      <header className="border-b-4 border-yellow-500 bg-slate-800 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-5">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="h-16 w-16 bg-white object-contain p-1"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {content.businessName}
            </h1>
            {content.tagline && (
              <p className="mt-1 text-sm text-yellow-500">
                {content.tagline}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {content.highlights.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-yellow-500">
              {L.certifications}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {content.highlights.map((item) => (
                <div
                  key={item}
                  className="border border-yellow-500/50 bg-slate-800 p-4 text-center text-sm font-bold"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.services.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-bold text-yellow-500">
              {L.capacity}
            </h2>
            <table className="mt-4 w-full border-collapse text-sm">
              <tbody>
                {content.services.map((service, index) => (
                  <tr key={service} className="border-b border-slate-700">
                    <td className="w-12 py-3 font-mono text-yellow-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3">{service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {content.about && (
          <section className="mt-10 border-l-4 border-yellow-500 bg-slate-800 p-6">
            <h2 className="text-sm font-bold text-yellow-500">
              {L.profile}
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-300">
              {content.about}
            </p>
          </section>
        )}

        <section className="mt-10 bg-slate-800 p-6">
          <h2 className="text-sm font-bold text-yellow-500">
            {L.exportInquiry}
          </h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {content.address && (
              <div>
                <dt className="text-slate-400">{L.factory}</dt>
                <dd>{content.address}</dd>
              </div>
            )}
            {content.phone && (
              <div>
                <dt className="text-slate-400">{L.phone}</dt>
                <dd>{content.phone}</dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="text-slate-400">{L.email}</dt>
                <dd>{content.email}</dd>
              </div>
            )}
            {content.hours && (
              <div>
                <dt className="text-slate-400">{L.workHours}</dt>
                <dd>{content.hours}</dd>
              </div>
            )}
          </dl>
        </section>
      </main>
    </div>
  );
}
