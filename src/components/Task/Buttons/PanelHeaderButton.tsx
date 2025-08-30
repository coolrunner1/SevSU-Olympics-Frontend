import type {ReactNode} from "react";

export type PanelHeaderButtonProps = {
    title?: string;
    label?: string | number;
    svg?: ReactNode;
    onClick: () => void;
}

export const PanelHeaderButton = ({onClick, label, svg, title}: PanelHeaderButtonProps) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={"flex flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-950"}
        >
            {svg && <span>{svg}</span>}
            {label && <span>{label}</span>}
        </button>
    )
}