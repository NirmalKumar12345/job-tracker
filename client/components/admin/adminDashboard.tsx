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

export default function AdminDashboard({ handleLogout }: { handleLogout: () => void }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const router = useRouter();
  const handleCreate = () => {
    router.push("/dashboard/jobs");
  };

  const handleEdit = (job: any) => {
    router.push(`/dashboard/jobs/${job._id}`);
  };
  useEffect(() => {
    fetchJobs();
    fetchApplications();
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
 return (
  <div className="min-h-screen bg-muted/40 p-6">

    {/* HEADER */}
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="flex items-center justify-between bg-white dark:bg-background border rounded-xl px-6 py-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage jobs and applications
          </p>
        </div>

        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* TABS SECTION */}
      <div className="bg-white dark:bg-background border rounded-xl shadow-sm p-4">

        <Tabs defaultValue="jobs" className="space-y-6">

          {/* CENTERED TAB SWITCH */}
          <div className="flex justify-center">
            <TabsList className="bg-muted p-1 rounded-lg">
              <TabsTrigger value="jobs" className="px-6 cursor-pointer">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="applications" className="px-6 cursor-pointer">
                Applications
              </TabsTrigger>
            </TabsList>
          </div>

          {/* JOBS TAB */}
          <TabsContent value="jobs" className="space-y-4">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Job Listings</h2>

              <Button
                className="cursor-pointer"
                onClick={handleCreate}
              >
                + Create Job
              </Button>
            </div>

            <div className="rounded-xl border overflow-hidden">
              <JobTable
                jobs={jobs}
                onEdit={handleEdit}
                refresh={fetchJobs}
              />
            </div>

          </TabsContent>

          {/* APPLICATION TAB */}
          <TabsContent value="applications" className="space-y-4">

            <h2 className="text-lg font-semibold">
              Job Applications
            </h2>

            <div className="rounded-xl border overflow-hidden">
              <ApplicationTable
                applications={applications}
                refresh={fetchApplications}
              />
            </div>

          </TabsContent>

        </Tabs>
      </div>
    </div>
  </div>
);}
