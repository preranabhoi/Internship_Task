"use client";

import { useEffect, useState } from "react";

export default function DynamicTable({
    table,
    language,
  }: any)
   {
  const [rows, setRows] = useState<any[]>([]);

  async function loadData() {
    const res = await fetch("/api/records");
    const data = await res.json();

    const filtered = data.filter(
      (item: any) =>
        item.tableName === table.name
    );

    setRows(filtered);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="border rounded-lg p-6 bg-white shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {table.label[language]} Table
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            {table.fields.map((field: any) => (
              <th
                key={field.name}
                className="border p-2"
              >
                {field.label[language]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {table.fields.map((field: any) => (
                <td
                  key={field.name}
                  className="border p-2"
                >
                  {row.data[field.name] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
