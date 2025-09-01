import {useNavigate} from "react-router";

export type TaskBurgerMenuEntryProps = {
    id: number;
    index: number;
    closeBurgerMenu: () => void;
    title: string;
    selected: boolean;
}

export const TaskBurgerMenuEntry = ({id, title, selected, index, closeBurgerMenu}: TaskBurgerMenuEntryProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        closeBurgerMenu();
        navigate(`/tasks/${id}`)
    }

    return (
        <div
            className={`p-4 w-full rounded-xl transition-colors ${
                index % 2 ? "bg-gray-100 dark:bg-gray-800" : ""
            } ${
                selected ? "bg-gray-200 dark:bg-white text-black" : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={handleClick}
        >
            <span className="ml-2">{id}.</span>
            <span> {title}</span>
        </div>
    );
};