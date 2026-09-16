import type { Lang } from "@/lib/i18n";

export type Text = Record<Lang, string>;

export type FieldType = "text" | "number" | "date" | "select" | "textarea";

export type Option = { value: string; label: Text; tone: Tone };

export type Tone =
  | "blue"
  | "green"
  | "amber"
  | "violet"
  | "rose"
  | "slate";

export type Field = {
  key: string;
  label: Text;
  type: FieldType;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
};

export type Column = {
  key: string;
  label: Text;
  kind?: "text" | "number" | "money" | "date" | "status" | "progress";
  options?: Option[];
  /** Used by "progress": the column holding the total. */
  of?: string;
};

export type Summary = {
  key: string;
  label: Text;
  icon: string;
  tone: Tone;
  kind: "count" | "sum" | "countWhere" | "sumWhere";
  column?: string;
  where?: { column: string; value: string };
  money?: boolean;
};

export type ErpModule = {
  key: string;
  table: string;
  icon: string;
  title: Text;
  subtitle: Text;
  addLabel: Text;
  orderBy: string;
  searchColumns: string[];
  columns: Column[];
  fields: Field[];
  summaries: Summary[];
  readOnly?: boolean;
};

const yesNoTone = (value: string): Tone =>
  value === "active" ? "green" : "slate";

const statusActive: Option[] = [
  { value: "active", label: { bn: "সক্রিয়", en: "Active" }, tone: yesNoTone("active") },
  { value: "leave", label: { bn: "ছুটিতে", en: "On leave" }, tone: "amber" },
  { value: "inactive", label: { bn: "নিষ্ক্রিয়", en: "Inactive" }, tone: "slate" },
];

const stockStatus: Option[] = [
  { value: "in_stock", label: { bn: "স্টকে আছে", en: "In stock" }, tone: "green" },
  { value: "low", label: { bn: "কম আছে", en: "Low" }, tone: "amber" },
  { value: "out", label: { bn: "শেষ", en: "Out of stock" }, tone: "rose" },
];

const jobStatus: Option[] = [
  { value: "pending", label: { bn: "অপেক্ষমাণ", en: "Pending" }, tone: "slate" },
  { value: "running", label: { bn: "চলছে", en: "Running" }, tone: "blue" },
  { value: "done", label: { bn: "সম্পন্ন", en: "Done" }, tone: "green" },
];

const leadStatus: Option[] = [
  { value: "new", label: { bn: "নতুন", en: "New" }, tone: "blue" },
  { value: "contacted", label: { bn: "যোগাযোগ হয়েছে", en: "Contacted" }, tone: "violet" },
  { value: "follow_up", label: { bn: "ফলো আপ", en: "Follow up" }, tone: "amber" },
  { value: "converted", label: { bn: "কনভার্ট হয়েছে", en: "Converted" }, tone: "green" },
];

const ticketStatus: Option[] = [
  { value: "open", label: { bn: "খোলা", en: "Open" }, tone: "blue" },
  { value: "pending", label: { bn: "অপেক্ষমাণ", en: "Pending" }, tone: "amber" },
  { value: "closed", label: { bn: "বন্ধ", en: "Closed" }, tone: "green" },
];

const priority: Option[] = [
  { value: "high", label: { bn: "জরুরি", en: "High" }, tone: "rose" },
  { value: "medium", label: { bn: "মাঝারি", en: "Medium" }, tone: "amber" },
  { value: "low", label: { bn: "সাধারণ", en: "Low" }, tone: "slate" },
];

const publishStatus: Option[] = [
  { value: "published", label: { bn: "পাবলিশ", en: "Published" }, tone: "green" },
  { value: "draft", label: { bn: "ড্রাফট", en: "Draft" }, tone: "slate" },
];

const billStatus: Option[] = [
  { value: "paid", label: { bn: "পরিশোধিত", en: "Paid" }, tone: "green" },
  { value: "due", label: { bn: "বাকি", en: "Due" }, tone: "amber" },
];

const entryKind: Option[] = [
  { value: "income", label: { bn: "আয়", en: "Income" }, tone: "green" },
  { value: "expense", label: { bn: "ব্যয়", en: "Expense" }, tone: "rose" },
];

const customerStatus: Option[] = [
  { value: "active", label: { bn: "সক্রিয়", en: "Active" }, tone: "green" },
  { value: "inactive", label: { bn: "নিষ্ক্রিয়", en: "Inactive" }, tone: "slate" },
];

export const modules: ErpModule[] = [
  {
    key: "inventory",
    table: "products",
    icon: "site",
    title: { bn: "ইনভেন্টরি", en: "Inventory" },
    subtitle: {
      bn: "আপনার সব পণ্যের স্টক, দাম ও অবস্থা।",
      en: "Stock, price and status of every product.",
    },
    addLabel: { bn: "নতুন পণ্য", en: "New product" },
    orderBy: "created_at",
    searchColumns: ["name", "sku", "category"],
    columns: [
      { key: "name", label: { bn: "পণ্যের নাম", en: "Product" } },
      { key: "sku", label: { bn: "এসকেইউ", en: "SKU" } },
      { key: "category", label: { bn: "ক্যাটাগরি", en: "Category" } },
      { key: "stock", label: { bn: "স্টক", en: "Stock" }, kind: "number" },
      { key: "unit", label: { bn: "একক", en: "Unit" } },
      { key: "price", label: { bn: "দাম", en: "Price" }, kind: "money" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: stockStatus },
    ],
    fields: [
      { key: "name", label: { bn: "পণ্যের নাম", en: "Product name" }, type: "text", required: true },
      { key: "sku", label: { bn: "এসকেইউ", en: "SKU" }, type: "text" },
      { key: "category", label: { bn: "ক্যাটাগরি", en: "Category" }, type: "text" },
      { key: "stock", label: { bn: "স্টক", en: "Stock" }, type: "number" },
      { key: "unit", label: { bn: "একক", en: "Unit" }, type: "text" },
      { key: "price", label: { bn: "দাম (৳)", en: "Price (BDT)" }, type: "number" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: stockStatus },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট পণ্য", en: "Total products" }, icon: "site", tone: "blue", kind: "count" },
      { key: "stock", label: { bn: "মোট স্টক", en: "Total stock" }, icon: "products", tone: "green", kind: "sum", column: "stock" },
      { key: "low", label: { bn: "কম আছে", en: "Low stock" }, icon: "warning", tone: "amber", kind: "countWhere", where: { column: "status", value: "low" } },
      { key: "out", label: { bn: "স্টক শেষ", en: "Out of stock" }, icon: "warning", tone: "rose", kind: "countWhere", where: { column: "status", value: "out" } },
    ],
  },
  {
    key: "production",
    table: "production_orders",
    icon: "products",
    title: { bn: "প্রোডাকশন", en: "Production" },
    subtitle: {
      bn: "জব অর্ডার, কতটা হয়েছে আর কবে ডেলিভারি।",
      en: "Job orders, progress and delivery dates.",
    },
    addLabel: { bn: "নতুন জব অর্ডার", en: "New job order" },
    orderBy: "created_at",
    searchColumns: ["code", "product"],
    columns: [
      { key: "code", label: { bn: "অর্ডার নম্বর", en: "Order no." } },
      { key: "product", label: { bn: "পণ্য", en: "Product" } },
      { key: "quantity", label: { bn: "পরিমাণ", en: "Quantity" }, kind: "number" },
      { key: "completed", label: { bn: "সম্পন্ন", en: "Completed" }, kind: "progress", of: "quantity" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: jobStatus },
      { key: "due_date", label: { bn: "ডেলিভারি", en: "Due" }, kind: "date" },
    ],
    fields: [
      { key: "code", label: { bn: "অর্ডার নম্বর", en: "Order no." }, type: "text", required: true },
      { key: "product", label: { bn: "পণ্য", en: "Product" }, type: "text" },
      { key: "quantity", label: { bn: "পরিমাণ", en: "Quantity" }, type: "number" },
      { key: "completed", label: { bn: "সম্পন্ন", en: "Completed" }, type: "number" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: jobStatus },
      { key: "due_date", label: { bn: "ডেলিভারির তারিখ", en: "Due date" }, type: "date" },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট অর্ডার", en: "Total orders" }, icon: "products", tone: "blue", kind: "count" },
      { key: "running", label: { bn: "চলছে", en: "Running" }, icon: "clock", tone: "amber", kind: "countWhere", where: { column: "status", value: "running" } },
      { key: "done", label: { bn: "সম্পন্ন", en: "Done" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "done" } },
      { key: "qty", label: { bn: "মোট পিস", en: "Total pieces" }, icon: "logs", tone: "violet", kind: "sum", column: "quantity" },
    ],
  },
  {
    key: "hr",
    table: "employees",
    icon: "leads",
    title: { bn: "এইচআর ম্যানেজমেন্ট", en: "HR Management" },
    subtitle: {
      bn: "কর্মচারীর তালিকা, পদ, বেতন ও অবস্থা।",
      en: "Your team, their roles, salary and status.",
    },
    addLabel: { bn: "নতুন কর্মচারী", en: "New employee" },
    orderBy: "created_at",
    searchColumns: ["name", "designation", "phone"],
    columns: [
      { key: "name", label: { bn: "নাম", en: "Name" } },
      { key: "designation", label: { bn: "পদ", en: "Designation" } },
      { key: "phone", label: { bn: "ফোন", en: "Phone" } },
      { key: "salary", label: { bn: "বেতন", en: "Salary" }, kind: "money" },
      { key: "join_date", label: { bn: "যোগদান", en: "Joined" }, kind: "date" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: statusActive },
    ],
    fields: [
      { key: "name", label: { bn: "নাম", en: "Name" }, type: "text", required: true },
      { key: "designation", label: { bn: "পদ", en: "Designation" }, type: "text" },
      { key: "phone", label: { bn: "ফোন", en: "Phone" }, type: "text" },
      { key: "salary", label: { bn: "বেতন (৳)", en: "Salary (BDT)" }, type: "number" },
      { key: "join_date", label: { bn: "যোগদানের তারিখ", en: "Join date" }, type: "date" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: statusActive },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট কর্মচারী", en: "Total employees" }, icon: "leads", tone: "blue", kind: "count" },
      { key: "active", label: { bn: "সক্রিয়", en: "Active" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "active" } },
      { key: "leave", label: { bn: "ছুটিতে", en: "On leave" }, icon: "clock", tone: "amber", kind: "countWhere", where: { column: "status", value: "leave" } },
      { key: "salary", label: { bn: "মাসিক বেতন", en: "Monthly payroll" }, icon: "money", tone: "violet", kind: "sum", column: "salary", money: true },
    ],
  },
  {
    key: "crm",
    table: "customers",
    icon: "leads",
    title: { bn: "সিআরএম — কাস্টমার", en: "CRM — Customers" },
    subtitle: {
      bn: "আপনার সব কাস্টমারের তথ্য এক জায়গায়।",
      en: "Every customer you work with, in one place.",
    },
    addLabel: { bn: "নতুন কাস্টমার", en: "New customer" },
    orderBy: "created_at",
    searchColumns: ["name", "company", "phone", "email"],
    columns: [
      { key: "name", label: { bn: "নাম", en: "Name" } },
      { key: "company", label: { bn: "প্রতিষ্ঠান", en: "Company" } },
      { key: "phone", label: { bn: "ফোন", en: "Phone" } },
      { key: "email", label: { bn: "ইমেইল", en: "Email" } },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: customerStatus },
    ],
    fields: [
      { key: "name", label: { bn: "নাম", en: "Name" }, type: "text", required: true },
      { key: "company", label: { bn: "প্রতিষ্ঠান", en: "Company" }, type: "text" },
      { key: "phone", label: { bn: "ফোন", en: "Phone" }, type: "text" },
      { key: "email", label: { bn: "ইমেইল", en: "Email" }, type: "text" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: customerStatus },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট কাস্টমার", en: "Total customers" }, icon: "leads", tone: "blue", kind: "count" },
      { key: "active", label: { bn: "সক্রিয়", en: "Active" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "active" } },
      { key: "inactive", label: { bn: "নিষ্ক্রিয়", en: "Inactive" }, icon: "logs", tone: "slate", kind: "countWhere", where: { column: "status", value: "inactive" } },
    ],
  },
  {
    key: "leads",
    table: "leads",
    icon: "reports",
    title: { bn: "লিড ম্যানেজমেন্ট", en: "Lead Management" },
    subtitle: {
      bn: "কোন লিড কোন ধাপে আছে, কত টাকার সম্ভাবনা।",
      en: "Where each lead stands and what it is worth.",
    },
    addLabel: { bn: "নতুন লিড", en: "New lead" },
    orderBy: "created_at",
    searchColumns: ["name", "phone", "source"],
    columns: [
      { key: "name", label: { bn: "নাম", en: "Name" } },
      { key: "phone", label: { bn: "ফোন", en: "Phone" } },
      { key: "source", label: { bn: "উৎস", en: "Source" } },
      { key: "value", label: { bn: "সম্ভাব্য মূল্য", en: "Value" }, kind: "money" },
      { key: "status", label: { bn: "ধাপ", en: "Stage" }, kind: "status", options: leadStatus },
      { key: "note", label: { bn: "নোট", en: "Note" } },
    ],
    fields: [
      { key: "name", label: { bn: "নাম", en: "Name" }, type: "text", required: true },
      { key: "phone", label: { bn: "ফোন", en: "Phone" }, type: "text" },
      { key: "source", label: { bn: "উৎস", en: "Source" }, type: "text" },
      { key: "value", label: { bn: "সম্ভাব্য মূল্য (৳)", en: "Value (BDT)" }, type: "number" },
      { key: "status", label: { bn: "ধাপ", en: "Stage" }, type: "select", options: leadStatus },
      { key: "note", label: { bn: "নোট", en: "Note" }, type: "textarea" },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট লিড", en: "Total leads" }, icon: "reports", tone: "blue", kind: "count" },
      { key: "follow", label: { bn: "ফলো আপ", en: "Follow up" }, icon: "clock", tone: "amber", kind: "countWhere", where: { column: "status", value: "follow_up" } },
      { key: "converted", label: { bn: "কনভার্ট", en: "Converted" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "converted" } },
      { key: "value", label: { bn: "সম্ভাব্য মূল্য", en: "Pipeline value" }, icon: "money", tone: "violet", kind: "sum", column: "value", money: true },
    ],
  },
  {
    key: "accounts",
    table: "transactions",
    icon: "subscriptions",
    title: { bn: "হিসাব — আয় ও ব্যয়", en: "Accounts — Income & Expense" },
    subtitle: {
      bn: "প্রতিদিনের আয়-ব্যয়ের হিসাব।",
      en: "Every taka in and out of the business.",
    },
    addLabel: { bn: "নতুন এন্ট্রি", en: "New entry" },
    orderBy: "entry_date",
    searchColumns: ["category", "party", "note"],
    columns: [
      { key: "entry_date", label: { bn: "তারিখ", en: "Date" }, kind: "date" },
      { key: "kind", label: { bn: "ধরন", en: "Type" }, kind: "status", options: entryKind },
      { key: "category", label: { bn: "খাত", en: "Category" } },
      { key: "party", label: { bn: "কার সাথে", en: "Party" } },
      { key: "amount", label: { bn: "টাকা", en: "Amount" }, kind: "money" },
      { key: "note", label: { bn: "নোট", en: "Note" } },
    ],
    fields: [
      { key: "entry_date", label: { bn: "তারিখ", en: "Date" }, type: "date", required: true },
      { key: "kind", label: { bn: "ধরন", en: "Type" }, type: "select", options: entryKind },
      { key: "category", label: { bn: "খাত", en: "Category" }, type: "text" },
      { key: "party", label: { bn: "কার সাথে", en: "Party" }, type: "text" },
      { key: "amount", label: { bn: "টাকা (৳)", en: "Amount (BDT)" }, type: "number", required: true },
      { key: "note", label: { bn: "নোট", en: "Note" }, type: "textarea" },
    ],
    summaries: [
      { key: "income", label: { bn: "মোট আয়", en: "Total income" }, icon: "money", tone: "green", kind: "sumWhere", column: "amount", where: { column: "kind", value: "income" }, money: true },
      { key: "expense", label: { bn: "মোট ব্যয়", en: "Total expense" }, icon: "money", tone: "rose", kind: "sumWhere", column: "amount", where: { column: "kind", value: "expense" }, money: true },
      { key: "entries", label: { bn: "মোট এন্ট্রি", en: "Entries" }, icon: "logs", tone: "blue", kind: "count" },
    ],
  },
  {
    key: "support",
    table: "support_tickets",
    icon: "support",
    title: { bn: "সাপোর্ট টিকিট", en: "Support Tickets" },
    subtitle: {
      bn: "আপনার পাঠানো সব টিকিট ও তার অবস্থা।",
      en: "Every ticket you raised and where it stands.",
    },
    addLabel: { bn: "নতুন টিকিট", en: "New ticket" },
    orderBy: "created_at",
    searchColumns: ["subject", "message"],
    columns: [
      { key: "subject", label: { bn: "বিষয়", en: "Subject" } },
      { key: "priority", label: { bn: "গুরুত্ব", en: "Priority" }, kind: "status", options: priority },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: ticketStatus },
      { key: "created_at", label: { bn: "তারিখ", en: "Date" }, kind: "date" },
    ],
    fields: [
      { key: "subject", label: { bn: "বিষয়", en: "Subject" }, type: "text", required: true },
      { key: "priority", label: { bn: "গুরুত্ব", en: "Priority" }, type: "select", options: priority },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: ticketStatus },
      { key: "message", label: { bn: "বিস্তারিত", en: "Message" }, type: "textarea" },
    ],
    summaries: [
      { key: "open", label: { bn: "খোলা", en: "Open" }, icon: "support", tone: "blue", kind: "countWhere", where: { column: "status", value: "open" } },
      { key: "pending", label: { bn: "অপেক্ষমাণ", en: "Pending" }, icon: "clock", tone: "amber", kind: "countWhere", where: { column: "status", value: "pending" } },
      { key: "closed", label: { bn: "বন্ধ", en: "Closed" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "closed" } },
    ],
  },
  {
    key: "pages",
    table: "site_pages",
    icon: "pages",
    title: { bn: "সাইটের পেজ", en: "Site Pages" },
    subtitle: {
      bn: "আপনার ওয়েবসাইটের পেজগুলো।",
      en: "The pages that make up your website.",
    },
    addLabel: { bn: "নতুন পেজ", en: "New page" },
    orderBy: "created_at",
    searchColumns: ["title", "slug"],
    columns: [
      { key: "title", label: { bn: "পেজের নাম", en: "Title" } },
      { key: "slug", label: { bn: "ঠিকানা", en: "Slug" } },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: publishStatus },
      { key: "updated_at", label: { bn: "আপডেট", en: "Updated" }, kind: "date" },
    ],
    fields: [
      { key: "title", label: { bn: "পেজের নাম", en: "Title" }, type: "text", required: true },
      { key: "slug", label: { bn: "ঠিকানা (slug)", en: "Slug" }, type: "text", required: true },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: publishStatus },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট পেজ", en: "Total pages" }, icon: "pages", tone: "blue", kind: "count" },
      { key: "published", label: { bn: "পাবলিশ", en: "Published" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "published" } },
      { key: "draft", label: { bn: "ড্রাফট", en: "Draft" }, icon: "logs", tone: "slate", kind: "countWhere", where: { column: "status", value: "draft" } },
    ],
  },
  {
    key: "blog",
    table: "blog_posts",
    icon: "blog",
    title: { bn: "ব্লগ", en: "Blog" },
    subtitle: {
      bn: "ব্লগ পোস্ট লিখুন, পাবলিশ করুন।",
      en: "Write posts and publish them.",
    },
    addLabel: { bn: "নতুন পোস্ট", en: "New post" },
    orderBy: "created_at",
    searchColumns: ["title", "slug"],
    columns: [
      { key: "title", label: { bn: "শিরোনাম", en: "Title" } },
      { key: "slug", label: { bn: "ঠিকানা", en: "Slug" } },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: publishStatus },
      { key: "published_at", label: { bn: "পাবলিশের তারিখ", en: "Published" }, kind: "date" },
    ],
    fields: [
      { key: "title", label: { bn: "শিরোনাম", en: "Title" }, type: "text", required: true },
      { key: "slug", label: { bn: "ঠিকানা (slug)", en: "Slug" }, type: "text", required: true },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: publishStatus },
      { key: "published_at", label: { bn: "পাবলিশের তারিখ", en: "Publish date" }, type: "date" },
    ],
    summaries: [
      { key: "total", label: { bn: "মোট পোস্ট", en: "Total posts" }, icon: "blog", tone: "blue", kind: "count" },
      { key: "published", label: { bn: "পাবলিশ", en: "Published" }, icon: "check", tone: "green", kind: "countWhere", where: { column: "status", value: "published" } },
      { key: "draft", label: { bn: "ড্রাফট", en: "Draft" }, icon: "logs", tone: "slate", kind: "countWhere", where: { column: "status", value: "draft" } },
    ],
  },
  {
    key: "subscriptions",
    table: "invoices",
    icon: "subscriptions",
    title: { bn: "সাবস্ক্রিপশন ও বিল", en: "Subscription & Billing" },
    subtitle: {
      bn: "আপনার প্ল্যান ও বিলের ইতিহাস।",
      en: "Your plan and billing history.",
    },
    addLabel: { bn: "নতুন ইনভয়েস", en: "New invoice" },
    orderBy: "created_at",
    searchColumns: ["invoice_no", "plan"],
    columns: [
      { key: "invoice_no", label: { bn: "ইনভয়েস", en: "Invoice" } },
      { key: "plan", label: { bn: "প্ল্যান", en: "Plan" } },
      { key: "amount", label: { bn: "টাকা", en: "Amount" }, kind: "money" },
      { key: "period_start", label: { bn: "শুরু", en: "From" }, kind: "date" },
      { key: "period_end", label: { bn: "শেষ", en: "To" }, kind: "date" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, kind: "status", options: billStatus },
    ],
    fields: [
      { key: "invoice_no", label: { bn: "ইনভয়েস নম্বর", en: "Invoice no." }, type: "text", required: true },
      { key: "plan", label: { bn: "প্ল্যান", en: "Plan" }, type: "text" },
      { key: "amount", label: { bn: "টাকা (৳)", en: "Amount (BDT)" }, type: "number" },
      { key: "period_start", label: { bn: "শুরুর তারিখ", en: "Period start" }, type: "date" },
      { key: "period_end", label: { bn: "শেষের তারিখ", en: "Period end" }, type: "date" },
      { key: "status", label: { bn: "অবস্থা", en: "Status" }, type: "select", options: billStatus },
    ],
    summaries: [
      { key: "paid", label: { bn: "পরিশোধিত", en: "Paid" }, icon: "check", tone: "green", kind: "sumWhere", column: "amount", where: { column: "status", value: "paid" }, money: true },
      { key: "due", label: { bn: "বাকি", en: "Due" }, icon: "clock", tone: "amber", kind: "sumWhere", column: "amount", where: { column: "status", value: "due" }, money: true },
      { key: "count", label: { bn: "মোট ইনভয়েস", en: "Invoices" }, icon: "subscriptions", tone: "blue", kind: "count" },
    ],
  },
  {
    key: "logs",
    table: "activity_log",
    icon: "logs",
    title: { bn: "অ্যাক্টিভিটি লগ", en: "Activity Log" },
    subtitle: {
      bn: "অ্যাকাউন্টে যা যা হয়েছে তার তালিকা।",
      en: "Everything that happened in this account.",
    },
    addLabel: { bn: "নতুন", en: "New" },
    orderBy: "created_at",
    searchColumns: ["title", "detail", "area"],
    columns: [
      { key: "title", label: { bn: "কাজ", en: "Event" } },
      { key: "detail", label: { bn: "বিস্তারিত", en: "Detail" } },
      { key: "area", label: { bn: "বিভাগ", en: "Area" } },
      { key: "created_at", label: { bn: "সময়", en: "Time" }, kind: "date" },
    ],
    fields: [],
    summaries: [
      { key: "total", label: { bn: "মোট ইভেন্ট", en: "Total events" }, icon: "logs", tone: "blue", kind: "count" },
    ],
    readOnly: true,
  },
];

export function getModule(key: string) {
  return modules.find((item) => item.key === key) ?? null;
}
