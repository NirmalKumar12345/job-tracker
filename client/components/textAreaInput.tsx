'use client';

import { Textarea } from "@/components/ui/textarea";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  formik: any;
}

export default function FormTextarea({
  name,
  label,
  placeholder,
  isRequired,
  formik
}: Props) {

  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1">

      {label && <div className="flex gap-1">
        <label className="text-sm font-medium">
          {label} {isRequired ? <span className="text-red-500">*</span> : null}
        </label>
      </div>}

      <Textarea
        name={name}
        placeholder={placeholder}
        value={formik.values[name] || ""}
        onChange={(e) => {
          formik.handleChange(e);
          formik.setFieldError(name, "");
        }}
        onBlur={formik.handleBlur}
        className={error ? "border-red-500" : ""}
      />

      {error && typeof error === "string" && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}