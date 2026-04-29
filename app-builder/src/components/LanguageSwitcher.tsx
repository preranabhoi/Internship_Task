"use client";

export default function LanguageSwitcher({
  language,
  setLanguage,
}: any) {
  return (
    <select
      value={language}
      onChange={(e) =>
        setLanguage(e.target.value)
      }
      className="border px-3 py-2 rounded"
    >
      <option value="en">
        English
      </option>
      <option value="hi">
        हिन्दी
      </option>
    </select>
  );
}
