'use client';

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

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateJobService(id, { status });
            refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
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
        <div className="rounded-xl border shadow-sm">
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
                    {applications?.length > 0 ? (
                        applications.map((app: any) => (
                            <TableRow key={app._id} className="hover:bg-muted/50">

                                {/* USER */}
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

                                {/* JOB */}
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
                                <TableCell>
                                    <span className="font-medium">
                                        {app.userId?.mobile}
                                    </span>
                                </TableCell>
                                {/* STATUS */}
                                <TableCell>
                                    <Badge variant={getStatusVariant(app.status)}>
                                        {app.status}
                                    </Badge>
                                </TableCell>

                                {/* RESUME */}
                                <TableCell>
                                    <a
                                        href={app.resume}
                                        target="_blank"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                </TableCell>

                                {/* ACTION */}
                                <TableCell className="space-x-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => handleStatusChange(app._id, "Interview")}
                                    >
                                        Interview
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="cursor-pointer"
                                        onClick={() => handleStatusChange(app._id, "Rejected")}
                                    >
                                        Reject
                                    </Button>

                                    <Button
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => handleStatusChange(app._id, "Offer")}
                                    >
                                        Accept
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                No applications found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}