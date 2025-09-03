import axiosClient from "./axiosClient.ts";
import type {Competition} from "../types/competition.ts";

export const getCompetition = async (): Promise<Competition> => {
    const res = await axiosClient.get(`/contest/`)
    return res.data
}