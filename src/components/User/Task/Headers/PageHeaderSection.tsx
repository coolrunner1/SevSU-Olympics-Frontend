import type {ContainerProps} from "../Containers/PanelContainer.tsx";

export const PageHeaderSection = ({children}: ContainerProps) => {
    return (
        <div className="flex flex-row gap-2">
            {children}
        </div>
    );
};