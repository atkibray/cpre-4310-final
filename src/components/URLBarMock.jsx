import React from "react";

export default function URLBarMock({ url = "https://signin.security-check.app/login", note = "via QR redirect" }) {
  return (
    <div className="mx-auto mt-6 w-[720px] max-w-[92vw]">
      <div className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 shadow-sm">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-neutral-500"
        >
          <path
            fill="currentColor"
            d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"
          />
        </svg>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate font-mono text-sm text-neutral-700">{url}</span>
          <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
            {note}
          </span>
        </div>
        <button
          type="button"
          className="rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50 active:scale-[.99]"
          onClick={() => navigator.clipboard?.writeText(url)}
          title="Copy URL"
        >
          Copy
        </button>
      </div>
    </div>
  );
}