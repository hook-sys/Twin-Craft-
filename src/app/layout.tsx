import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Profile Maker",
  description: "বাংলাদেশের ছোট ব্যবসার জন্য কোম্পানি প্রোফাইল সাইট বানানোর প্ল্যাটফর্ম",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
