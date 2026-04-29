"use client";

import { useState } from "react";

export default function DynamicForm({
    table,
    language,
  }: any)
   {
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

  async function handleSubmit(e: any) {
    e.preventDefault();
  
    const res = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        tableName: table.name,
        data: formData,
      }),
    });
  
    if (res.ok) {
      alert("Saved successfully");
      setFormData({});
    } else {
      alert("Save failed");
    }
  }
  

  return (
    <div className="border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">
        {table.label[language]} Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {table.fields.map((field: any) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">
              {field.label[language]}
            </label>

            <input
              type={field.type}
              required={field.required}
              className="w-full border p-2 rounded"
              placeholder={field.label[language]}
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
