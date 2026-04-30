import { applyJob, getAllApplications, getUserApplications, updateJob } from "@/api/application.api";
import { Application } from "@/types/application.types";

export const getAllApplicationsServices = async () => {
    const res = await getAllApplications();
    return res.data;
}

export const applyJobService = async (data: FormData) => {
    const res = await applyJob(data);
    return res.data;
}

export const updateJobService = async (id: string, data: Partial<Application>) => {
    const res = await updateJob(id, data);
    return res.data;
}

export const getUserApplicationsService = async () => {
        const res = await getUserApplications();
        return res.data;
}
