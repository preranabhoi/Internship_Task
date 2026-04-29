"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CSVImporter from "@/components/CSVImporter";
import { config } from "@/lib/helpers";
import DynamicForm from "@/components/DynamicForm";
import DynamicTable from "@/components/DynamicTable";

export default function Home() {
  const [language, setLanguage] =
    useState(config.defaultLanguage);

  const [selectedRecord, setSelectedRecord] =
    useState<any>(null);

  const table = config.tables[0];

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <Navbar />

      <div className="mb-6">
        <LanguageSwitcher
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <CSVImporter tableName="customers" />

      <h1 className="text-4xl font-bold mb-10">
        {config.appName[language]}
      </h1>

      <DynamicForm
        table={table}
        language={language}
        selectedRecord={selectedRecord}
      />

      <DynamicTable
        table={table}
        language={language}
        setSelectedRecord={setSelectedRecord}
      />
    </main>
  );
}
