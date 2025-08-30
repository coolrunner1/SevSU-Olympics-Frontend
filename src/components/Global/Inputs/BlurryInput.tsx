import {type ChangeEvent, type KeyboardEvent, type Ref} from "react";

export type InputProps = {
    ref?: Ref<HTMLInputElement>;
    label: string,
    type?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
}

export const BlurryInput = (
    props: InputProps
) => {
    return (
        <>
            <label className="font-semibold text-sm pb-1 block">{props.label}</label>
            <input
                ref={props.ref}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                className={`bg-[#1447e65f] border border-[#1447e65f] rounded-lg px-3 py-2 mt-1 text-sm w-full`}
            />
        </>
    );
};