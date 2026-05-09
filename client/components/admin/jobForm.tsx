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
import {
  Briefcase,
  ArrowLeft,
  FileText,
  Sparkles,
  Building2,
  UserCog,
  MapPin,
  GraduationCap,
  CalendarClock,
  Save,
  IndianRupee,
  Users,
} from "lucide-react";
import TextAreaInput from "../textAreaInput";
import { useLoading } from "@/components/loadingProvider";

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
  const { show, hide } = useLoading();
  const [errors, setErrors] = useState<{
    company?: string;
    role?: string;
    description?: string;
    location?: string;
    experience?: string;
    expiryDate?: string;
  }>({});

  const validateWithZod = (values: any) => {
    const result = JobSchema.safeParse(values);
    if (result.success) return {};

    const errors: any = {};
    result.error.issues.forEach((err) => {
      const key = err.path[0] as string;
      if (!errors[key]) errors[key] = err.message;
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
      salary: initialValues?.salary || "",
      vacancy: initialValues?.vacancy || ""
    },

    enableReinitialize: true,

    validate: validateWithZod,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      const payload = {
        ...values,
        vacancy: Number(values.vacancy)
      };
      try {
        show(isEdit ? "Updating job..." : "Creating job...");
        if (isEdit && jobId) {
          await updateJobService(jobId, payload);
          toast.success("Job updated");
          router.push("/dashboard");
        } else {
          await createJobService(payload);
          toast.success("Job created");
          router.push("/dashboard");
        }
      } catch (err: any) {
        hide();
        const Errors = err?.errors || err?.response?.data?.errors;
        if (Errors && Array.isArray(Errors)) {
          const fieldError: any = {};
          Errors.forEach((e: any) => {
            fieldError[e.field] = e.message;
          });
          setErrors(fieldError);
        } else {
          toast.error(err?.response?.data?.message || "Error");
        }
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-4 md:p-6">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-5">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Hero header */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 md:p-7 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                  {isEdit ? "Edit Listing" : "New Listing"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                {isEdit ? "Edit Job" : "Create a Job"}
              </h1>
              <p className="text-sm text-indigo-100/90">
                Fill in the details to {isEdit ? "update" : "post"} a position
              </p>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
          <form onSubmit={formik.handleSubmit}>
            {/* SECTION: Basic Info */}
            <div className="p-6 md:p-7 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Basic Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Company and role details
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormInput name="company" label="Company" formik={formik} />
                <FormInput name="role" label="Role" formik={formik} />
              </div>
            </div>

            {/* SECTION: Description */}
            <div className="p-6 md:p-7 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-sm">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Job Description
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Responsibilities, expectations and benefits
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-400 transition-all">
                <RichTextEditor
                  value={formik.values.description}
                  onChange={(val: string) =>
                    formik.setFieldValue("description", val)
                  }
                />
              </div>

              {formik.touched.description && formik.errors.description && (
                <p className="text-rose-500 text-sm mt-2 flex items-center gap-1">
                  {formik.errors.description as string}
                </p>
              )}
            </div>

            {/* SECTION: Job Details */}
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                  <UserCog className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Job Details
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Requirements, location and deadline
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-amber-500 pointer-events-none">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="[&_textarea]:pl-9">
                    <TextAreaInput
                      name="skill"
                      label="Skills Required"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-rose-500 pointer-events-none">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="[&_input]:pl-9">
                    <FormInput name="location" label="Location" formik={formik} />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-violet-500 pointer-events-none">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="[&_input]:pl-9">
                    <FormInput
                      name="experience"
                      label="Experience"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-indigo-500 pointer-events-none">
                    <CalendarClock className="h-4 w-4" />
                  </div>
                  <div className="[&_input]:pl-9">
                    <FormInput
                      name="expiryDate"
                      label="Expiry Date"
                      type="date"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-emerald-500 pointer-events-none">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <div className="[&_input]:pl-9">
                    <FormInput
                      name="salary"
                      label="Salary (per year)"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-9 z-10 text-fuchsia-500 pointer-events-none">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="[&_input]:pl-9">
                    <FormInput
                      name="vacancy"
                      label="Vacancies"
                      type="number"
                      formik={formik}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 px-6 md:px-7 py-4 bg-linear-to-r from-slate-50 to-indigo-50/50 dark:from-slate-800/40 dark:to-slate-800/20 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="cursor-pointer px-6 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20"
              >
                <Save className="h-4 w-4 mr-1.5" />
                {isEdit ? "Update Job" : "Post Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
