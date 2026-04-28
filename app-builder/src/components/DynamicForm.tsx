"use client";

import { useState } from "react";

export default function DynamicForm({
  table,
}: {
  table: any;
}) {
  const [formData, setFormData] = useState<any>({});

  function handleChange(
    fieldName: string,
    value: string
  ) {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    alert(
      "Form Submitted:\n\n" +
        JSON.stringify(formData, null, 2)
    );
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">
        {table.label} Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {table.fields.map((field: any) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">
              {field.label}
            </label>

            <input
              type={field.type}
              required={field.required}
              className="w-full border p-2 rounded"
              placeholder={field.label}
              onChange={(e) =>
                handleChange(
                  field.name,
                  e.target.value
                )
              }
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
