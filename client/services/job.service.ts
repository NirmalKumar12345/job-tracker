import { createJob, deleteJob, getAllJob, getJob, getJobById, updateJob } from "@/api/job.api";
import { CreateJobPayload, job } from "@/types/job.types";

export const getJobService = async () => {
        const res=await getJob();
        return res.data;
}

export const getAllJobService = async () => {
   const res=  await getAllJob();
   return res.data;
}

export const getJobByIdService = async (id: string) => {
   const res=  await getJobById(id);
   return res.data
   
}

export const createJobService = async (data: CreateJobPayload) => {
   const res=  await createJob(data);
     return res.data
    
}

export const updateJobService = async (id: string, data: Partial<job>) => {
   const res =await updateJob(id, data);
   return res.data
}

export const deleteJobService = async (id: string) => {
    const res=await deleteJob(id);
    return res.data
}