/* eslint-disable @next/next/no-img-element */
import type { SiteContent } from "@/lib/site-content";

export default function ServiceTemplate({ content }: { content: SiteContent }) {
  return (
    <div className="min-h-full bg-slate-100 font-sans text-slate-900">
      <header className="bg-blue-800 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="mb-4 h-14 w-14 rounded-full bg-white object-contain p-1"
            />
          )}
          <h1 className="text-3xl font-bold">{content.businessName}</h1>
          {content.tagline && (
            <p className="mt-2 text-lg text-blue-100">{content.tagline}</p>
          )}

          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 text-lg font-bold text-blue-950"
            >
              📞 এখনই কল করুন: {content.phone}
            </a>
          )}
          {content.hours && (
            <p className="mt-3 text-sm text-blue-200">সময়: {content.hours}</p>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {content.services.length > 0 && (
          <section>
            <h2 className="text-xl font-bold">আমরা যে কাজগুলো করি</h2>
            <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl bg-white">
              {content.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 px-5 py-4 font-medium"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                    ✓
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.highlights.length > 0 && (
          <section className="mt-8 grid gap-3 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl bg-blue-800 p-4 text-center text-sm font-semibold text-white"
              >
                {item}
              </div>
            ))}
          </section>
        )}

        {content.about && (
          <section className="mt-8 rounded-xl bg-white p-6">
            <h2 className="text-xl font-bold">আমাদের পরিচয়</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
              {content.about}
            </p>
          </section>
        )}

        <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6">
          <h2 className="text-xl font-bold">যোগাযোগ</h2>
          <div className="mt-3 space-y-1 text-slate-700">
            {content.address && <p>{content.address}</p>}
            {content.email && <p>{content.email}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
