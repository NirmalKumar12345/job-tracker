'use client';

import { useEffect, useState } from "react";
import { getAllJobService } from "@/services/job.service";
import { toast } from "react-toastify";
import JobTable from "@/components/admin/jobTable";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getAllApplicationsServices } from "@/services/application.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ApplicationTable from "./applicationTable";
import { useLoading } from "@/components/loadingProvider";
import {
  Briefcase,
  Users,
  Trophy,
  LogOut,
  Plus,
  LayoutDashboard,
  UserCircle,
  Eye,
  XCircle,
} from "lucide-react";

export default function AdminDashboard({ handleLogout }: { handleLogout: () => void }) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const router = useRouter();
  const { show, hide } = useLoading();

  const handleCreate = () => {
    show("Opening job form...");
    router.push("/dashboard/jobs");
  };

  const handleEdit = (job: any) => {
    show("Loading job...");
    router.push(`/dashboard/jobs/${job._id}`);
  };

  useEffect(() => {
    (async () => {
      show("Loading dashboard...");
      try {
        await Promise.all([fetchJobs(), fetchApplications()]);
      } finally {
        hide();
      }
    })();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getAllJobService();
      setJobs(res);
    } catch (err: any) {
      toast.error(err.msg);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await getAllApplicationsServices();
      setApplications(res.applications);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const reviewCount = applications.filter(
    (a: any) => a.status?.toLowerCase() === "reviewing"
  ).length;
  const rejectedCount = applications.filter(
    (a: any) => a.status?.toLowerCase() === "rejected"
  ).length;
  const shortlistedCount = applications.filter(
    (a: any) => a.status?.toLowerCase() === "shortlisted"
  ).length;

  const stats = [
    {
      label: "Active Jobs",
      value: jobs.length,
      icon: Briefcase,
      gradient: "from-indigo-500 to-blue-600",
      ring: "ring-indigo-100",
      text: "text-indigo-600",
    },
    {
      label: "Applications",
      value: applications.length,
      icon: Users,
      gradient: "from-fuchsia-500 to-pink-600",
      ring: "ring-pink-100",
      text: "text-pink-600",
    },
    {
      label: "Review",
      value: reviewCount,
      icon: Eye,
      gradient: "from-amber-500 to-orange-600",
      ring: "ring-amber-100",
      text: "text-amber-600",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      gradient: "from-rose-500 to-red-600",
      ring: "ring-rose-100",
      text: "text-rose-600",
    },
    {
      label: "Shortlisted",
      value: shortlistedCount,
      icon: Trophy,
      gradient: "from-emerald-500 to-teal-600",
      ring: "ring-emerald-100",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
      </div>

      <div className="relative p-6 space-y-6">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-indigo-100/90">
                  Manage jobs, candidates and hiring pipeline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="cursor-pointer bg-white/95 hover:bg-white text-indigo-700 font-medium shadow-md"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-linear-to-br ${s.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {s.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                      {s.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${s.gradient} text-white shadow-md ring-4 ${s.ring} dark:ring-slate-800`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TABS SECTION */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm p-5 md:p-6">
          <Tabs defaultValue="jobs" className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="bg-slate-100 dark:bg-slate-800/60 p-1 rounded-full">
                <TabsTrigger
                  value="jobs"
                  className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Applications
                </TabsTrigger>
              </TabsList>
            </div>

            {/* JOBS TAB */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Job Listings
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Create and manage open positions
                  </p>
                </div>

                <Button
                  className="cursor-pointer bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20"
                  onClick={handleCreate}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create Job
                </Button>
              </div>

              <JobTable jobs={jobs} onEdit={handleEdit} refresh={fetchJobs} />
            </TabsContent>

            {/* APPLICATION TAB */}
            <TabsContent value="applications" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Job Applications
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Review candidates and update their hiring status
                </p>
              </div>

              <ApplicationTable
                applications={applications}
                refresh={fetchApplications}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
