import { CreateJobPayload ,job} from "@/types/job.types";
import api from "./axios"

export const getJob = ()=>{
    return api.get("/job/getJob");
}

export const getAllJob = ()=>{
    return api.get("/job/getAllJob");
}

export const getJobById = (id: string)=>{
    return api.get(`/job/getJobById/${id}`);
}

export const createJob = (data: CreateJobPayload)=>{
    return api.post("/job/create",data)
}

export const updateJob = (id: string,data: Partial<job>)=>{
    return api.put(`/job/update/${id}`,data)
}

export const deleteJob = (id: string)=>{
    return api.delete(`/job/delete/${id}`)
}