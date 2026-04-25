export interface LoginPayload{
    email: string;
    password: string;
}

export interface SignUpPayload{
    email: string;
    password: string;
    name: string;
    mobile: string;
    role?: string;
}

export interface AuthResponse{
    msg: string;
    token?: string;
    user?: {
        email: string;
        name?: string;
        role?: string;
    };
}