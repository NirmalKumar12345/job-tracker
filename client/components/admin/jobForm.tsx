'use client';

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createJobService, updateJobService } from "@/services/job.service";
import { JobSchema } from "@/app/validation/jobValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "../formInput";
import RichTextEditor from "../richTextEditor";

interface Props {
  initialValues?: any;
  isEdit?: boolean;
  jobId?: string;
}

export default function JobForm({
  initialValues,
  isEdit = false,
  jobId,
}: Props) {
  
  const router = useRouter();
  const [errors, setErrors] = useState<{ company?: string; role?: string; description?: string; location?: string; experience?: string; expiryDate?: string }>({});

  const validateWithZod = (values: any) => {
    const result = JobSchema.safeParse(values);
    if (result.success) return {};

    const errors: any = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      company: initialValues?.company || "",
      role: initialValues?.role || "",
      description: initialValues?.description || "",
      location: initialValues?.location || "",
      experience: initialValues?.experience || "",
      skill: initialValues?.skill || "",
      expiryDate: initialValues?.expiryDate
        ? new Date(initialValues.expiryDate).toISOString().split("T")[0]
        : "",
    },

    enableReinitialize: true,

    validate: validateWithZod,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      try {
        if (isEdit && jobId) {
          const res = await updateJobService(jobId, values);
          toast.success("Job updated");
          router.push("/dashboard");
        } else {
          await createJobService(values);
          toast.success("Job created");
          router.push("/dashboard");
        }
      } catch (err: any) {
        const Errors = err?.errors || err?.response?.data?.errors;
        if (Errors && Array.isArray(Errors)) {
          const fieldError: any = {}
          Errors.forEach((e: any) => {
            fieldError[e.field] = e.message
          });
          setErrors(fieldError);
        }
        else {
          toast.error(err?.response?.data?.message || "Error");
        }
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-2">

      <FormInput name="company" label="Company" formik={formik} />
      <FormInput name="role" label="Role" formik={formik} />

      <div>
        <label className="text-sm font-medium">Description</label>

        <RichTextEditor
          value={formik.values.description}
          onChange={(val: string) => formik.setFieldValue("description", val)}
        />

        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">
            {formik.errors.description as string}
          </p>
        )}
      </div>

      <FormInput name="skill" label="Skill" formik={formik} />
      <FormInput name="location" label="Location" formik={formik} />
      <FormInput name="experience" label="Experience" formik={formik} />

      <FormInput
        name="expiryDate"
        label="Expiry Date"
        type="date"
        formik={formik}
      />
      <div className="flex justify-between pt-3">
        <Button type="button" className="cursor-pointer" onClick={() => router.push("/dashboard")} variant="outline">
          Cancel
        </Button>
        <Button type="submit" className="cursor-pointer">
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}