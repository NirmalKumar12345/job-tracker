'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  MapPin,
  FileText,
  Building2,
  ClipboardList,
  ExternalLink,
  Phone,
  Mail,
  User,
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

const statusStyles = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "offer":
      return {
        wrap: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/60",
        dot: "bg-emerald-500",
        accent: "from-emerald-500 to-teal-600",
      };
    case "rejected":
      return {
        wrap: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800/60",
        dot: "bg-rose-500",
        accent: "from-rose-500 to-red-600",
      };
    case "interview":
      return {
        wrap: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/60",
        dot: "bg-amber-500",
        accent: "from-amber-500 to-orange-600",
      };
    default:
      return {
        wrap: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-800/60",
        dot: "bg-sky-500",
        accent: "from-sky-500 to-blue-600",
      };
  }
};

export default function UserApplications({ applications }: any) {
  if (!applications?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 backdrop-blur p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/40 dark:to-pink-900/40">
          <ClipboardList className="h-7 w-7 text-pink-600 dark:text-pink-300" />
        </div>
        <p className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-200">
          No applications yet
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Apply for a job to start tracking your applications here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {applications.map((app: any) => {
        const initial = (app.jobId?.company || "?").trim().charAt(0).toUpperCase();
        const gradient = pickGradient(app.jobId?.company || app._id || "");
        const styles = statusStyles(app.status);

        return (
          <Card
            key={app._id}
            className="group relative overflow-hidden rounded-2xl border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top accent matching status */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${styles.accent}`} />
            <div
              className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-linear-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
            />

            {/* HEADER */}
            <CardHeader >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white text-lg font-bold shadow-md`}
                >
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {app.jobId?.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Building2 className="h-3.5 w-3.5" />
                    <span className="truncate">{app.jobId?.company}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                {app.jobId?.location}
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles.wrap}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {app.status}
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-bold">Contact</span>
                <div className="flex gap-2 items-center"><User className="w-4 h-4"/><span className="text-blue-400 capitalize">{app.userId?.name}</span></div>
                <div className="flex gap-2 items-center"><Phone className="w-4 h-4" /> <span>{app.userId?.mobile}</span></div>
                <div className="flex gap-2 items-center"><Mail className="w-4 h-4"/><a href={`mailto:${app.userId?.email}`}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">{app.userId?.email}</a>
                </div>
              </div>
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="pt-0 border-t border-slate-100 dark:border-slate-800">
              <a
                href={app.resume}
                target="_blank"
                className="flex items-center justify-between w-full text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Resume
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
