"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { config } from "@/lib/helpers";
import { componentRegistry } from "@/lib/registry";

export default function Home() {
  const [language, setLanguage] = useState("en");

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <Navbar />

      <div className="mb-6">
        <LanguageSwitcher
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <h1 className="text-4xl font-bold mb-10">
        {String(config.appName[language])}
      </h1>

      {config.ui.map((component, index) => {
        const Component =
          componentRegistry[
            component.type as keyof typeof componentRegistry
          ];

        const table = config.tables.find(
          (t) => t.name === component.table
        );

        if (!Component || !table) return null;

        return (
          <Component
            key={index}
            table={table}
            language={language}
          />
        );
      })}
    </main>
  );
}
