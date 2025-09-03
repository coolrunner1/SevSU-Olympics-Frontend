import axiosClient from "./axiosClient.ts";
import type {LoginBody, LoginResponse} from "../types/auth.ts";

export const login = async (body: LoginBody): Promise<LoginResponse> => {
    const res = await axiosClient.post("/login", body);
    return res.data;
}