import LanguageSwitch from "@/components/language-switch";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const lang = await getLang();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      <LanguageSwitch current={lang} />
      <SignupForm t={uiLabels(lang)} />
    </main>
  );
}
