'use client';

import { useEffect, useState } from "react";
import { getJobByIdService } from "@/services/job.service";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { applyJobService } from "@/services/application.service";
import { toast } from "react-toastify";
import { useLoading } from "@/components/loadingProvider";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Wrench,
  CalendarClock,
  FileText,
  UploadCloud,
  CheckCircle2,
  Send,
  Building2,
  Loader2,
  Sparkles,
} from "lucide-react";

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-red-600",
  "from-cyan-500 to-sky-600",
];

const pickGradient = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

export default function JobDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState<File | null>(null);
  const [job, setJob] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { show, hide } = useLoading();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    show("Loading job...");
    try {
      const res = await getJobByIdService(id as string);
      setJob(res);
    } finally {
      hide();
    }
  };

  const handleApply = async () => {
    try {
      if (!resume) {
        toast.error("Please upload resume");
        return;
      }
      setSubmitting(true);
      show("Submitting application...");
      const formData = new FormData();
      formData.append("jobId", job._id);
      formData.append("resume", resume);
      const res = await applyJobService(formData);
      toast.success(res.msg);
      router.push("/dashboard");
    } catch (err: any) {
      hide();
      toast.error(err?.response?.data?.msg || "Failed");
    } finally {
      setSubmitting(false);
    }
  };


  const isExpired = job?.expiryDate && new Date(job?.expiryDate) < new Date();
  const initial = (job?.company || "?").trim().charAt(0).toUpperCase();
  const gradient = pickGradient(job?.company || job?._id || "");
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-4 md:p-6">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-5">
        {/* Back link */}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* HERO */}
        <div className={`relative overflow-hidden rounded-2xl bg-linear-to-r ${gradient} p-6 md:p-8 shadow-xl`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-1 ring-white/30 text-white text-2xl font-bold shadow-md">
              {initial}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                  Open Position
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                {job?.role}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-white/90 mt-1">
                <Building2 className="h-3.5 w-3.5" />
                <span>{job?.company}</span>
              </div>
            </div>

            {job?.isApplied && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 self-start md:self-auto">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Applied
              </span>
            )}
            {isExpired && !job.isApplied && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200 self-start md:self-auto">
                Expired
              </span>
            )}
          </div>
        </div>

        {/* Info chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Location
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {job?.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Experience
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {job?.experience}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
              <Wrench className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Skills
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {job?.skill}
              </p>
            </div>
          </div>

          {job?.expiryDate && (
            <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                <CalendarClock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Expires
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {new Date(job?.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-fuchsia-50 to-pink-50 dark:from-slate-800/40 dark:to-slate-800/20">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-sm">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Job Description
            </h2>
          </div>
          <div
            className="rich-content max-w-none text-slate-700 dark:text-slate-300 px-6 py-5"
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        </div>

        {/* Resume upload */}
        {!job?.isApplied && !isExpired && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-slate-800/40 dark:to-slate-800/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                <UploadCloud className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Upload Your Resume
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PDF only, max ~5MB
                </p>
              </div>
            </div>

            <div className="p-6">
              <label
                htmlFor="resume"
                className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors cursor-pointer p-8 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-md">
                  <UploadCloud className="h-5 w-5" />
                </div>
                {resume ? (
                  <>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {resume.name}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Ready to upload — click to change
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Click to upload your resume
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      PDF format only
                    </p>
                  </>
                )}
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm p-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          {job?.isApplied ? (
            <Button
              disabled
              className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              Already Applied
            </Button>
          ) : isExpired ? (
            <Button disabled className="bg-slate-100 text-slate-400">
              Position Closed
            </Button>
          ) : (
            <Button
              disabled={submitting}
              className="cursor-pointer px-6 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20"
              onClick={handleApply}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1.5" />
                  Apply Now
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
