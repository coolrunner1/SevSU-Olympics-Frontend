import type {BlurryModalBackgroundProps} from "./BlurryModalBackground.tsx";

export const ModalContainer = (props: BlurryModalBackgroundProps) => {
    return (
        <div className="flex flex-col bg-blue-500 rounded-2xl items-center justify-center h-full w-full max-w-96 max-h-80 p-10 text-white">
            {props.children}
        </div>
    );
};