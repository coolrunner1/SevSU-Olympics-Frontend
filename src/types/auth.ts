export type LoginBody = { login: string; password: string };

export type LoginResponse = { token: string; user: unknown };

export type LoginErrors = {
    login?: string;
    password?: string;
    server?: string;
};