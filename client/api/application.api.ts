import { Application } from "@/types/application.types";
import api from "./axios";

export const getAllApplications = async () => {
    const res = await api.get('/application/getAll');
    return res.data;
}

export const applyJob = async (data: FormData) => {
    const res = await api.post('/application/apply', data, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
}

export const updateJob = async (id: string, data: Partial<Application>) => {
    const res = await api.put(`/application/update/${id}`, data);
    return res.data;
}

export const getUserApplications = async () => {
    const res = await api.get('/application/getUser');
    return res.data;
}