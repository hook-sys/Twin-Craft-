/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function EventTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [cover, ...rest] = content.gallery;

  return (
    <div className="min-h-full bg-[#fdf8f5] font-serif text-[#3b2733]">
      <section className="relative">
        {cover ? (
          <>
            <img src={cover} alt="" className="h-[36rem] w-full object-cover" />
            <div className="absolute inset-0 bg-[#3b2733]/35" />
          </>
        ) : (
          <div className="h-[30rem] w-full bg-gradient-to-br from-rose-200 via-[#fdf8f5] to-rose-300" />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="mb-8 h-20 w-20 rounded-full object-cover"
            />
          )}
          <h1
            className={`max-w-3xl text-5xl italic leading-[1.1] sm:text-7xl ${displayTracking(
              content.language,
            )} ${cover ? "text-white" : "text-[#3b2733]"}`}
          >
            {content.businessName}
          </h1>
          {content.tagline && (
            <p
              className={`mt-6 max-w-xl text-lg ${
                cover ? "text-white/85" : "text-[#3b2733]/70"
              }`}
            >
              {content.tagline}
            </p>
          )}
        </div>
      </section>

      {content.about && (
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className={`text-sm font-semibold text-rose-500 ${brow}`}>
            {L.ourWords}
          </p>
          <p className="mt-8 whitespace-pre-line text-2xl italic leading-[1.8]">
            {content.about}
          </p>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`w-full rounded-2xl object-cover ${
                  index % 5 === 0 ? "sm:col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="border-y border-rose-200 bg-white/70">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <p className={`text-sm font-semibold text-rose-500 ${brow}`}>
              {L.services}
            </p>
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {content.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-rose-300 bg-white px-7 py-3 text-base"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.highlights.length > 0 && (
        <section className="mx-auto grid max-w-5xl gap-8 px-6 py-24 sm:grid-cols-3">
          {content.highlights.map((item) => (
            <p
              key={item}
              className="border-t border-rose-300 pt-6 text-center text-lg"
            >
              {item}
            </p>
          ))}
        </section>
      )}

      <footer className="bg-[#3b2733] text-center text-[#fdf8f5]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="text-4xl italic">{L.eventCta}</h2>
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="mt-10 inline-block rounded-full bg-[#fdf8f5] px-10 py-4 font-sans text-sm font-semibold text-[#3b2733]"
            >
              {content.phone}
            </a>
          )}
          <div className="mt-8 space-y-1 text-sm text-[#fdf8f5]/60">
            {content.email && <p>{content.email}</p>}
            {content.address && <p>{content.address}</p>}
            {content.hours && <p>{content.hours}</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
