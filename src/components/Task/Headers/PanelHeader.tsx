import type {ContainerProps} from "../Containers/PanelContainer.tsx";

export const PanelHeader = ({children}: ContainerProps) => {
    return (
        <div className="flex flex-row gap-2 rounded-t-lg max-w-full p-1 min-h-8 overflow-x-scroll text-nowrap scrollbar-hide bg-header">
            {children}
        </div>
    )
}