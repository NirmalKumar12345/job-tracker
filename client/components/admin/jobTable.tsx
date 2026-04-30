'use client';

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function JobTable({ jobs, refresh, onEdit }: any) {

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.length > 0 ? (
            jobs.map((job: any) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">{job.company}</TableCell>
                <TableCell>{job.role}</TableCell>

                <TableCell className="space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onEdit(job)}
                        className="cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>

                  <TooltipProvider>
                    <AlertDialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <button className="cursor-pointer">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this job.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>

                          <AlertDialogAction
                            className="cursor-pointer"
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
    </div>
  );
}