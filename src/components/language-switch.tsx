import { LANGUAGES, type Lang } from "@/lib/i18n";
import { setLanguage } from "./language-actions";

export default function LanguageSwitch({ current }: { current: Lang }) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 text-xs dark:border-zinc-700">
      {LANGUAGES.map((option) => (
        <form key={option.code} action={setLanguage}>
          <input type="hidden" name="lang" value={option.code} />
          <button
            type="submit"
            aria-pressed={current === option.code}
            className={`px-3 py-1.5 font-medium ${
              current === option.code
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {option.label}
          </button>
        </form>
      ))}
    </div>
  );
}
