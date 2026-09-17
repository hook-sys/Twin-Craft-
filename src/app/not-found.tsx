import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { routes } from "@/config/app";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-bold">
          পেজটি পাওয়া যায়নি / Page not found
        </h1>
        <p className="mt-3 text-ink-soft">
          লিংকটি ভুল হতে পারে, বা পেজটি সরিয়ে ফেলা হয়েছে।
          <br />
          The link may be wrong, or the page has moved.
        </p>
        <Link href={routes.home} className={buttonClass("primary", "md", "mt-8")}>
          হোমে ফিরুন / Back home
        </Link>
      </div>
    </main>
  );
}
