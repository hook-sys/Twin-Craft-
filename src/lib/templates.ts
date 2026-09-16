import type { SiteContent } from "./site-content";

export type TemplateMeta = {
  id: string;
  name: string;
  audience: string;
  description: string;
  swatch: string;
  sample: SiteContent;
};

const placeholder = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="400" height="500" fill="hsl(${hue} 55% 82%)"/><circle cx="200" cy="230" r="70" fill="hsl(${hue} 45% 72%)"/></svg>`,
  )}`;

export const templates: TemplateMeta[] = [
  {
    id: "retail",
    name: "রিটেইল / দোকান",
    audience: "মুদি, ফ্যাশন, ইলেকট্রনিক্স শপ",
    description: "উজ্জ্বল কমলা রঙ, পণ্যের গ্রিড আর উপরে বড় করে অর্ডারের নম্বর।",
    swatch: "bg-gradient-to-br from-orange-400 to-yellow-400",
    sample: {
      language: "bn",
      businessName: "রহিম ভ্যারাইটিজ স্টোর",
      logoUrl: null,
      tagline: "এলাকার সবচেয়ে সাশ্রয়ী দোকান",
      about:
        "১৯৯৮ সাল থেকে আমরা এলাকাবাসীর নিত্যপ্রয়োজনীয় পণ্য সরবরাহ করে আসছি। সব পণ্যে ন্যায্য দাম ও সঠিক ওজনের নিশ্চয়তা।",
      services: [
        "চাল, ডাল ও মসলা",
        "ভোজ্য তেল",
        "প্রসাধনী সামগ্রী",
        "শিশু খাদ্য",
        "গৃহস্থালি পণ্য",
        "কোমল পানীয়",
      ],
      highlights: ["হোম ডেলিভারি", "বাকিতে বিক্রি নেই", "১০০% আসল পণ্য"],
      gallery: [],
      phone: "01711-000000",
      email: "rahimstore@example.com",
      address: "১২ নং দোকান, নিউ মার্কেট, ঢাকা",
      hours: "সকাল ৮টা - রাত ১০টা",
    },
  },
  {
    id: "service",
    name: "সার্ভিস প্রোভাইডার",
    audience: "ইলেকট্রিশিয়ান, প্লাম্বার, সেলুন",
    description: "নীল ও নির্ভরযোগ্য সাজ, সবার উপরে বড় কল বাটন।",
    swatch: "bg-gradient-to-br from-blue-500 to-blue-800",
    sample: {
      language: "bn",
      businessName: "করিম ইলেকট্রিক সার্ভিস",
      logoUrl: null,
      tagline: "২৪ ঘণ্টা বিদ্যুৎ সমস্যার সমাধান",
      about:
        "১৫ বছরের অভিজ্ঞ টেকনিশিয়ান দল। বাসা, অফিস ও দোকানের যেকোনো বৈদ্যুতিক কাজ দ্রুত ও নিরাপদে করে দিই।",
      services: [
        "ওয়্যারিং ও রিওয়্যারিং",
        "এসি ইনস্টল ও সার্ভিসিং",
        "জেনারেটর ও আইপিএস সেটআপ",
        "ফ্যান ও লাইট ফিটিং",
        "জরুরি মেরামত",
      ],
      highlights: ["২৪/৭ সেবা", "৬ মাসের গ্যারান্টি", "অভিজ্ঞ টেকনিশিয়ান"],
      gallery: [],
      phone: "01811-000000",
      email: "karimelectric@example.com",
      address: "মিরপুর ১০, ঢাকা",
      hours: "সবসময় খোলা",
    },
  },
  {
    id: "consultant",
    name: "প্রফেশনাল কনসালট্যান্ট",
    audience: "আইনজীবী, অডিটর, ইঞ্জিনিয়ার",
    description: "সাদা জমিনে সিরিফ টাইপোগ্রাফি — নথির মতো আনুষ্ঠানিক ও পেশাদার।",
    swatch: "bg-gradient-to-br from-neutral-300 to-neutral-700",
    sample: {
      language: "bn",
      businessName: "অ্যাডভোকেট এ. কে. এম. হাসান",
      logoUrl: null,
      tagline: "আইন পরামর্শ ও মামলা পরিচালনা",
      about:
        "ঢাকা জজ কোর্ট ও হাইকোর্ট বিভাগে ২২ বছরের অভিজ্ঞতা। দেওয়ানি, ফৌজদারি ও পারিবারিক আইনে বিশেষ পারদর্শিতা।",
      services: [
        "দেওয়ানি মামলা পরিচালনা",
        "জমি ও সম্পত্তির দলিল যাচাই",
        "কোম্পানি নিবন্ধন ও চুক্তিপত্র",
        "পারিবারিক আইন পরামর্শ",
      ],
      highlights: [
        "এলএলবি (অনার্স), ঢাকা বিশ্ববিদ্যালয়",
        "বাংলাদেশ বার কাউন্সিল সদস্য",
        "২২ বছরের অভিজ্ঞতা",
      ],
      gallery: [],
      phone: "01911-000000",
      email: "hasan.law@example.com",
      address: "কোর্ট হাউস স্ট্রিট, ঢাকা - ১১০০",
      hours: "রবি - বৃহস্পতি, বিকাল ৪টা - রাত ৮টা",
    },
  },
  {
    id: "restaurant",
    name: "রেস্টুরেন্ট / ক্যাফে",
    audience: "খাবার দোকান, ক্লাউড কিচেন",
    description: "গাঢ় পটভূমিতে সোনালি লেখা, মেনু-কার্ডের মতো সাজানো।",
    swatch: "bg-gradient-to-br from-neutral-800 to-amber-700",
    sample: {
      language: "bn",
      businessName: "নবাবি ভোজ",
      logoUrl: null,
      tagline: "পুরান ঢাকার ঐতিহ্যবাহী স্বাদ",
      about:
        "তিন পুরুষ ধরে চলে আসা রেসিপিতে রান্না করা খাঁটি মোগলাই খাবার। প্রতিদিন সকালে তাজা উপকরণ দিয়ে রান্না শুরু হয়।",
      services: [
        "কাচ্চি বিরিয়ানি",
        "মোরগ পোলাও",
        "খাসির রেজালা",
        "চিকেন রোস্ট",
        "বোরহানি",
        "ফিরনি",
      ],
      highlights: ["হোম ডেলিভারি", "পার্টি অর্ডার"],
      gallery: [placeholder(30), placeholder(45), placeholder(15)],
      phone: "01611-000000",
      email: "nawabivoj@example.com",
      address: "নাজিরা বাজার, পুরান ঢাকা",
      hours: "দুপুর ১২টা - রাত ১১টা",
    },
  },
  {
    id: "manufacturer",
    name: "ম্যানুফ্যাকচারার / ফ্যাক্টরি",
    audience: "গার্মেন্টস, এক্সপোর্ট ফ্যাক্টরি",
    description: "শিল্প-ধাঁচের গাঢ় ধূসর ও হলুদ, সার্টিফিকেশন সামনে রাখা।",
    swatch: "bg-gradient-to-br from-slate-700 to-yellow-500",
    sample: {
      language: "bn",
      businessName: "মেঘনা টেক্সটাইল মিলস লিমিটেড",
      logoUrl: null,
      tagline: "এক্সপোর্ট কোয়ালিটি নিটওয়্যার",
      about:
        "১২০০ শ্রমিক নিয়ে পরিচালিত আমাদের কারখানা মাসে ৫ লক্ষ পিস নিটওয়্যার উৎপাদনে সক্ষম। ইউরোপ ও উত্তর আমেরিকার ক্রেতাদের সাথে দীর্ঘদিনের কাজের অভিজ্ঞতা।",
      services: [
        "নিট ফ্যাব্রিক উৎপাদন",
        "ডাইং ও ফিনিশিং",
        "কাটিং ও সুইং",
        "প্রিন্ট ও এমব্রয়ডারি",
        "প্যাকেজিং ও শিপমেন্ট",
      ],
      highlights: ["ISO 9001", "OEKO-TEX", "BSCI", "WRAP"],
      gallery: [],
      phone: "+880 1511-000000",
      email: "export@meghnatextile.example.com",
      address: "প্লট ৪৫, বিসিক শিল্প নগরী, গাজীপুর",
      hours: "শনি - বৃহস্পতি, সকাল ৮টা - বিকাল ৫টা",
    },
  },
  {
    id: "event",
    name: "ইভেন্ট / ওয়েডিং প্ল্যানার",
    audience: "বিয়ে, গায়ে হলুদ, কর্পোরেট ইভেন্ট",
    description: "গোলাপি ও কোমল, বড় ছবির গ্যালারিই মূল আকর্ষণ।",
    swatch: "bg-gradient-to-br from-rose-300 to-pink-500",
    sample: {
      language: "bn",
      businessName: "শুভক্ষণ ইভেন্টস",
      logoUrl: null,
      tagline: "আপনার বিশেষ দিনটি স্মরণীয় করে তুলি",
      about:
        "গায়ে হলুদ থেকে বউভাত — পুরো আয়োজনের সাজসজ্জা, খাবার ও ছবি তোলার দায়িত্ব আমাদের। আপনি শুধু আনন্দ করুন।",
      services: [
        "বিয়ের স্টেজ ডেকোরেশন",
        "গায়ে হলুদের আয়োজন",
        "ফটোগ্রাফি ও ভিডিওগ্রাফি",
        "ক্যাটারিং",
        "কর্পোরেট ইভেন্ট",
      ],
      highlights: [
        "৫০০+ সফল আয়োজন",
        "নিজস্ব ডেকোরেশন টিম",
        "বাজেট অনুযায়ী প্যাকেজ",
      ],
      gallery: [
        placeholder(340),
        placeholder(350),
        placeholder(320),
        placeholder(10),
        placeholder(330),
        placeholder(300),
      ],
      phone: "01511-111111",
      email: "shubhokkhon@example.com",
      address: "ধানমন্ডি ২৭, ঢাকা",
      hours: "প্রতিদিন সকাল ১০টা - রাত ৮টা",
    },
  },
  {
    id: "education",
    name: "এডুকেশন / কোচিং",
    audience: "টিউটর, কোচিং সেন্টার",
    description: "বেগুনি-নীল গ্রেডিয়েন্ট, বিষয়ভিত্তিক কার্ড ও ভর্তির বাটন।",
    swatch: "bg-gradient-to-br from-indigo-500 to-violet-600",
    sample: {
      language: "bn",
      businessName: "উন্মেষ কোচিং সেন্টার",
      logoUrl: null,
      tagline: "এসএসসি ও এইচএসসি প্রস্তুতির নির্ভরযোগ্য ঠিকানা",
      about:
        "অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে ছোট ব্যাচে পাঠদান। প্রতি সপ্তাহে পরীক্ষা ও অভিভাবক রিপোর্টের ব্যবস্থা আছে।",
      services: [
        "গণিত",
        "পদার্থবিজ্ঞান",
        "রসায়ন",
        "উচ্চতর গণিত",
        "ইংরেজি",
        "জীববিজ্ঞান",
      ],
      highlights: ["ব্যাচে সর্বোচ্চ ১৫ জন", "সাপ্তাহিক পরীক্ষা", "৯৮% পাসের হার"],
      gallery: [],
      phone: "01411-000000",
      email: "unmesh.coaching@example.com",
      address: "কলেজ রোড, ময়মনসিংহ",
      hours: "বিকাল ৩টা - রাত ৯টা",
    },
  },
  {
    id: "basic",
    name: "জেনেরিক / বেসিক",
    audience: "যেকোনো ব্যবসা",
    description: "সাদামাটা ও নিরপেক্ষ — কোনো ধরনের ব্যবসাতেই মানিয়ে যায়।",
    swatch: "bg-gradient-to-br from-zinc-200 to-zinc-500",
    sample: {
      language: "bn",
      businessName: "আপনার প্রতিষ্ঠানের নাম",
      logoUrl: null,
      tagline: "এক লাইনে আপনার পরিচয়",
      about:
        "এখানে আপনার ব্যবসার গল্প লিখুন — কবে শুরু করেছেন, কী কী করেন, আর গ্রাহকরা কেন আপনাকে বেছে নেবেন।",
      services: ["প্রথম সেবা", "দ্বিতীয় সেবা", "তৃতীয় সেবা"],
      highlights: ["বিশেষ দিক এক", "বিশেষ দিক দুই"],
      gallery: [],
      phone: "01XXXXXXXXX",
      email: "your@email.com",
      address: "আপনার ঠিকানা",
      hours: "সকাল ৯টা - সন্ধ্যা ৬টা",
    },
  },
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id) ?? templates[7];
}
