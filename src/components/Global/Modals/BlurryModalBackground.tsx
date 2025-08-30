import {type ReactNode} from "react";

export type BlurryModalBackgroundProps = {
    children: ReactNode;
}

export const BlurryModalBackground = (props: BlurryModalBackgroundProps) => {
    return (
        <div className="flex justify-center items-center fixed z-50 w-screen h-screen backdrop-blur-2xl">
            {props.children}
        </div>
    );
};