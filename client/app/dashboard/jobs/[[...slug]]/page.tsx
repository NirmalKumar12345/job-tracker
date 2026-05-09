'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import JobForm from "@/components/admin/jobForm";
import { getJobByIdService } from "@/services/job.service";
import { toast } from "react-toastify";
import LoadingOverlay from "@/components/loadingOverlay";

export default function JobPage() {
  const params = useParams();

  const slug = params?.slug as string[] | undefined;

  const jobId = slug?.[0];

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await getJobByIdService(jobId || "");
      setJob(res);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ||"Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  if (jobId && loading) return <LoadingOverlay text="Loading job details..." />;

  return (
    <div>
      <JobForm
        initialValues={job}
        isEdit={!!jobId}
        jobId={jobId}
      />
    </div>
  );
}