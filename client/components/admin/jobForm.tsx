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
  <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
    <div className="w-full max-w-3xl bg-white dark:bg-background rounded-2xl shadow-lg border p-6 space-y-6">

      {/* HEADER */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">
          {isEdit ? "Edit Job" : "Create Job"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details to {isEdit ? "update" : "post"} a job
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput name="company" label="Company" formik={formik} />
          <FormInput name="role" label="Role" formik={formik} />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Job Description
          </label>

          <div className="border rounded-xl p-3 bg-background">
            <RichTextEditor
              value={formik.values.description}
              onChange={(val: string) =>
                formik.setFieldValue("description", val)
              }
            />
          </div>

          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description as string}
            </p>
          )}
        </div>

        {/* JOB DETAILS */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput name="skill" label="Skills Required" formik={formik} />
          <FormInput name="location" label="Location" formik={formik} />
          <FormInput name="experience" label="Experience" formik={formik} />
          <FormInput
            name="expiryDate"
            label="Expiry Date"
            type="date"
            formik={formik}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>

          <Button type="submit" className="cursor-pointer px-6">
            {isEdit ? "Update Job" : "Post Job"}
          </Button>
        </div>

      </form>
    </div>
  </div>
);
}