'use client';

import { useEffect, useState } from "react";
import { getAllJobService } from "@/services/job.service";
import { toast } from "react-toastify";
import JobTable from "@/components/admin/jobTable";
import JobForm from "@/components/admin/jobForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AdminDashboard({handleLogout}: {handleLogout: () => void}) {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [editJob, setEditJob] = useState<any>(null);
  const handleCreate = () => {
    router.push("/dashboard/jobs");
  };

  const handleEdit = (job: any) => {
    router.push(`/dashboard/jobs/${job._id}`);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getAllJobService();
      setJobs(res);
    } catch (err: any) {
      toast.error(err.msg);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button type="button" className="cursor-pointer" onClick={handleLogout}> Logout</Button>
      </div>
       <div className="flex justify-end">
        <Button className="cursor-pointer" onClick={handleCreate}>
          + Create Job
        </Button>
      </div>
      <JobTable jobs={jobs} onEdit={handleEdit} refresh={fetchJobs}  />

    </div>
  );
}
