export type InputErrorProps = {
    error?: string;
}

export const InputError = (props: InputErrorProps) => {
    return (
        <>
            {props.error ?
                <div className="text-red-500 mb-2">{props.error}</div>
                : <div className="py-3"></div>
            }
        </>
    );
};