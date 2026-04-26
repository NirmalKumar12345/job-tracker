'use client';

import JobCard from "@/components/user/jobCard";
import { getJobService } from "@/services/job.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobService();
      setJobs(res);
    } catch (err: any) {
      toast.error(err.msg || "Failed to load jobs");
    }
  };

  const handleApply = async (id: string) => {
    try {
      // call apply API here
      toast.success("Applied successfully");

      // refresh jobs
      fetchJobs();
    } catch (err: any) {
      toast.error(err.msg);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.length > 0 ? (
        jobs.map((job: any) => (
          <JobCard key={job._id} job={job} onApply={handleApply} />
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
}