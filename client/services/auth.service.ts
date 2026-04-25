import { loginApi, signUpApi } from "@/api/auth.api";
import { LoginPayload, SignUpPayload } from "@/types/auth.types";

export const LoginUser = async (payload: LoginPayload)=>{
    try
    {
      const response = await loginApi(payload);
      //store token in local storage
      if(response.token){
        localStorage.setItem("token", response.token);
      }
      return response;
    }
    catch(error: any){
        throw error.response?.data || error.msg;

    }    

};

export const SignupUser = async (payload: SignUpPayload)=>{
    try
    {
        const response = await signUpApi(payload);
        return response;
    }
    catch(error: any){
        throw error.response?.data || error.msg;
    }
};