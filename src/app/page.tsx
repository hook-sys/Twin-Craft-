export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          Company Profile Maker 🇧🇩
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Hello World! এই সাইটটা এখন লাইভ আছে। বাংলাদেশের ছোট ব্যবসার জন্য
          কোম্পানি প্রোফাইল সাইট বানানোর প্ল্যাটফর্ম এখানেই তৈরি হবে।
        </p>
      </main>
    </div>
  );
}
