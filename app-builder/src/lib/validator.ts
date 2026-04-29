import { z } from "zod";

const multiLangText = z
  .record(z.string(), z.string())
  .default({ en: "Unnamed" });

const fieldSchema = z.object({
  name: z.string().default("unknown"),
  label: multiLangText,
  type: z
    .enum([
      "text",
      "email",
      "number",
      "date",
      "boolean",
    ])
    .default("text"),
  required: z.boolean().optional().default(false),
});

const tableSchema = z.object({
  name: z.string().default("table"),
  label: multiLangText,
  fields: z.array(fieldSchema).default([]),
});

const uiSchema = z.object({
  type: z
    .enum(["form", "table"])
    .default("form"),
  table: z.string().default("unknown"),
});

const appSchema = z.object({
  appName: multiLangText,
  auth: z.boolean().default(false),
  languages: z
    .array(z.string())
    .default(["en"]),
  defaultLanguage: z
    .string()
    .default("en"),
  tables: z.array(tableSchema).default([]),
  ui: z.array(uiSchema).default([]),
});

export function validateConfig(
  config: unknown
) {
  try {
    return appSchema.parse(config);
  } catch {
    return appSchema.parse({});
  }
}
