import { useState } from "react";

interface Props {
  password: string;
}

export function PasswordDisplay({ password }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        readOnly
        value={password}
        aria-label="Generated password"
        className="flex-1 font-mono text-lg tracking-widest px-3 py-2 bg-gray-50 border border-gray-200 rounded-md min-w-0"
      />
      <button
        onClick={handleCopy}
        className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium bg-white hover:bg-gray-50 text-gray-700 whitespace-nowrap transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}