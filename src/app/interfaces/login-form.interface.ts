export interface LoginForm {
    email?: string | null | undefined;
    password?: string | null | undefined;
}


export interface LoginResponse{
    msg:string;
    ok: boolean;
    token: string;
}