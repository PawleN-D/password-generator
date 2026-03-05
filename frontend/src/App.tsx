import { useState } from "react";
import { generatePassword } from "./api";
import type { GenerateOptions } from "./api";
import { PasswordDisplay } from "./components/PasswordDisplay";
import { StrengthIndicator } from "./components/StrengthIndicator";

const DEFAULT_OPTIONS: GenerateOptions = {
  length: 12,
  useUpperCase: true,
  useLowerCase: true,
  useNumber: true,
  useSpecialChar: false,
};

const TOGGLES: { key: keyof GenerateOptions; label: string }[] = [
  { key: "useUpperCase",  label: "Uppercase (A–Z)" },
  { key: "useLowerCase",  label: "Lowercase (a–z)" },
  { key: "useNumber",     label: "Numbers (0–9)" },
  { key: "useSpecialChar", label: "Special (!@#…)" },
];

export default function App() {
  const [options, setOptions] = useState<GenerateOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classCount = TOGGLES.filter(({ key }) => options[key] as boolean).length;

  function toggle(key: keyof GenerateOptions) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleGenerate() {
    setError("");
    setLoading(true);
    try {
      setPassword(await generatePassword(options));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <h1 className="text-xl font-semibold text-gray-800 mb-6">Password Generator</h1>

        {/* Length */}
        <div className="mb-5">
          <label className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Length</span>
            <span>{options.length}</span>
          </label>
          <input
            title="length"
            type="range"
            min={6}
            max={99}
            value={options.length}
            onChange={(e) => setOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
            className="w-full accent-gray-800"
          />
        </div>

        <div className="space-y-2 mb-5">
          {TOGGLES.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={options[key] as boolean}
                onChange={() => toggle(key)}
                className="w-4 h-4 accent-gray-800"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        <StrengthIndicator length={options.length} classCount={classCount} />

        <button
          onClick={handleGenerate}
          disabled={loading || classCount === 0}
          className="w-full mt-5 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating…" : "Generate"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {password && (
          <div className="mt-4">
            <PasswordDisplay password={password} />
          </div>
        )}

      </div>
    </div>
  );
}