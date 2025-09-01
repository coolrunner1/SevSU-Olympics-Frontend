import {useEffect, useState} from "react";
import {CrossSVG} from "../SVGs/CrossSVG.tsx";
import {TaskBurgerMenuEntry} from "./TaskBurgerMenuEntry.tsx";

export type BurgerMenuProps = {
    selectedTask: number;
    setClosed: () => void;
}

export const TasksBurgerMenu = ({setClosed, selectedTask}: BurgerMenuProps) => {
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
                className={`bg-container h-screen scrollbar-hide w-full md:w-xl md:rounded-r-2xl transition-transform duration-300 transform ${open ? 'translate-x-0' : '-translate-x-full'} `}
            >
                <div className="flex flex-row justify-between p-4 border-b">
                    <div className="font-semibold text-lg">Список задач</div>
                    <div onClick={close}><CrossSVG/></div>
                </div>
                <div className="flex flex-col p-4 max-h-[95%] overflow-y-scroll scrollbar-hide">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item, index) => (
                        <TaskBurgerMenuEntry
                            key={item}
                            title={"test"}
                            id={item}
                            index={index}
                            selected={selectedTask === item}
                            closeBurgerMenu={close}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};