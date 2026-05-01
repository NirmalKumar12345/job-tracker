'use client';

import JobCard from "@/components/user/jobCard";
import { getJobService } from "@/services/job.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { getUserApplicationsService } from "@/services/application.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserApplications from "./userApplication";

export default function UserDashboard({ handleLogout }: { handleLogout: () => void }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

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
  const handleApply = async (id: string) => {
    try {
      toast.success("Applied successfully");
      fetchJobs();
    } catch (err: any) {
      toast.error(err.msg);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Button
          type="button"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Tabs defaultValue="jobs">

        <TabsList className="mx-auto flex w-fit p-1">
          <TabsTrigger className="cursor-pointer" value="jobs">
            Jobs ({jobs.length})
          </TabsTrigger>

          <TabsTrigger className="cursor-pointer" value="applications">
            My Applications ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* JOBS TAB */}
        <TabsContent value="jobs">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length > 0 ? (
              jobs.map((job: any) => (
                <JobCard key={job._id} job={job} onApply={handleApply} />
              ))
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        </TabsContent>  
        <TabsContent value="applications">
          <UserApplications applications={applications} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
