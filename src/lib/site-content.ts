import { isLang, type Lang } from "./i18n";

export type IconName =
  | "truck"
  | "shield"
  | "badge"
  | "clock"
  | "tag"
  | "sparkle";

export type SiteItem = {
  title: string;
  description: string | null;
  image: string | null;
};

export type SiteBadge = {
  icon: IconName;
  label: string;
};

/**
 * The whole of a site's content, stored as one JSON document so a new template
 * is a new component — never a migration.
 */
export type SiteContent = {
  language: Lang;
  businessName: string;
  logoUrl: string | null;
  tagline: string | null;
  heroImage: string | null;
  about: string | null;
  items: SiteItem[];
  badges: SiteBadge[];
  gallery: string[];
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;

  /** Flat views the older templates still read; always derived, never stored. */
  services: string[];
  highlights: string[];
};

const ICONS: IconName[] = ["truck", "shield", "badge", "clock", "tag", "sparkle"];

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function strList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
}

function items(value: unknown): SiteItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw) => {
    if (typeof raw !== "object" || raw === null) return [];
    const row = raw as Record<string, unknown>;
    const title = str(row.title);
    if (!title) return [];
    return [
      { title, description: str(row.description), image: str(row.image) },
    ];
  });
}

function badges(value: unknown): SiteBadge[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw) => {
    if (typeof raw !== "object" || raw === null) return [];
    const row = raw as Record<string, unknown>;
    const label = str(row.label);
    if (!label) return [];
    const icon = row.icon;
    return [
      {
        label,
        icon: ICONS.includes(icon as IconName) ? (icon as IconName) : "sparkle",
      },
    ];
  });
}

/** Content arrives from the database as untrusted JSON, so every field is checked. */
export function parseSiteContent(value: unknown): SiteContent {
  const row = (typeof value === "object" && value !== null ? value : {}) as Record<
    string,
    unknown
  >;

  const parsedItems = items(row.items);
  const parsedBadges = badges(row.badges);

  return {
    language: isLang(row.language) ? row.language : "bn",
    businessName: str(row.businessName) ?? "",
    logoUrl: str(row.logoUrl),
    tagline: str(row.tagline),
    heroImage: str(row.heroImage),
    about: str(row.about),
    items: parsedItems,
    badges: parsedBadges,
    gallery: strList(row.gallery),
    phone: str(row.phone),
    email: str(row.email),
    address: str(row.address),
    hours: str(row.hours),
    services: parsedItems.map((item) => item.title),
    highlights: parsedBadges.map((badge) => badge.label),
  };
}

/** The stored shape: the derived views are dropped before writing. */
export function toStoredContent(content: SiteContent) {
  return {
    language: content.language,
    businessName: content.businessName,
    logoUrl: content.logoUrl,
    tagline: content.tagline,
    heroImage: content.heroImage,
    about: content.about,
    items: content.items,
    badges: content.badges,
    gallery: content.gallery,
    phone: content.phone,
    email: content.email,
    address: content.address,
    hours: content.hours,
  };
}
