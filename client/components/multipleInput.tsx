'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  icon?: ReactNode;
}

export default function MultipleInputField({
  label,
  values,
  onChange,
  placeholder,
  icon,
}: Props) {

  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...values, ""]);
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative flex-1">
              {icon && (
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  {icon}
                </span>
              )}
              <Input
                value={value}
                placeholder={placeholder}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                className={`h-11 ${icon ? "pl-9" : ""}`}
              />
            </div>

            {values.length > 1 && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="cursor-pointer shrink-0"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}