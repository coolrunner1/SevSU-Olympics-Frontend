export type SmallButtonProps = {
    title?: string;
    label?: string | number;
    onClick: () => void;
}

export const SmallRedButton = ({onClick, label, title}: SmallButtonProps) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={"flex flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 text-white bg-red-500 hover:bg-red-700"}
        >
            <span>{label}</span>
        </button>
    )
}