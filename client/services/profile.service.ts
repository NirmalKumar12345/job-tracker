import { getProfile, updateProfile } from "@/api/profile.api";

export const getProfileService = async () => {
    const res = await getProfile();
    return res.data;
}

export const updateProfileService = async (data: FormData) => {
    const res = await updateProfile(data);
    return res.data;
}