import { applyJob, getAllApplications, getUserApplications, updateJob } from "@/api/application.api";
import { Application } from "@/types/application.types";

export const getAllApplicationsServices = async () => {
    try {
        const res = await getAllApplications();
        return res;
    }
    catch (err: any) {
        throw new Error(err?.response?.data);
    }
}

export const applyJobService = async (data: FormData) => {
    try {
        const res = await applyJob(data);
        return res;
    } catch (err: any) {
        throw new Error(err?.response?.data);
    }
}

export const updateJobService = async (id: string, data: Partial<Application>) => {
    try {
        const res = await updateJob(id, data);
        return res;
    } catch (err: any) {
        throw new Error(err?.response?.data);
    } 
}

export const getUserApplicationsService = async () => {
    try {
        const res = await getUserApplications();
        return res;
    }
    catch (err: any) {
        throw new Error(err?.response?.data);
    }
}
