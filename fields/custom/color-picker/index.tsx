import { EditComponent } from "./edit-component";
import { z } from "zod";
import { Field } from "@/types/field";

const schema = (field: Field, configObject?: Record<string, any>) => {
  let zodSchema = z.string();

  if (field.required) zodSchema = zodSchema.min(1, "This field is required");
  
  // Validate hex color format
  zodSchema = zodSchema.regex(
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    "Must be a valid hex color (e.g. #FF5500)"
  );

  return zodSchema;
};

const ViewComponent = ({ value }: { value: unknown }) => {
  if (!value) return null;
  const color = String(value);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-3.5 w-3.5 rounded-sm border border-gray-300"
        style={{ backgroundColor: color }}
      />
      <span className="font-mono text-sm">{color}</span>
    </span>
  );
};

const label = "Color picker";
const defaultValue = "#000000";

export { label, schema, defaultValue, EditComponent, ViewComponent };
