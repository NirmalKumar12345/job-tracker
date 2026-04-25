export interface job {
    _id: string;
    company: string;
    role: string;
    location: string;
    description: string;
    experience: string;
    skill: string;
    expiryDate?: string;
    createdAt?: string;
    isApplied?: boolean;
}

export interface CreateJobPayload {
    company: string;
    role: string;
    location: string;
    description: string;
    experience: string;
    skill: string;
    expiryDate?: string;
    createdAt?: string;
}