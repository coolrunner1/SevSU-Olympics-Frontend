import {getScoreWord} from "../../../../utils/getScoreWord.ts";
import type {TaskResponse, TaskStatus} from "../../../../types/task.ts";

export type TaskDescriptionProps = {
    taskInfo: TaskResponse,
    taskStatus?: TaskStatus
}

export const TaskDescription = ({taskInfo, taskStatus}: TaskDescriptionProps) => {
    return (
        <section className="flex flex-col p-3 gap-2 rounded-2xl bg-header">
            <span className="text-xl">{taskInfo.task.name}</span>
            <span className="text-sm">Вес задания: {taskInfo.task.weight} {getScoreWord(taskInfo.task.weight)}</span>
            <span className="text-sm">Статус выполнения:
                {
                    taskStatus === "NOT_STARTED" ?
                        <span className="text-yellow-600"> Не начата</span> :
                        taskStatus === "COMPLETED" ?
                            <span className="text-green-500"> Успех</span> :
                            <span className="text-red-500"> Провал</span>
                }
                                        </span>
            <div className="prose lg:prose-md dark:prose-invert w-full p-2 bg-container rounded-lg" dangerouslySetInnerHTML={{__html: taskInfo.task.description}}></div>
        </section>
    );
};