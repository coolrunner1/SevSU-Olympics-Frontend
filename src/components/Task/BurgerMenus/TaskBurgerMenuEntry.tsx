export type TaskBurgerMenuEntryProps = {
    id: number;
    title: string;
    selected: boolean;
    onClick: () => void;
}

export const TaskBurgerMenuEntry = ({id, title, selected, onClick}: TaskBurgerMenuEntryProps) => {
    return (
        <div
            className={`p-4 w-full rounded-xl ${
                id % 2 === 1 && "bg-gray-100 dark:bg-gray-800"
            } ${
                selected && "bg-gray-200 dark:bg-gray-950"
            }`}
            onClick={onClick}
        >
            <span className="ml-2">{id}.</span>
            <span> {title}</span>
        </div>
    );
};