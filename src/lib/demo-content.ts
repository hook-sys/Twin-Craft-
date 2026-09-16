import type { Lang } from "./i18n";
import type { SiteContent } from "./site-content";

/**
 * Seeded into a new site so the owner lands on a finished-looking page they
 * can edit, rather than an empty form.
 */
export function retailDemo(businessName: string, language: Lang): SiteContent {
  const bn = language === "bn";

  const content = bn
    ? {
        tagline: "এলাকার সবচেয়ে বিশ্বস্ত দোকান",
        about:
          "আমরা ১৯৯৮ সাল থেকে এলাকাবাসীর নিত্যপ্রয়োজনীয় পণ্য সরবরাহ করে আসছি। প্রতিটি পণ্যে ন্যায্য দাম আর সঠিক ওজনের নিশ্চয়তা — এটাই আমাদের পরিচয়।\n\nএখানে আপনার দোকানের নিজের গল্প লিখুন: কবে শুরু করেছেন, কী কী পাওয়া যায়, আর গ্রাহকরা কেন আপনার কাছেই আসেন।",
        items: [
          { title: "চাল, ডাল ও মসলা", description: "প্রতিদিনের রান্নার সব উপকরণ" },
          { title: "ভোজ্য তেল", description: "সরিষা, সয়াবিন ও রাইস ব্র্যান" },
          { title: "প্রসাধনী সামগ্রী", description: "সাবান, শ্যাম্পু, টুথপেস্ট" },
          { title: "শিশু খাদ্য", description: "গুঁড়ো দুধ ও বেবি ফুড" },
          { title: "গৃহস্থালি পণ্য", description: "ঝাড়ু, বালতি, ডিটারজেন্ট" },
          { title: "কোমল পানীয়", description: "ঠান্ডা পানীয় ও জুস" },
        ],
        badges: [
          { icon: "truck" as const, label: "ফ্রি হোম ডেলিভারি" },
          { icon: "shield" as const, label: "১০০% আসল পণ্য" },
          { icon: "badge" as const, label: "২৫ বছরের বিশ্বাস" },
        ],
        address: "১২ নম্বর দোকান, নিউ মার্কেট, ঢাকা",
        hours: "সকাল ৮টা - রাত ১০টা",
      }
    : {
        tagline: "The neighbourhood's most trusted shop",
        about:
          "We have supplied this neighbourhood with everyday essentials since 1998. Fair prices and honest weights — that is what we are known for.\n\nWrite your own shop's story here: when you started, what you stock, and why customers keep coming back.",
        items: [
          { title: "Rice, lentils & spices", description: "Everything for daily cooking" },
          { title: "Cooking oil", description: "Mustard, soybean and rice bran" },
          { title: "Toiletries", description: "Soap, shampoo, toothpaste" },
          { title: "Baby food", description: "Powdered milk and baby meals" },
          { title: "Household goods", description: "Brooms, buckets, detergent" },
          { title: "Cold drinks", description: "Soft drinks and juices" },
        ],
        badges: [
          { icon: "truck" as const, label: "Free home delivery" },
          { icon: "shield" as const, label: "100% genuine products" },
          { icon: "badge" as const, label: "Trusted for 25 years" },
        ],
        address: "Shop 12, New Market, Dhaka",
        hours: "8am - 10pm",
      };

  return {
    language,
    businessName,
    logoUrl: null,
    tagline: content.tagline,
    heroImage: null,
    about: content.about,
    items: content.items.map((item) => ({ ...item, image: null })),
    badges: content.badges,
    gallery: [],
    phone: "01711-000000",
    email: null,
    address: content.address,
    hours: content.hours,
    services: content.items.map((item) => item.title),
    highlights: content.badges.map((badge) => badge.label),
  };
}
