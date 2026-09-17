/**
 * One error vocabulary for the whole application. Services throw AppError;
 * route handlers and server actions turn it into a message the user can read.
 */
export type ErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL";

const statusByCode: Record<ErrorCode, number> = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION: 422,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

const messageByCode: Record<ErrorCode, { bn: string; en: string }> = {
  UNAUTHENTICATED: {
    bn: "আগে লগইন করুন।",
    en: "Please sign in first.",
  },
  FORBIDDEN: {
    bn: "এই কাজটি করার অনুমতি আপনার নেই।",
    en: "You do not have permission to do that.",
  },
  NOT_FOUND: {
    bn: "যা খুঁজছেন তা পাওয়া যায়নি।",
    en: "We could not find that.",
  },
  VALIDATION: {
    bn: "তথ্যগুলো ঠিকভাবে পূরণ করুন।",
    en: "Please check the details you entered.",
  },
  CONFLICT: {
    bn: "এটি আগে থেকেই আছে।",
    en: "That already exists.",
  },
  RATE_LIMITED: {
    bn: "একটু পরে আবার চেষ্টা করুন।",
    en: "Too many attempts — try again shortly.",
  },
  INTERNAL: {
    bn: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
    en: "Something went wrong. Please try again.",
  },
};

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly fields?: Record<string, string>;

  constructor(
    code: ErrorCode,
    message?: string,
    fields?: Record<string, string>,
  ) {
    super(message ?? messageByCode[code].en);
    this.name = "AppError";
    this.code = code;
    this.status = statusByCode[code];
    this.fields = fields;
  }

  static unauthenticated() {
    return new AppError("UNAUTHENTICATED");
  }
  static forbidden(message?: string) {
    return new AppError("FORBIDDEN", message);
  }
  static notFound(message?: string) {
    return new AppError("NOT_FOUND", message);
  }
  static validation(fields?: Record<string, string>, message?: string) {
    return new AppError("VALIDATION", message, fields);
  }
  static conflict(message?: string) {
    return new AppError("CONFLICT", message);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/** The bilingual sentence to show a user for any thrown value. */
export function readableError(error: unknown, locale: "bn" | "en" = "bn") {
  if (isAppError(error)) {
    const fallback = messageByCode[error.code][locale];
    return error.message && error.message !== messageByCode[error.code].en
      ? error.message
      : fallback;
  }
  return messageByCode.INTERNAL[locale];
}

/** What every server action returns, so forms always handle one shape. */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: ErrorCode; fields?: Record<string, string> };

export function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

export function fail(error: unknown, locale: "bn" | "en" = "bn"): ActionResult<never> {
  if (isAppError(error)) {
    return {
      ok: false,
      code: error.code,
      error: readableError(error, locale),
      fields: error.fields,
    };
  }
  console.error("[unhandled]", error);
  return { ok: false, code: "INTERNAL", error: readableError(error, locale) };
}
