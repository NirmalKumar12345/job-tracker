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

import { Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    <div className="rounded-xl border shadow-sm p-4 space-y-4">

      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total Jobs: <span className="font-semibold">{jobs.length}</span>
        </p>
      </div>

      {/* 🔹 Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job: any) => (
              <TableRow key={job._id} className="hover:bg-muted/50">

                <TableCell className="font-medium">
                  {job.company}
                </TableCell>

                <TableCell>
                  {job.role}
                </TableCell>

                <TableCell className="space-x-3">

                  {/* EDIT */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onEdit(job)}
                          className="cursor-pointer"
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
                            <button className="cursor-pointer">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this job.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => handleDelete(job._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipProvider>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 🔹 Pagination */}
      <div className="flex justify-between items-center pt-2">

        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </p>

        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>

      </div>
    </div>
  );
}