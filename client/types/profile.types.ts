export interface ProfilePayload {
    name?: string;
    email?: string;
    mobile?: string;
    location?: string;
    noticePeriod?: string;
    currentCTC?: string;
    expectedCTC?: string;
    experience?: string;
    skills?: string[] | string;
    language?: string[] | string;
    profilePic?: File;
    resume?: File;
}