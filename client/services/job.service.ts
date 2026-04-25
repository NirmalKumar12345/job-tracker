import { createJob, deleteJob, getAllJob, getJob, getJobById, updateJob } from "@/api/job.api";
import { CreateJobPayload, job } from "@/types/job.types";

export const getJobService = async () => {
    try {
        return await getJob();
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}

export const getAllJobService = async () => {
    try {
        return await getAllJob();
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}

export const getJobByIdService = async (id: string) => {
    try {
        return await getJobById(id);
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}

export const createJobService = async (data: CreateJobPayload) => {
    try {
        return await createJob(data);
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}

export const updateJobService = async (id: string, data: Partial<job>) => {
    try {
        return await updateJob(id, data);
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}

export const deleteJobService = async (id: string) => {
    try {
        return await deleteJob(id);
    }
    catch (err: any) {
        throw err?.response?.data || { msg: "Something went wrong" };
    }
}