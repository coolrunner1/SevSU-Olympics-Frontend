import axiosClient from "./axiosClient.ts";
import type {SubmitTaskBody, Task, TaskResponse} from "../types/task.ts";
import type {QueryKeyRequest} from "./queryClient.ts";

export const getTasks = async (): Promise<Task[]> => {
    const res = await axiosClient.get(`/contest/tasks`);

    return res.data;
}

export const getTaskById = async ({queryKey}: QueryKeyRequest): Promise<TaskResponse> => {
    const [, id] = queryKey;

    const res = await axiosClient.get(`/contest/tasks/${id}`);

    return res.data;
}

export const submitTask = async (body: SubmitTaskBody)=> {
    const res = await axiosClient.post(`/contest/task-check`, body);

    return res.data;
}