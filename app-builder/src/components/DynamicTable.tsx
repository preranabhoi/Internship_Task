"use client";

import { useEffect, useState } from "react";

export default function DynamicTable({
  table,
  language,
  setSelectedRecord,
}: any) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/records", {
        cache: "no-store",
      });

      if (!res.ok) {
        setError("Could not load records");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const filtered = data.filter(
        (item: any) => item.tableName === table.name
      );

      setRows(filtered);
    } catch (err: any) {
      console.error(err);
      setError("Could not load records");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [table.name]);

  if (loading) {
    return <div className="mt-8">Loading records...</div>;
  }

  if (error) {
    return <div className="mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">{table.label[language]} Table</h2>

      <button
        onClick={loadData}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh
      </button>

      <table className="w-full border">
        <thead>
          <tr>
            {table.fields.map((field: any) => (
              <th key={field.name} className="border p-2">
                {field.label[language]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.fields.length}
                className="border p-4 text-center"
              >
                No records found
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedRecord(row.data)}
              >
                {table.fields.map((field: any) => (
                  <td key={field.name} className="border p-2">
                    {row.data[field.name] || "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
