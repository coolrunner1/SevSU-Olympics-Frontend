import type {ContainerProps} from "../Containers/PanelContainer.tsx";

export const PageHeader = ({children}: ContainerProps) => {
    return (
        <header className="flex flex-row justify-between p-2 bg-header shadow-lg mb-3">
            {children}
        </header>
    );
};