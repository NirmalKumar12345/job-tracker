import { Application } from "@/types/application.types";
import api from "./axios";

export const getAllApplications = () => {
    return api.get('/application/getAll');
}

export const applyJob = (data: FormData) => {
    return api.post('/application/apply', data, { headers: { "Content-Type": "multipart/form-data" } });
}

export const updateJob =  (id: string, data: Partial<Application>) => {
    return api.put(`/application/update/${id}/status`, data);
}

export const getUserApplications = () => {
    return api.get('/application/getUser');
}