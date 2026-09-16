/* eslint-disable @next/next/no-img-element */
import type { SiteContent } from "@/lib/site-content";

export default function RestaurantTemplate({
  content,
}: {
  content: SiteContent;
}) {
  return (
    <div className="min-h-full bg-neutral-900 font-serif text-amber-50">
      <header className="border-b border-amber-700/40 px-6 py-16 text-center">
        {content.logoUrl && (
          <img
            src={content.logoUrl}
            alt=""
            className="mx-auto mb-6 h-20 w-20 rounded-full object-cover ring-2 ring-amber-500"
          />
        )}
        <p className="text-sm font-semibold text-amber-500">
          স্বাগতম
        </p>
        <h1 className="mt-3 text-4xl tracking-wide text-amber-100">
          {content.businessName}
        </h1>
        {content.tagline && (
          <p className="mx-auto mt-3 max-w-md italic text-amber-200/70">
            {content.tagline}
          </p>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        {content.services.length > 0 && (
          <section>
            <h2 className="text-center text-sm font-semibold text-amber-500">
              আমাদের মেনু
            </h2>
            <ul className="mt-6 space-y-4">
              {content.services.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-lg text-amber-50"
                >
                  <span>{item}</span>
                  <span className="flex-1 border-b border-dotted border-amber-700/50" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.about && (
          <section className="mt-12 text-center">
            <h2 className="text-sm font-semibold text-amber-500">
              আমাদের গল্প
            </h2>
            <p className="mt-4 whitespace-pre-line leading-loose text-amber-100/80">
              {content.about}
            </p>
          </section>
        )}

        {content.gallery.length > 0 && (
          <section className="mt-12 grid grid-cols-3 gap-2">
            {content.gallery.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="aspect-square w-full rounded object-cover"
              />
            ))}
          </section>
        )}

        <section className="mt-12 border-t border-amber-700/40 pt-8 text-center">
          {content.hours && (
            <p className="text-amber-200">খোলা থাকে: {content.hours}</p>
          )}
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="mt-4 inline-block rounded-full border border-amber-500 px-8 py-3 text-amber-200"
            >
              টেবিল বুক করুন — {content.phone}
            </a>
          )}
          {content.address && (
            <p className="mt-4 text-sm text-amber-200/60">{content.address}</p>
          )}
        </section>
      </main>
    </div>
  );
}
