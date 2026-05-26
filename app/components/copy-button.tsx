"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-emerald-300/30 hover:text-emerald-300"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}