/* eslint-disable @next/next/no-img-element */
import type { SiteContent } from "@/lib/site-content";

export default function RetailTemplate({ content }: { content: SiteContent }) {
  return (
    <div className="min-h-full bg-orange-50 font-sans text-orange-950">
      <header className="bg-orange-600 px-6 py-5 text-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          {content.logoUrl ? (
            <img
              src={content.logoUrl}
              alt=""
              className="h-12 w-12 rounded-lg bg-white object-contain p-1"
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl font-black text-orange-600">
              {content.businessName.charAt(0)}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              {content.businessName}
            </h1>
            {content.tagline && (
              <p className="text-sm text-orange-100">{content.tagline}</p>
            )}
          </div>
        </div>
      </header>

      {content.phone && (
        <div className="bg-yellow-400 px-6 py-3 text-center font-bold text-orange-950">
          অর্ডার করতে কল করুন — {content.phone}
        </div>
      )}

      <main className="mx-auto max-w-4xl px-6 py-10">
        {content.services.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-orange-700">
              আমাদের পণ্য
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.services.map((service) => (
                <div
                  key={service}
                  className="rounded-xl border-2 border-orange-200 bg-white p-4 font-bold shadow-sm"
                >
                  {service}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.about && (
          <section className="mt-10 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-orange-700">
              দোকান সম্পর্কে
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed">
              {content.about}
            </p>
          </section>
        )}

        {content.highlights.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {content.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full bg-orange-600 px-4 py-1.5 text-sm font-bold text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <section className="mt-10 rounded-xl border-2 border-dashed border-orange-300 p-6">
          <h2 className="text-lg font-black text-orange-700">
            দোকানের ঠিকানা
          </h2>
          <dl className="mt-3 space-y-1 text-sm">
            {content.address && <dd>{content.address}</dd>}
            {content.hours && <dd>খোলা থাকে: {content.hours}</dd>}
            {content.email && <dd>{content.email}</dd>}
          </dl>
        </section>
      </main>
    </div>
  );
}
