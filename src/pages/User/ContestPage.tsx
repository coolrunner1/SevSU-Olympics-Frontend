import {useQuery} from "@tanstack/react-query";
import {getCompetition} from "../../api/competition.ts";
import {LoadingIndicator} from "../../components/Global/Misc/LoadingIndicator.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {OkModal} from "../../components/Global/Modals/OkModal.tsx";

export const ContestPage = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const [disabled, setDisabled] = useState(true);

    const {data, isLoading, error} = useQuery({
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
    }, [data]);

    const handleSignOut = () => {
        signOut();
        navigate("/");
    }

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <LoadingIndicator />
            </div>
        )
    }

    if (error) {
        return (
            <OkModal
                message={error.message}
                setClose={handleSignOut}
            />
        )
    }

    if (data) {
        return (
            <main>
                <button
                    className="absolute right-0 p-2 m-2 min-w-14 rounded-lg text-sm font-semibold transition-colors duration-300 bg-red-500 hover:bg-red-800 text-white"
                    onClick={handleSignOut}
                >
                    Выйти
                </button>
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
                    {/*<button
                        className="p-4 mt-2 min-w-28 rounded-lg font-semibold bg-red-500 text-white"
                        onClick={() => navigate("/tasks/1")}
                    >
                        Выйти
                    </button>*/}
                </section>
            </main>
        );
    }

    return null;
}