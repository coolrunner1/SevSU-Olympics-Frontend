import {useNavigate} from "react-router";
import type {TaskStatus} from "../../../../types/task.ts";

export type TaskBurgerMenuEntryProps = {
    id: number;
    closeBurgerMenu: () => void;
    title: string;
    status: TaskStatus;
    weight: number;
    selected: boolean;
}

export const TaskBurgerMenuEntry = (
    {id, title, selected, status, weight, closeBurgerMenu}: TaskBurgerMenuEntryProps
) => {
    const navigate = useNavigate();

    const handleClick = () => {
        closeBurgerMenu();
        navigate(`/tasks/${id}`)
    }

    return (
        <div
            className={`flex flex-row justify-between p-4 w-full rounded-xl transition-colors ${
                id % 2 ? "bg-gray-100 dark:bg-gray-800" : ""
            } ${
                selected ? "bg-gray-200 dark:bg-white text-black" : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={handleClick}
        >
            <div>
                <span className="ml-2">{id}.</span>
                <span> {title}</span>
            </div>
            <div className="flex flex-row gap-2">
                <span>
                    {/*status === "FAILED" &&
                        <span className="text-red-500">Провал</span>
                    }
                    {status === "COMPLETED" &&
                        <span className="text-green-500">Успех</span>
                    */}
                </span>
                <span
                    className={/*weight < 10 ? `text-green-500` : weight < 50 ? `text-yellow-500` : `text-red-500`*/""}
                >
                    {weight} б.
                </span>
                <div
                    className={`w-4 h-4 m-auto ${status === "FAILED" ? "bg-red-800" : ""} ${status === "COMPLETED" ? "bg-green-500" : ""} rounded-full`}
                ></div>
            </div>
        </div>
    );
};