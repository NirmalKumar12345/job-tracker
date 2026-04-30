'use client';

import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  formik: any;
}

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  formik
}: Props) {

  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1">

      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name] || ""}
        onChange={(e) => {
          formik.handleChange(e);
          formik.setFieldError(name, ""); // 🔥 clear backend error
        }}
        onBlur={formik.handleBlur}
        className={error ? "border-red-500" : ""}
      />

      {error && typeof error === "string" && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}