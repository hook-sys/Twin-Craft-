import type { Metadata } from "next";
import { app } from "@/config/app";
import { getLang } from "@/lib/lang";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${app.name} — ${app.tagline.en}`,
    template: `%s · ${app.name}`,
  },
  description:
    "Aladeen — company website builder, CRM, inventory, accounts and HR for small businesses.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
