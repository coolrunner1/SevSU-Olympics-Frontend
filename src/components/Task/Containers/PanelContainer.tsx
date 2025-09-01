import type {ReactNode} from "react";

export type ContainerProps = {
    children: ReactNode;
    customStyles?: string;
}

export const PanelContainer = ({children, customStyles}: ContainerProps) => {
    return (
        <div
            className={"flex flex-col select-none h-[90vw] md:h-[90vh] transition-all duration-400 bg-container rounded-lg shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800 scrollbar-hide "+customStyles}
        >
            {children}
        </div>
    )
}