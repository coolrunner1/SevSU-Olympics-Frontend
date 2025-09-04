import {useMutation} from "@tanstack/react-query";
import {submitTask} from "../api/tasks.ts";
import {useState} from "react";

export const useSubmitTask = () => {
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    const {mutate} = useMutation({
        mutationFn: submitTask,
        onMutate: () => {
            setSubmitStatus("Отправлен")
        },
        onSuccess: (data) => {
            console.log(data);
            setSubmitStatus("Вернулся");
        },
        onError: (error) => {
            setSubmitStatus(error.message)
        }
    });

    return {submitStatus, mutate, nullifySubmitStatus: () => setSubmitStatus(null)};
}