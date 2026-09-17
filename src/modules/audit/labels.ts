/** Human sentences for the actions the audit log records. */
export const auditLabels: Record<string, { bn: string; en: string }> = {
  "company.created": { bn: "কোম্পানি তৈরি হয়েছে", en: "Company created" },
  "company.updated": { bn: "কোম্পানির তথ্য বদলানো হয়েছে", en: "Company details updated" },
  "member.role_changed": { bn: "সদস্যের ভূমিকা বদলানো হয়েছে", en: "Member role changed" },
  "member.removed": { bn: "সদস্য সরানো হয়েছে", en: "Member removed" },
  "profile.updated": { bn: "প্রোফাইল আপডেট হয়েছে", en: "Profile updated" },
};

export function auditLabel(action: string, locale: "bn" | "en" = "bn") {
  return auditLabels[action]?.[locale] ?? action;
}
