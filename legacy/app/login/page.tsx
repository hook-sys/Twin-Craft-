import AuthShell from "@/components/marketing/auth-shell";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  return (
    <AuthShell
      lang={lang}
      t={t}
      titleA={t.loginSideTitleA}
      titleB={t.loginSideTitleB}
      altPrompt={t.noAccount}
      altLabel={t.signupTitle}
      altHref="/signup"
    >
      <LoginForm t={t} />
    </AuthShell>
  );
}
