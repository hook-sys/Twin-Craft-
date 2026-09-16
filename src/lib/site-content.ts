import { isLang, type Lang } from "./i18n";

/**
 * Every template renders from this one shape, so adding a design means
 * writing a component — never touching the data model or the editor.
 */
export type SiteContent = {
  language: Lang;
  businessName: string;
  logoUrl: string | null;
  tagline: string | null;
  about: string | null;
  services: string[];
  highlights: string[];
  gallery: string[];
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
};

export type SiteRow = {
  language: string;
  business_name: string;
  logo_url: string | null;
  tagline: string | null;
  about: string | null;
  services: string[] | null;
  highlights: string[] | null;
  gallery: string[] | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
};

export const SITE_COLUMNS =
  "language, business_name, logo_url, tagline, about, services, highlights, gallery, phone, email, address, hours";

export function toSiteContent(row: SiteRow): SiteContent {
  return {
    language: isLang(row.language) ? row.language : "bn",
    businessName: row.business_name,
    logoUrl: row.logo_url,
    tagline: row.tagline,
    about: row.about,
    services: row.services ?? [],
    highlights: row.highlights ?? [],
    gallery: row.gallery ?? [],
    phone: row.phone,
    email: row.email,
    address: row.address,
    hours: row.hours,
  };
}
