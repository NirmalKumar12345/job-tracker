'use client';

import { useEffect, useState } from "react";
import { getJobByIdService } from "@/services/job.service";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { applyJobService } from "@/services/application.service";
import { toast } from "react-toastify";

export default function JobDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState<File | null>(null);
  const [job, setJob] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const res = await getJobByIdService(id as string);
    setJob(res);
  };
  const handleApply = async () => {
    try {
      if (!resume) {
      toast.error("Please upload resume");
      return;
    }
      const formData = new FormData();
      formData.append("jobId", job._id);
      formData.append("resume", resume);
      const res = await applyJobService(formData);
      toast.success(res.msg);
      router.push("/dashboard")  
    }
    catch(err:any){
      toast.error(err?.msg || "Login Failed");
    }
  }
  if (!job) return <p>Loading...</p>;

  return (
    <>
    <div className="p-12 md:p-25 flex-col flex justify-center items-center">
      <h1 className="text-2xl font-bold">{job.role}</h1>
      <p className="text-gray-800 font-semibold">{job.company}</p>

      <div className="mt-4 space-y-2">
        <p>📍 {job.location}</p>
        <p>💼 {job.experience}</p>
        <p>{job.description}</p>
        <p>🛠 Skills: {job.skill}</p>
        <p>Resume: {!job.isApplied && (
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        )}</p>
      </div>
    </div>
    <div className="px-10 md:px-90 flex justify-between items-center">
       <Button className="cursor-pointer bg-white text-black border border-black hover:bg-white" onClick={()=>router.back()} >Cancel</Button>
        {job.isApplied ? (
          <Button disabled>Already Applied</Button>
        ) : (
          <Button className="cursor-pointer bg-blue-400 hover:bg-blue-600" onClick={handleApply}>Apply Now</Button>
        )}
      </div>
      </>
  );
}