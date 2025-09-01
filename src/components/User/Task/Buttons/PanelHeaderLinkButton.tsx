import type {ReactNode} from "react";

export type PanelHeaderLinkButtonProps = {
    label: string;
    svg?: ReactNode;
    href: string;
}

export const PanelHeaderLinkButton = ({href, label, svg}: PanelHeaderLinkButtonProps) => {
    return (
        <a href={href} className="flex flex-row items-center p-1 rounded-lg gap-x-1 text-sm sm:text-md transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-950">
            <span>{svg}</span>
            <span>{label}</span>
        </a>
    )
}