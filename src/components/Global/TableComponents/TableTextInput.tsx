import {type ChangeEventHandler} from "react";

export type TableTextInputProps = {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
}

export const TableTextInput = (
    props: TableTextInputProps
) => {
    return (
        <>
            <input type="text" value={props.value} onChange={props.onChange} placeholder={props.placeholder} className="bg-transparent"/>
        </>
    )
}