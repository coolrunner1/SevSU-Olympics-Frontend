import {useQuery} from "@tanstack/react-query";
import {getCompetition} from "../../api/competition.ts";
import {LoadingIndicator} from "../../components/Global/Misc/LoadingIndicator.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export const ContestPage = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);

    const {data, isLoading} = useQuery({
        queryFn: getCompetition,
        queryKey: ["competition"],
    });

    useEffect(() => {
        if (!data) return;
        setInterval(function checkAllowStart(){
            const currentDate = new Date();
            if (currentDate > new Date(data.startDateTime) && currentDate < new Date(data.endDateTime)) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }

            return checkAllowStart;
        }(), 5000)
    }, [data])

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <LoadingIndicator />
            </div>
        )
    }

    if (!isLoading && data) {
        return (
            <main>
                <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 select-none">
                    <h1 className="text-3xl font-bold leading-tight sm:text-6xl mb-4">
                        <span className="hover:animate-pulse">{data.name}</span>
                    </h1>
                    <p className="text-lg max-w-xl mb-2">
                        {data.description}
                    </p>
                    <p className="max-w-xl mb-2">
                        Начало соревнования: {new Date(data.startDateTime).toLocaleString()}
                    </p>
                    <p className="max-w-xl mb-8">
                        Конец соревнования: {new Date(data.endDateTime).toLocaleString()}
                    </p>
                    <button
                        className="p-4 min-w-28 rounded-lg font-semibold animate-bounce hover:animate-none bg-blue-500 text-white disabled:text-gray-900 disabled:bg-gray-400 disabled:animate-none"
                        disabled={disabled}
                        onClick={() => navigate("/tasks/1")}
                    >
                        Начать
                    </button>
                </section>
            </main>
        );
    }
}