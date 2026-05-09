'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { updateJobService } from "@/services/application.service";
import {
  Phone,
  FileText,
  CheckCircle2,
  XCircle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Eye,
  BadgeCheck,
} from "lucide-react";

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
const statusStyles = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "offer":
      return {
        wrap: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800/60",
        dot: "bg-emerald-500",
      };
    case "rejected":
      return {
        wrap: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800/60",
        dot: "bg-rose-500",
      };
    case "interview":
      return {
        wrap: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/60",
        dot: "bg-amber-500",
      };
    default:
      return {
        wrap: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-800/60",
        dot: "bg-sky-500",
      };
  }
};

export default function ApplicationTable({ applications, refresh }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(applications.length / pageSize);

  const paginatedData = applications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateJobService(id, { status });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-linear-to-r from-fuchsia-50 to-pink-50 dark:from-slate-800/50 dark:to-slate-800/30 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-sm">
            <Users className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Total Applications:{" "}
            <span className="font-bold text-pink-700 dark:text-pink-300">
              {applications.length}
            </span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Candidate
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Job
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Mobile
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Resume
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((app: any) => {
                const name = app.userId?.name || "?";
                const initial = name.trim().charAt(0).toUpperCase();
                const gradient = pickGradient(app.userId?._id || name);
                const styles = statusStyles(app.status);
                const isShortlisted = app.status === "Shortlisted";
                const isRejected = app.status === "Rejected";
                const isReviewing = app.status === "Reviewing";

                const isFinalStatus = isReviewing ||isShortlisted || isRejected;
                return (
                  <TableRow
                    key={app._id}
                    className="border-slate-100 dark:border-slate-800 hover:bg-pink-50/30 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${gradient} text-white font-bold shadow-sm ring-2 ring-white dark:ring-slate-900`}
                        >
                          {initial}
                        </div>
                        <div className="flex flex-col">
                          <span className="capitalize font-semibold text-slate-900 dark:text-white">
                            {name}
                          </span>
                          <a
                            href={`mailto:${app.userId?.email}`}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                          >
                            {app.userId?.email}
                          </a>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {app.jobId?.company}
                        </span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400">
                          {app.jobId?.role}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {app.userId?.mobile}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles.wrap}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {app.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <a
                        href={app.resume}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        View
                      </a>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isFinalStatus}
                          className="cursor-pointer h-8 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-300"
                          onClick={() => handleStatusChange(app._id, "Reviewing")}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          {app.status === "Reviewing" ? "Reviewing" : "Review"}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isFinalStatus}
                          className="cursor-pointer h-8 border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 dark:bg-rose-950/30 dark:border-rose-800/50 dark:text-rose-300"
                          onClick={() => handleStatusChange(app._id, "Rejected")}
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                         {isRejected ? "Rejected" : "Reject"}
                        </Button>

                        <Button
                          size="sm"
                          disabled={isFinalStatus}
                          className="cursor-pointer h-8 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-sm"
                          onClick={() => handleStatusChange(app._id, "Shortlisted")}
                        >
                          <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                         {isShortlisted ? "Shortlisted" : "Shortlist"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-slate-400 dark:text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium">No applications yet</p>
                    <p className="text-xs">
                      Candidate applications will appear here
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Page{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {totalPages || 1}
          </span>
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
