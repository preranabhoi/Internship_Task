export type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "boolean";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface TableConfig {
  name: string;
  label: string;
  fields: FieldConfig[];
}

export interface UIConfig {
  type: "form" | "table";
  table: string;
}

export interface AppConfig {
  appName: string;
  auth: boolean;
  languages: string[];
  tables: TableConfig[];
  ui: UIConfig[];
}
