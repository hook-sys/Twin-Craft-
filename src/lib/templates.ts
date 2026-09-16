export type Template = {
  id: string;
  name: string;
  description: string;
  page: string;
  hero: string;
  heading: string;
  tagline: string;
  card: string;
  label: string;
  swatch: string;
};

export const templates: Template[] = [
  {
    id: "sonali",
    name: "সোনালি",
    description: "উষ্ণ ও আন্তরিক — দোকান, রেস্তোরাঁ বা বুটিকের জন্য মানানসই।",
    page: "bg-amber-50 text-amber-950",
    hero: "bg-gradient-to-b from-amber-100 to-amber-50 border-b border-amber-200",
    heading: "text-amber-950",
    tagline: "text-amber-800",
    card: "bg-white border border-amber-200",
    label: "text-amber-700",
    swatch: "bg-gradient-to-br from-amber-200 to-amber-400",
  },
  {
    id: "nilambar",
    name: "নীলাম্বর",
    description: "পেশাদার ও নির্ভরযোগ্য — সেবা, পরামর্শ বা অফিসের জন্য।",
    page: "bg-slate-50 text-slate-900",
    hero: "bg-gradient-to-b from-sky-100 to-slate-50 border-b border-sky-200",
    heading: "text-slate-900",
    tagline: "text-slate-600",
    card: "bg-white border border-slate-200",
    label: "text-sky-700",
    swatch: "bg-gradient-to-br from-sky-200 to-sky-500",
  },
  {
    id: "sabuj",
    name: "সবুজ",
    description: "সতেজ ও সহজ — কৃষি, খাবার বা স্বাস্থ্যসেবার জন্য।",
    page: "bg-emerald-50 text-emerald-950",
    hero: "bg-gradient-to-b from-emerald-100 to-emerald-50 border-b border-emerald-200",
    heading: "text-emerald-950",
    tagline: "text-emerald-800",
    card: "bg-white border border-emerald-200",
    label: "text-emerald-700",
    swatch: "bg-gradient-to-br from-emerald-200 to-emerald-500",
  },
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id) ?? templates[0];
}
