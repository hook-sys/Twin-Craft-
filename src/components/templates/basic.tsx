/* eslint-disable @next/next/no-img-element */
import type { SiteContent } from "@/lib/site-content";

export default function BasicTemplate({ content }: { content: SiteContent }) {
  return (
    <div className="min-h-full bg-white font-sans text-zinc-900">
      <header className="border-b border-zinc-200 px-6 py-14">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          {content.logoUrl ? (
            <img
              src={content.logoUrl}
              alt=""
              className="h-14 w-14 rounded-full object-contain"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-xl font-semibold text-white">
              {content.businessName.charAt(0)}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {content.businessName}
            </h1>
            {content.tagline && (
              <p className="mt-1 text-zinc-600">{content.tagline}</p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {content.about && (
          <section>
            <h2 className="text-sm font-semibold text-zinc-500">
              আমাদের সম্পর্কে
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed">
              {content.about}
            </p>
          </section>
        )}

        {content.services.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-500">
              আমাদের সেবা
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5">
              {content.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </section>
        )}

        {content.highlights.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-zinc-500">
              বিশেষ দিক
            </h2>
            <ul className="mt-3 space-y-1.5">
              {content.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8 rounded-lg bg-zinc-50 p-6">
          <h2 className="text-sm font-semibold text-zinc-500">
            যোগাযোগ
          </h2>
          <div className="mt-3 space-y-1">
            {content.phone && <p>ফোন: {content.phone}</p>}
            {content.email && <p>ইমেইল: {content.email}</p>}
            {content.address && <p>ঠিকানা: {content.address}</p>}
            {content.hours && <p>সময়: {content.hours}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
