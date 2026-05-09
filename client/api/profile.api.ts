import api from "./axios";

 export const getProfile =()=>{
    return api.get("/profile/get");
 }

 export const updateProfile =(data: FormData)=>{
    return api.patch("/profile/update",data,{ headers: { "Content-Type": "multipart/form-data" } });
 }