"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ColorPickerEdit = forwardRef((props: any, ref: React.Ref<HTMLInputElement>) => {
  const { field: fieldConfig, value, onChange, ...restProps } = props;
  const [localValue, setLocalValue] = useState(value || "#000000");
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleColorChange = (newColor: string) => {
    setLocalValue(newColor);
    if (onChange) onChange(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    // Only propagate valid hex colors
    if (/^#[0-9a-fA-F]{6}$/.test(val) || /^#[0-9a-fA-F]{3}$/.test(val)) {
      if (onChange) onChange(val);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => colorInputRef.current?.click()}
        className="relative h-9 w-9 shrink-0 rounded-md border border-input shadow-sm cursor-pointer overflow-hidden"
        style={{ backgroundColor: localValue || "#000000" }}
        title="Click to pick a color"
      >
        <input
          ref={colorInputRef}
          type="color"
          value={localValue || "#000000"}
          onChange={(e) => handleColorChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          tabIndex={-1}
        />
      </button>
      <Input
        {...restProps}
        ref={ref}
        value={localValue || ""}
        onChange={handleTextChange}
        placeholder="#000000"
        className={cn(
          "text-base font-mono",
          fieldConfig?.readonly && "focus-visible:border-input focus-visible:ring-0"
        )}
        readOnly={fieldConfig?.readonly}
      />
    </div>
  );
});

ColorPickerEdit.displayName = "ColorPickerEdit";

export { ColorPickerEdit as EditComponent };
