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
    catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed");
    }
  }
  if (!job) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-6">

    {/* Header */}
    <div className="border-b pb-4">
      <h1 className="text-2xl font-bold text-gray-900">{job.role}</h1>
      <p className="text-gray-600">{job.company}</p>
    </div>

    {/* Job Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <p>📍 <span className="font-medium">{job.location}</span></p>
      <p>💼 <span className="font-medium">{job.experience}</span></p>
      <p className="sm:col-span-2">
        🛠 <span className="font-medium">{job.skill}</span>
      </p>
    </div>

    {/* Description */}
    <div>
      <h2 className="text-lg font-semibold mb-2">Job Description</h2>
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>

    {/* Resume Upload */}
    {!job.isApplied && (
      <div className="border rounded-lg p-4 bg-gray-50">
        <label className="block text-sm font-medium mb-2">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:bg-blue-500 file:text-white
                     hover:file:bg-blue-600 file:cursor-pointer"
        />
      </div>
    )}

    {/* Actions */}
    <div className="flex justify-between items-center pt-4 border-t">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        Cancel
      </Button>

      {job.isApplied ? (
        <Button disabled>Already Applied</Button>
      ) : (
        <Button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600"
          onClick={handleApply}
        >
          Apply Now
        </Button>
      )}
    </div>

  </div>
</div>
  );
}