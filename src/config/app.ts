export const app = {
  name: "Aladeen",
  tagline: { bn: "আজ সাজান, কাল বড় হোন", en: "Manage Today, Grow Tomorrow" },
  defaultLocale: "bn" as const,
} as const;

/** Every route the app links to, in one place. */
export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  authCallback: "/auth/callback",
  onboarding: "/onboarding",
  dashboard: "/dashboard",
  team: "/dashboard/team",
  companySettings: "/dashboard/settings",
  profile: "/dashboard/profile",
  admin: "/admin",
  adminCompanies: "/admin/companies",
  adminUsers: "/admin/users",
} as const;
