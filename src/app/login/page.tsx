import LanguageSwitch from "@/components/language-switch";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const lang = await getLang();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      <LanguageSwitch current={lang} />
      <LoginForm t={uiLabels(lang)} />
    </main>
  );
}
