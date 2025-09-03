import type {ReactNode} from "react";

export type PanelHeaderButtonProps = {
    title?: string;
    label?: string | number;
    svg?: ReactNode;
    hideLabelOnSmallScreens?: boolean;
    hideSvgOnSmallScreens?: boolean;
    onClick: () => void;
    onBlur?: () => void;
}

export const PanelHeaderButton = (
    {onClick, label, svg, title, hideLabelOnSmallScreens, hideSvgOnSmallScreens, onBlur}: PanelHeaderButtonProps
) => {
    return (
        <button
            title={title}
            onClick={onClick}
            onBlur={onBlur}
            className={"flex flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-950"}
        >
            {svg && <span className={hideSvgOnSmallScreens ? "hidden sm:inline" : undefined}>{svg}</span>}
            {label && <span className={hideLabelOnSmallScreens ? "hidden sm:inline" : undefined}>{label}</span>}
        </button>
    )
}