import axiosClient from "./axiosClient.ts";
import type {Competition} from "../types/competition.ts";

export const getCompetition = async (): Promise<Competition> => {
    const res = await axiosClient.get(`/contest/`);
    /*const now = new Date();
    const then = new Date();

    now.setSeconds(now.getSeconds() + 5);

    res.data.startDateTime = now;
    then.setMinutes(then.getMinutes() + 5);
    res.data.endDateTime = then;*/
    return res.data
}

export const finishCompetition = async () => {
    return await axiosClient.post(`/contest/finish`);
}