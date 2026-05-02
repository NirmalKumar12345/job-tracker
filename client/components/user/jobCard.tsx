'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MapPin,
  Briefcase,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react";

interface Props {
  job: any;
  onApply: (id: string) => void;
}

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

export default function JobCard({ job }: Props) {
  const isExpired = new Date(job.expiryDate) < new Date();
  const router = useRouter();

  const initial = (job.company || "?").trim().charAt(0).toUpperCase();
  const gradient = pickGradient(job.company || job._id || "");

  const statusBadge = isExpired
    ? {
        wrap: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800/60",
        dot: "bg-rose-500",
        label: "Expired",
      }
    : job.isApplied
    ? {
        wrap: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/60",
        dot: "bg-emerald-500",
        label: "Applied",
      }
    : {
        wrap: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-800/60",
        dot: "bg-sky-500",
        label: "Open",
      };

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${gradient}`} />
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-linear-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
      />

      {/* HEADER */}
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white text-lg font-bold shadow-md`}
          >
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
              {job.role}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <Building2 className="h-3.5 w-3.5" />
              <span className="truncate">{job.company}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-2.5 text-sm pb-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          {job.location}
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          {job.experience}
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          Expires: {new Date(job.expiryDate).toLocaleDateString()}
        </div>

        <div className="pt-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusBadge.wrap}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
            {statusBadge.label}
          </span>
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="pt-0">
        {isExpired ? (
          <Button
            disabled
            size="sm"
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400"
          >
            <Clock className="h-4 w-4 mr-1.5" />
            Closed
          </Button>
        ) : job.isApplied ? (
          <Button
            disabled
            size="sm"
            className="w-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            Applied
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20 group/btn"
            onClick={() => router.push(`/jobs/${job._id}`)}
          >
            Apply Now
            <ArrowRight className="h-4 w-4 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
