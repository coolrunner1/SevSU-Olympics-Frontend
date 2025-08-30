import type {ReactNode} from "react";

export type PanelHeaderButtonProps = {
    label: string | number;
    svg?: ReactNode;
    onClick: () => void;
}

export const PanelHeaderButton = ({onClick, label, svg}: PanelHeaderButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={"flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-950"}
        >
            {svg && <span>{svg}</span>}
            <span>{label}</span>
        </button>
    )
}