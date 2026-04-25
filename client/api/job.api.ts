import { CreateJobPayload ,job} from "@/types/job.types";
import api from "./axios"

export const getJob = async()=>{
    const res= await api.get("/job/getJob");
    return res.data;
}

export const getAllJob = async()=>{
    const res= await api.get("/job/getAllJob");
    return res.data;
}

export const getJobById = async(id: string)=>{
    const res= await api.get(`/job/getJobById/${id}`);
    return res.data;
}

export const createJob = async(data: CreateJobPayload)=>{
    const res = await api.post("/job/create",data)
    return res.data;
}

export const updateJob = async(id: string,data: Partial<job>)=>{
    const res = await api.put(`/job/update/${id}`,data)
    return res.data;
}

export const deleteJob = async(id: string)=>{
    const res = await api.delete(`/job/delete/${id}`)
    return res.data;
}