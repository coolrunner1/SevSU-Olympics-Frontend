import {useEffect, useState} from "react";
import {CrossSVG} from "../SVGs/CrossSVG.tsx";

export type BurgerMenuProps = {
    setClosed: () => void;
}

export const TasksBurgerMenu = ({setClosed}: BurgerMenuProps) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }, [])

    const close = () => {
        setOpen(false);

        setTimeout(() => {
            setClosed();
        }, 400);
    };

    return (
        <div
            onClick={close}
            className={`z-20 fixed top-0 min-h-screen min-w-screen bg-[#000000a0]`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-container min-h-screen overflow-y-scroll scrollbar-hide w-52 transition-transform duration-300 transform ${open ? 'translate-x-0' : '-translate-x-full'} `}
            >
                <div className="flex flex-row justify-between p-2">
                    <div onClick={close}><CrossSVG/></div>
                </div>
            </div>

        </div>
    );
};