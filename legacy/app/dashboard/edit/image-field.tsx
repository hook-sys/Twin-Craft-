"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import type { UiLabels } from "@/lib/i18n";
import { uploadImage } from "./actions";

export default function ImageField({
  label,
  value,
  onChange,
  t,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  t: UiLabels;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);

    if (result.error || !result.url) {
      setError(result.error);
    } else {
      onChange(result.url);
    }
    setBusy(false);
  }

  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span>{busy ? t.uploading : t.addImage}</span>
          )}
        </button>

        <div className="flex flex-col gap-1 text-sm">
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="text-left font-medium underline disabled:opacity-50"
          >
            {busy ? t.uploading : value ? t.replaceImage : t.addImage}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-left text-zinc-500 underline"
            >
              {t.removeImage}
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void pick(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}
