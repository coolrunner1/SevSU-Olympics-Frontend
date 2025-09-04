import {useQuery} from "@tanstack/react-query";
import {getTaskById, getTasks} from "../api/tasks.ts";
import {getCompetition} from "../api/competition.ts";
import {useMemo, useState} from "react";

export const useGetDetailedTaskInfo = () => {
    const [taskId, setTaskId] = useState<string>("");

    const {data: tasksList, error: tasksError, refetch: refetchTasksList} = useQuery({
        queryFn: getTasks,
        queryKey: ['tasks'],
    });

    const {data: competitionInfo, refetch: refetchCompetition} = useQuery({
        queryFn: getCompetition,
        queryKey: ['competition'],
    });

    const shouldFetchTask: boolean = useMemo(
        () => {
            const shouldFetchTasks = tasksList && tasksList?.length > 0;
            if (shouldFetchTasks) {
                setTaskId(tasksList[0].id);
            }
            return Boolean(shouldFetchTasks);
        },
        [tasksList],
    )

    const {data: taskInfo, isError, isLoading, refetch: refetchTaskInfo, error: taskError} = useQuery({
        queryFn: getTaskById,
        queryKey: ['tasks', taskId],
        enabled: shouldFetchTask,
    });

    const refetchAll = () => {
        refetchTasksList();
        refetchCompetition();
        refetchTaskInfo();
    }

    return {
        error: tasksError || taskError,
        isLoading,
        isError,
        refetch: () => refetchAll(),
        refetchTaskInfo,
        taskInfo,
        competitionInfo,
        tasksList,
        taskId,
        setTaskId,
    }
}