'use client';

import JobCard from "@/components/user/jobCard";
import { getJobService } from "@/services/job.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { getUserApplicationsService } from "@/services/application.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserApplications from "./userApplication";
import { useLoading } from "@/components/loadingProvider";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  LogOut,
  Search,
  Sparkles,
  Rocket,
  UserCircle,
} from "lucide-react";

export default function UserDashboard({ handleLogout }: { handleLogout: () => void }) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const { show, hide } = useLoading();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      show("Loading jobs...");
      try {
        await Promise.all([fetchJobs(), fetchApplications()]);
      } finally {
        hide();
      }
    })();
  }, []);
  const validApplications = applications.filter(
  (app: any) => app.jobId
);

  const fetchJobs = async () => {
    try {
      const res = await getJobService();
      setJobs(res);
    } catch (err: any) {
      toast.error(err.msg || "Failed to load jobs");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await getUserApplicationsService();
      setApplications(res.applications);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleApply = async () => {
    try {
      toast.success("Applied successfully");
      fetchJobs();
    } catch (err: any) {
      toast.error(err.msg);
    }
  };

  const filteredJobs = jobs.filter((j: any) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      j.role?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <div className="relative  p-4 md:p-6">
        {/* STICKY: hero + tabs pinned to top while card grid scrolls */}
        <Tabs defaultValue="jobs">
        <div className="sticky top-0 z-30 -mx-4 md:-mx-6 px-4 md:px-6 -mt-4 md:-mt-6 pt-4 md:pt-6 pb-4 space-y-4 bg-linear-to-br from-slate-50/90 via-blue-50/80 to-purple-50/80 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-indigo-950/80 backdrop-blur-md">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 md:p-8 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-200" />
                  <span className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                    Find your dream role
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                  Welcome back!
                </h1>
                <p className="text-sm text-indigo-100/90">
                  Browse open positions and track your applications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <Button
                variant="secondary"
                type="button"
                className="cursor-pointer bg-white/15 hover:bg-white/25 text-white font-medium ring-1 ring-white/30 backdrop-blur-sm shadow-md"
                onClick={() => {
                  show("Opening profile...");
                  router.push("/profile");
                }}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="cursor-pointer bg-white/95 hover:bg-white text-indigo-700 font-medium shadow-md"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mt-6 max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, company or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/95 backdrop-blur-sm pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-md ring-1 ring-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        {/* TABS LIST (still inside sticky wrapper) */}
        <div className="flex justify-center">
          <TabsList className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-1 rounded-full shadow-sm">
            <TabsTrigger
              value="jobs"
              className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs ({jobs.length})
            </TabsTrigger>

            <TabsTrigger
              value="applications"
              className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              My Applications ({validApplications.length})
            </TabsTrigger>
          </TabsList>
        </div>
        </div>
        {/* end sticky wrapper */}

        <div className="pt-6">
          {/* JOBS TAB */}
          <TabsContent value="jobs">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job: any) => (
                  <JobCard key={job._id} job={job} onApply={handleApply} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 backdrop-blur p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40">
                  <Briefcase className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
                </div>
                <p className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-200">
                  {query ? "No matching jobs" : "No jobs available"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {query
                    ? "Try a different keyword or clear the search"
                    : "Check back later for new openings"}
                </p>
              </div>
            )}
          </TabsContent>

          {/* APPLICATIONS TAB */}
          <TabsContent value="applications">
            <UserApplications applications={applications} />
          </TabsContent>
        </div>
        </Tabs>
      </div>
    </div>
  );
}
