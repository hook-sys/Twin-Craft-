import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export default async function Home() {
  const lang = await getLang();
  const t = uiLabels(lang);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 py-16 dark:bg-black">
      <LanguageSwitch current={lang} />
      <div className="flex max-w-xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Company Profile Maker 🇧🇩
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t.brandTagline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white dark:bg-white dark:text-black"
          >
            {t.startFree}
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium dark:border-zinc-700"
          >
            {t.login}
          </Link>
        </div>
      </div>
    </main>
  );
}
