import axiosClient from "./axiosClient.ts";
import type {Task} from "../types/task.ts";

export const getTaskById = async ({queryKey}: any): Promise<Task> => {
    const [_key, id] = queryKey;

    const res = await axiosClient.get(`/tasks/${id}`);

    return res.data;
}