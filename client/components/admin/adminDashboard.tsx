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
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button type="button" className="cursor-pointer" onClick={handleLogout}> Logout</Button>
      </div>
      <Tabs defaultValue="jobs">

        <TabsList className="mx-auto flex w-fit p-1">
          <TabsTrigger value="jobs" className="cursor-pointer">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="applications" className="cursor-pointer">
            Applications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          <div className="flex justify-end py-4">
            <Button className="cursor-pointer" onClick={handleCreate}>
              + Create Job
            </Button>
          </div>
          <JobTable jobs={jobs} onEdit={handleEdit} refresh={fetchJobs} />
        </TabsContent>
        <TabsContent value="applications" className="py-4">
          <ApplicationTable
            applications={applications}
            refresh={fetchApplications}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
}
