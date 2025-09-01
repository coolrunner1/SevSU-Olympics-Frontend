import type {SmallButtonProps} from "./SmallRedButton.tsx";

export const SmallBlueButton = ({onClick, label, title}: SmallButtonProps) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={"flex flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 text-white bg-blue-500 hover:bg-blue-700"}
        >
            <span>{label}</span>
        </button>
    )
}