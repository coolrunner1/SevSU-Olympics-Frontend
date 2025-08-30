import {type MouseEvent} from "react";

export type ButtonProps = {
    label: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit" | "reset",
    customStyles?: string,
}

export const BlueButton = (props: ButtonProps) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={(props?.customStyles || "") + " transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"}
        >
            <span>{props.label}</span>
        </button>
    );
};