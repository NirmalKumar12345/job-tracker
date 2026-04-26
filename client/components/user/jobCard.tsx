'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  job: any;
  onApply: (id: string) => void;
}

export default function JobCard({ job, onApply }: Props) {
  const isExpired = new Date(job.expiryDate) < new Date();
  const router = useRouter();

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      
      <h2 className="text-lg font-semibold">{job.role}</h2>
      <p className="text-sm text-gray-500">{job.company}</p>

      <div className="mt-2 text-sm">
        <p>📍 {job.location}</p>
        <p>💼 {job.experience}</p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Exp: {new Date(job.expiryDate).toLocaleDateString()}
        </span>

        {isExpired ? (
          <span className="text-red-500 text-sm">Expired</span>
        ) : job.isApplied ? (
          <Button disabled>Applied</Button>
        ) : (
          <Button className="cursor-pointer" onClick={() => router.push(`/jobs/${job._id}`)}>
            Apply
          </Button>
        )}
      </div>
    </div>
  );
}