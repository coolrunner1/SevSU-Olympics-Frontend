import type {User} from "./user.ts";

export type LoginBody = { login: string; password: string };

export type LoginResponse = { token: string; user: User };

export type LoginErrors = {
    login?: string;
    password?: string;
    server?: string;
};