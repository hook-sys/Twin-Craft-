import AuthShell from "@/components/marketing/auth-shell";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  return (
    <AuthShell
      lang={lang}
      t={t}
      titleA={t.signupSideTitleA}
      titleB={t.signupSideTitleB}
      altPrompt={t.haveAccount}
      altLabel={t.login}
      altHref="/login"
    >
      <SignupForm t={t} />
    </AuthShell>
  );
}
