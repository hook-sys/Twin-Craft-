import { retailDemo } from "./demo-content";
import type { Lang } from "./i18n";
import type { SiteBadge, SiteContent, SiteItem } from "./site-content";

export type TemplateMeta = {
  id: string;
  name: string;
  audience: string;
  description: string;
  swatch: string;
  /** How many blocks the template renders — shown on the gallery card. */
  sections: number;
  /** Seeds a freshly installed site, and fills the gallery preview. */
  demo: (businessName: string, language: Lang) => SiteContent;
};

type DemoInput = {
  tagline: string;
  about: string;
  items: { title: string; description?: string }[];
  badges: SiteBadge[];
  phone: string;
  email?: string;
  address: string;
  hours: string;
};

function build(
  businessName: string,
  language: Lang,
  input: DemoInput,
): SiteContent {
  const items: SiteItem[] = input.items.map((item) => ({
    title: item.title,
    description: item.description ?? null,
    image: null,
  }));

  return {
    language,
    businessName,
    logoUrl: null,
    tagline: input.tagline,
    heroImage: null,
    about: input.about,
    items,
    badges: input.badges,
    gallery: [],
    phone: input.phone,
    email: input.email ?? null,
    address: input.address,
    hours: input.hours,
    services: items.map((item) => item.title),
    highlights: input.badges.map((badge) => badge.label),
  };
}

export const templates: TemplateMeta[] = [
  {
    id: "retail",
    sections: 7,
    name: "রিটেইল / দোকান",
    audience: "মুদি, ফ্যাশন, ইলেকট্রনিক্স শপ",
    description:
      "ফুল-ব্লিড হিরো, পণ্যের বড় গ্রিড, আইকনসহ ভরসার ব্যান্ড ও স্থির অর্ডার বাটন।",
    swatch: "bg-gradient-to-br from-[#faf8f5] via-amber-300 to-[#1c1917]",
    demo: retailDemo,
  },
  {
    id: "service",
    sections: 5,
    name: "সার্ভিস প্রোভাইডার",
    audience: "ইলেকট্রিশিয়ান, প্লাম্বার, সেলুন",
    description:
      "গাঢ় পটভূমিতে বিশাল শিরোনাম, চোখে পড়ার মতো কল বাটন ও ভরসার ব্যাজ।",
    swatch: "bg-gradient-to-br from-slate-900 via-slate-700 to-sky-400",
    demo: (name, language) =>
      build(name, language, {
        tagline: "২৪ ঘণ্টা বিদ্যুৎ সমস্যার সমাধান",
        about:
          "১৫ বছরের অভিজ্ঞ টেকনিশিয়ান দল। বাসা, অফিস ও দোকানের যেকোনো বৈদ্যুতিক কাজ দ্রুত ও নিরাপদে করে দিই।",
        items: [
          { title: "ওয়্যারিং ও রিওয়্যারিং" },
          { title: "এসি ইনস্টল ও সার্ভিসিং" },
          { title: "জেনারেটর ও আইপিএস সেটআপ" },
          { title: "ফ্যান ও লাইট ফিটিং" },
          { title: "জরুরি মেরামত" },
        ],
        badges: [
          { icon: "clock", label: "২৪/৭ সেবা" },
          { icon: "shield", label: "৬ মাসের গ্যারান্টি" },
          { icon: "badge", label: "অভিজ্ঞ টেকনিশিয়ান" },
        ],
        phone: "01811-000000",
        email: "karimelectric@example.com",
        address: "মিরপুর ১০, ঢাকা",
        hours: "সবসময় খোলা",
      }),
  },
  {
    id: "consultant",
    sections: 5,
    name: "প্রফেশনাল কনসালট্যান্ট",
    audience: "আইনজীবী, অডিটর, ইঞ্জিনিয়ার",
    description:
      "আইভরি জমিনে বড় সিরিফ অক্ষর ও সরু রেখা — ম্যাগাজিনের মতো পরিশীলিত।",
    swatch: "bg-gradient-to-br from-[#faf9f6] via-neutral-300 to-neutral-800",
    demo: (name, language) =>
      build(name, language, {
        tagline: "আইন পরামর্শ ও মামলা পরিচালনা",
        about:
          "ঢাকা জজ কোর্ট ও হাইকোর্ট বিভাগে ২২ বছরের অভিজ্ঞতা। দেওয়ানি, ফৌজদারি ও পারিবারিক আইনে বিশেষ পারদর্শিতা।",
        items: [
          { title: "দেওয়ানি মামলা পরিচালনা" },
          { title: "জমি ও সম্পত্তির দলিল যাচাই" },
          { title: "কোম্পানি নিবন্ধন ও চুক্তিপত্র" },
          { title: "পারিবারিক আইন পরামর্শ" },
        ],
        badges: [
          { icon: "badge", label: "এলএলবি (অনার্স), ঢাকা বিশ্ববিদ্যালয়" },
          { icon: "shield", label: "বাংলাদেশ বার কাউন্সিল সদস্য" },
          { icon: "clock", label: "২২ বছরের অভিজ্ঞতা" },
        ],
        phone: "01911-000000",
        email: "hasan.law@example.com",
        address: "কোর্ট হাউস স্ট্রিট, ঢাকা - ১১০০",
        hours: "রবি - বৃহস্পতি, বিকাল ৪টা - রাত ৮টা",
      }),
  },
  {
    id: "restaurant",
    sections: 5,
    name: "রেস্টুরেন্ট / ক্যাফে",
    audience: "খাবার দোকান, ক্লাউড কিচেন",
    description:
      "প্রায় কালো জমিনে সোনালি সিরিফ, দুই কলামের মেনু ও ছবির স্ট্রিপ।",
    swatch: "bg-gradient-to-br from-[#0f0d0b] via-[#3a2e22] to-amber-300",
    demo: (name, language) =>
      build(name, language, {
        tagline: "পুরান ঢাকার ঐতিহ্যবাহী স্বাদ",
        about:
          "তিন পুরুষ ধরে চলে আসা রেসিপিতে রান্না করা খাঁটি মোগলাই খাবার। প্রতিদিন সকালে তাজা উপকরণ দিয়ে রান্না শুরু হয়।",
        items: [
          { title: "কাচ্চি বিরিয়ানি" },
          { title: "মোরগ পোলাও" },
          { title: "খাসির রেজালা" },
          { title: "চিকেন রোস্ট" },
          { title: "বোরহানি" },
          { title: "ফিরনি" },
        ],
        badges: [
          { icon: "truck", label: "হোম ডেলিভারি" },
          { icon: "tag", label: "পার্টি অর্ডার" },
        ],
        phone: "01611-000000",
        email: "nawabivoj@example.com",
        address: "নাজিরা বাজার, পুরান ঢাকা",
        hours: "দুপুর ১২টা - রাত ১১টা",
      }),
  },
  {
    id: "manufacturer",
    sections: 6,
    name: "ম্যানুফ্যাকচারার / ফ্যাক্টরি",
    audience: "গার্মেন্টস, এক্সপোর্ট ফ্যাক্টরি",
    description:
      "সাদা ও স্লেটের কর্পোরেট সাজ, সার্টিফিকেশন ব্যান্ড ও স্পেক টেবিল।",
    swatch: "bg-gradient-to-br from-white via-slate-400 to-slate-900",
    demo: (name, language) =>
      build(name, language, {
        tagline: "এক্সপোর্ট কোয়ালিটি নিটওয়্যার",
        about:
          "১২০০ শ্রমিক নিয়ে পরিচালিত আমাদের কারখানা মাসে ৫ লক্ষ পিস নিটওয়্যার উৎপাদনে সক্ষম। ইউরোপ ও উত্তর আমেরিকার ক্রেতাদের সাথে দীর্ঘদিনের কাজের অভিজ্ঞতা।",
        items: [
          { title: "নিট ফ্যাব্রিক উৎপাদন" },
          { title: "ডাইং ও ফিনিশিং" },
          { title: "কাটিং ও সুইং" },
          { title: "প্রিন্ট ও এমব্রয়ডারি" },
          { title: "প্যাকেজিং ও শিপমেন্ট" },
        ],
        badges: [
          { icon: "shield", label: "ISO 9001" },
          { icon: "badge", label: "OEKO-TEX" },
          { icon: "shield", label: "BSCI" },
          { icon: "badge", label: "WRAP" },
        ],
        phone: "+880 1511-000000",
        email: "export@meghnatextile.example.com",
        address: "প্লট ৪৫, বিসিক শিল্প নগরী, গাজীপুর",
        hours: "শনি - বৃহস্পতি, সকাল ৮টা - বিকাল ৫টা",
      }),
  },
  {
    id: "event",
    sections: 6,
    name: "ইভেন্ট / ওয়েডিং প্ল্যানার",
    audience: "বিয়ে, গায়ে হলুদ, কর্পোরেট ইভেন্ট",
    description: "ফুল-ব্লিড কভার, ইটালিক সিরিফ ও বড় ছবির মোজাইক গ্যালারি।",
    swatch: "bg-gradient-to-br from-[#fdf8f5] via-rose-300 to-[#3b2733]",
    demo: (name, language) =>
      build(name, language, {
        tagline: "আপনার বিশেষ দিনটি স্মরণীয় করে তুলি",
        about:
          "গায়ে হলুদ থেকে বউভাত — পুরো আয়োজনের সাজসজ্জা, খাবার ও ছবি তোলার দায়িত্ব আমাদের। আপনি শুধু আনন্দ করুন।",
        items: [
          { title: "বিয়ের স্টেজ ডেকোরেশন" },
          { title: "গায়ে হলুদের আয়োজন" },
          { title: "ফটোগ্রাফি ও ভিডিওগ্রাফি" },
          { title: "ক্যাটারিং" },
          { title: "কর্পোরেট ইভেন্ট" },
        ],
        badges: [
          { icon: "badge", label: "৫০০+ সফল আয়োজন" },
          { icon: "sparkle", label: "নিজস্ব ডেকোরেশন টিম" },
          { icon: "tag", label: "বাজেট অনুযায়ী প্যাকেজ" },
        ],
        phone: "01511-111111",
        email: "shubhokkhon@example.com",
        address: "ধানমন্ডি ২৭, ঢাকা",
        hours: "প্রতিদিন সকাল ১০টা - রাত ৮টা",
      }),
  },
  {
    id: "education",
    sections: 5,
    name: "এডুকেশন / কোচিং",
    audience: "টিউটর, কোচিং সেন্টার",
    description: "গাঢ় নেভি হিরো, ভাসমান ফিচার কার্ড ও বিষয়ের পরিচ্ছন্ন গ্রিড।",
    swatch: "bg-gradient-to-br from-[#1b1b3a] via-indigo-500 to-amber-300",
    demo: (name, language) =>
      build(name, language, {
        tagline: "এসএসসি ও এইচএসসি প্রস্তুতির নির্ভরযোগ্য ঠিকানা",
        about:
          "অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে ছোট ব্যাচে পাঠদান। প্রতি সপ্তাহে পরীক্ষা ও অভিভাবক রিপোর্টের ব্যবস্থা আছে।",
        items: [
          { title: "গণিত" },
          { title: "পদার্থবিজ্ঞান" },
          { title: "রসায়ন" },
          { title: "উচ্চতর গণিত" },
          { title: "ইংরেজি" },
          { title: "জীববিজ্ঞান" },
        ],
        badges: [
          { icon: "badge", label: "ব্যাচে সর্বোচ্চ ১৫ জন" },
          { icon: "clock", label: "সাপ্তাহিক পরীক্ষা" },
          { icon: "shield", label: "৯৮% পাসের হার" },
        ],
        phone: "01411-000000",
        email: "unmesh.coaching@example.com",
        address: "কলেজ রোড, ময়মনসিংহ",
        hours: "বিকাল ৩টা - রাত ৯টা",
      }),
  },
  {
    id: "basic",
    sections: 8,
    name: "জেনেরিক / বেসিক",
    audience: "যেকোনো ব্যবসা",
    description:
      "সুইস ধাঁচের ন্যূনতম সাজ — বিশাল অক্ষর, প্রচুর ফাঁকা জায়গা, সরু রেখা।",
    swatch: "bg-gradient-to-br from-white via-zinc-300 to-zinc-900",
    demo: (name, language) =>
      build(name, language, {
        tagline: "এক লাইনে আপনার পরিচয়",
        about:
          "এখানে আপনার ব্যবসার গল্প লিখুন — কবে শুরু করেছেন, কী কী করেন, আর গ্রাহকরা কেন আপনাকে বেছে নেবেন।",
        items: [
          { title: "প্রথম সেবা" },
          { title: "দ্বিতীয় সেবা" },
          { title: "তৃতীয় সেবা" },
        ],
        badges: [
          { icon: "sparkle", label: "বিশেষ দিক এক" },
          { icon: "sparkle", label: "বিশেষ দিক দুই" },
        ],
        phone: "01XXXXXXXXX",
        email: "your@email.com",
        address: "আপনার ঠিকানা",
        hours: "সকাল ৯টা - সন্ধ্যা ৬টা",
      }),
  },
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id) ?? templates[7];
}
