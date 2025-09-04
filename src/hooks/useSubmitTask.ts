import {useMutation} from "@tanstack/react-query";
import {submitTask} from "../api/tasks.ts";
import {useState} from "react";

export type UseSubmitTaskProps = {
    refetch: () => void;
}

export const useSubmitTask = ({refetch}: UseSubmitTaskProps) => {
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    const {mutate} = useMutation({
        mutationFn: submitTask,
        onMutate: () => {
            setSubmitStatus("Код успешно отправлен")
        },
        onSuccess: (data) => {
            console.log(data);
            setSubmitStatus("Получены результаты");
            refetch();
        },
        onError: (error) => {
            setSubmitStatus(error.message)
        }
    });

    return {submitStatus, mutate, nullifySubmitStatus: () => setSubmitStatus(null)};
}