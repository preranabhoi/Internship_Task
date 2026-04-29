"use client";

import Papa from "papaparse";
import toast from "react-hot-toast";

export default function CSVImporter({
  tableName,
}: {
  tableName: string;
}) {
  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload CSV file");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        try {
          const rows = results.data as any[];

          if (!rows.length) {
            toast.error("Empty CSV");
            return;
          }

          for (const row of rows) {
            const cleanedRow: Record<
              string,
              any
            > = {};

            Object.keys(row).forEach((key) => {
              cleanedRow[key.trim()] =
                row[key];
            });

            const res = await fetch(
              "/api/records",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  tableName,
                  data: cleanedRow,
                }),
              }
            );

            if (!res.ok) {
              const error =
                await res.text();

              console.error(
                "Save failed:",
                error
              );

              toast.error(
                "Could not save some rows"
              );

              return;
            }
          }

          toast.success(
            "CSV imported successfully"
          );

          window.location.reload();
        } catch (err) {
          console.error(err);
          toast.error(
            "Import failed"
          );
        }
      },

      error: (err) => {
        console.error(err);
        toast.error(
          "CSV parsing failed"
        );
      },
    });
  }

  return (
    <div className="mb-6">
      <label className="font-semibold block mb-2">
        Import CSV
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="border p-2 rounded bg-white"
      />
    </div>
  );
}
