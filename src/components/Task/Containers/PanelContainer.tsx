import type {ReactNode} from "react";

export type ContainerProps = {
    children: ReactNode;
}

export const PanelContainer = ({children}: ContainerProps) => {
    return (
        <div
            className="max-h-[98vw] md:max-h-[98vh] transition-all duration-400 bg-container rounded-lg shadow-lg hover:shadow-2xl hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-800 scrollbar-hide"
        >
            {children}
        </div>
    )
}