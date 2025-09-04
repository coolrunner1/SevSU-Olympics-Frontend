import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {finishCompetition} from "../api/competition.ts";

export const useHandleFinish = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn: finishCompetition,
        onSuccess: () => {
            signOut();
            navigate("/");
        },
        onError: () => {
            alert("Что-то пошло не так")
        }
    });

    return {mutate};
}