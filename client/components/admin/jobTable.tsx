'use client';

import { useState } from "react";
import { deleteJobService } from "@/services/job.service";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Pencil,
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-red-600",
  "from-cyan-500 to-sky-600",
];

const pickGradient = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

export default function JobTable({ jobs, refresh, onEdit }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(jobs.length / pageSize);

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteJobService(id);
      toast.success(res?.msg || "Job Deleted");
      refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed to delete job");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-indigo-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
            <Briefcase className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Total Jobs:{" "}
            <span className="font-bold text-indigo-700 dark:text-indigo-300">
              {jobs.length}
            </span>
          </p>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Company
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Role
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Location
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job: any) => {
              const initial = (job.company || "?").trim().charAt(0).toUpperCase();
              const gradient = pickGradient(job.company || job._id || "");
              return (
                <TableRow
                  key={job._id}
                  className="border-slate-100 dark:border-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br ${gradient} text-white font-bold shadow-sm`}
                      >
                        {initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {job.company}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          Employer
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-blue-800/60">
                      {job.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-blue-800/60">
                      {job.location}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {/* EDIT */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => onEdit(job)}
                              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-amber-600 dark:text-amber-400 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* DELETE */}
                      <TooltipProvider>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <button className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 transition-colors">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this job.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(job._id)}
                                className="bg-rose-600 cursor-pointer hover:bg-rose-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow >
              <TableCell
                colSpan={5}
                className="text-center py-12 text-slate-400 dark:text-slate-500"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">No jobs found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Page <span className="font-semibold text-slate-700 dark:text-slate-200">{currentPage}</span>{" "}
          of <span className="font-semibold text-slate-700 dark:text-slate-200">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            className="cursor-pointer"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages || totalPages === 0}
            className="cursor-pointer"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
