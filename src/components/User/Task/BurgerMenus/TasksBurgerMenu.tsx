import {useEffect, useState} from "react";
import {CrossSVG} from "../SVGs/CrossSVG.tsx";
import {TaskBurgerMenuEntry} from "./TaskBurgerMenuEntry.tsx";
import type {Task} from "../../../../types/task.ts";

export type BurgerMenuProps = {
    selectedTask: number;
    setClosed: () => void;
    tasks: Task[]
}

export const TasksBurgerMenu = ({setClosed, selectedTask, tasks}: BurgerMenuProps) => {
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
            className={`select-none z-20 fixed top-0 min-h-screen min-w-screen bg-[#000000a0]`}
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
                    {tasks.map((item, index) => (
                        <TaskBurgerMenuEntry
                            key={item.id}
                            title={item.name}
                            weight={item.weight}
                            status={item.status}
                            id={index+1}
                            selected={selectedTask === index+1}
                            closeBurgerMenu={close}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};