'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { updateJobService } from "@/services/application.service";

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

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "offer":
        return "default";
      case "rejected":
        return "destructive";
      case "interview":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-xl border shadow-sm p-4 space-y-4">

      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total Applications: <span className="font-semibold">{applications.length}</span>
        </p>
      </div>

      {/* 🔹 Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((app: any) => (
              <TableRow key={app._id} className="hover:bg-muted/50">

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{app.userId?.name}</span>
                    <a
                      href={`mailto:${app.userId?.email}`}
                      className="text-sm text-muted-foreground hover:text-blue-400 hover:underline"
                    >
                      {app.userId?.email}
                    </a>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {app.jobId?.company}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {app.jobId?.role}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{app.userId?.mobile}</TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(app.status)}>
                    {app.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <a
                    href={app.resume}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </a>
                </TableCell>

                <TableCell className="space-x-2">
                  <Button size="sm" variant="secondary"
                    onClick={() => handleStatusChange(app._id, "Interview")}>
                    Interview
                  </Button>

                  <Button size="sm" variant="destructive"
                    onClick={() => handleStatusChange(app._id, "Rejected")}>
                    Reject
                  </Button>

                  <Button size="sm"
                    onClick={() => handleStatusChange(app._id, "Offer")}>
                    Accept
                  </Button>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 🔹 Pagination */}
      <div className="flex justify-between items-center pt-2">

        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>

        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            className="cursor-pointer"
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            className="cursor-pointer"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </div>

      </div>
    </div>
  );
}