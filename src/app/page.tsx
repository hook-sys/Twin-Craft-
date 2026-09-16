import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Company Profile Maker 🇧🇩
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          বাংলাদেশের ছোট ব্যবসার জন্য কোম্পানি প্রোফাইল ওয়েবসাইট — কোডিং ছাড়াই,
          কয়েক মিনিটে।
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white dark:bg-white dark:text-black"
          >
            ফ্রি শুরু করুন
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium dark:border-zinc-700"
          >
            লগইন
          </Link>
        </div>
      </div>
    </main>
  );
}
