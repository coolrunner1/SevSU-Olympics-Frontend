import {useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTaskById, getTasks} from "../../api/tasks.ts";
import {useEffect, useMemo, useState} from "react";
import {CodeEditor} from "../../components/Global/Editors/CodeEditor.tsx";
import {PanelHeaderLinkButton} from "../../components/User/Task/Buttons/PanelHeaderLinkButton.tsx";
import {DescriptionIcon} from "../../components/User/Task/SVGs/DescriptionIcon.tsx";
import {ExpectedBehaviorIcon} from "../../components/User/Task/SVGs/ExpectedBehaviorIcon.tsx";
import {ResultsIcon} from "../../components/User/Task/SVGs/ResultsIcon.tsx";
import {PanelContainer} from "../../components/User/Task/Containers/PanelContainer.tsx";
import {PanelHeader} from "../../components/User/Task/Headers/PanelHeader.tsx";
import {CodeIcon} from "../../components/User/Task/SVGs/CodeIcon.tsx";
import {PanelHeaderButton} from "../../components/User/Task/Buttons/PanelHeaderButton.tsx";
import {FullScreenIcon} from "../../components/User/Task/SVGs/FullScreenIcon.tsx";
import {ShrinkIcon} from "../../components/User/Task/SVGs/ShrinkIcon.tsx";
import {useHandleMaliciousInputs} from "../../hooks/useHandleMaliciousInputs.ts";
import {OkModal} from "../../components/Global/Modals/OkModal.tsx";
import {TasksIcon} from "../../components/User/Task/SVGs/TasksIcon.tsx";
//import {RunIcon} from "../../components/Task/SVGs/RunIcon.tsx";
import {StopwatchIcon} from "../../components/User/Task/SVGs/StopwatchIcon.tsx";
import {SmallRedButton} from "../../components/Global/Buttons/SmallButtons/SmallRedButton.tsx";
import {SubmitIcon} from "../../components/User/Task/SVGs/SubmitIcon.tsx";
import {PageHeader} from "../../components/User/Task/Headers/PageHeader.tsx";
import {PageHeaderSection} from "../../components/User/Task/Headers/PageHeaderSection.tsx";
import {TasksBurgerMenu} from "../../components/User/Task/BurgerMenus/TasksBurgerMenu.tsx";
import {CPP_Template} from "../../constants/languageTemplates.ts";
import {YesNoModal} from "../../components/Global/Modals/YesNoModal.tsx";
import {MALICIOUS_INPUT_MESSAGES} from "../../constants/maliciousInputDetectionMessages.ts";
import {getScoreWord} from "../../utils/getScoreWord.ts";
import {LeftNavIcon} from "../../components/User/Task/SVGs/LeftNavIcon.tsx";
import {RightNavIcon} from "../../components/User/Task/SVGs/RightNavIcon.tsx";

export const TaskPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>(CPP_Template);
    const [isCodeFullScreen, setIsCodeFullScreen] = useState<boolean>(false);
    const [tasksOpen, setTasksOpen] = useState<boolean>(false);
    const [finishButtonPressed, setFinishButtonPressed] = useState<boolean>(false);
    const [showRemainingTime, setShowRemainingTime] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");

    const {maliciousAction, clearMaliciousAction} = useHandleMaliciousInputs({
        disableActivityTimestamps: false,
        disableMouseLeaveDetection: true,
        disableCopyPasteDetection: false,
    });

    const {data: tasksList} = useQuery({
        queryFn: getTasks,
        queryKey: ['tasks'],
    });

    const shouldFetchTask: boolean = useMemo(
        () => {
            const shouldFetchTasks = tasksList && tasksList?.length > 0;
            if (shouldFetchTasks) {
                setTaskId(tasksList[0].id);
            }
            return Boolean(shouldFetchTasks);
        },
        [tasksList],
    )

    const {data, isError, isLoading, error, refetch} = useQuery({
        queryFn: getTaskById,
        queryKey: ['tasks', taskId],
        enabled: shouldFetchTask,
    });

    useEffect(() => {
        const idNum = Number(id)

        if (!idNum || idNum < 0) {
            navigate(`/tasks/1`);
            return;
        }

        if (!tasksList || !tasksList.length) {
            return;
        }

        if (tasksList?.length < idNum) {
            navigate(`/tasks/1`);
            return;
        }

        setTaskId(tasksList[idNum - 1].id)
    }, [id, tasksList]);

    return (
        <>
            {maliciousAction &&
                <OkModal
                    message={MALICIOUS_INPUT_MESSAGES[maliciousAction]}
                    setClose={clearMaliciousAction}
                />
            }
            {finishButtonPressed &&
                <YesNoModal
                    title={"Вы уверены, что хотите завершить выполнение заданий?"}
                    onYesClick={() => alert("placeholder")}
                    onNoClick={() => setFinishButtonPressed(false)}
                />
            }
            {error &&
                <OkModal
                    message={error.message}
                    setClose={refetch}
                />
            }
            {tasksOpen && tasksList &&
                <TasksBurgerMenu
                    selectedTask={Number(id)}
                    setClosed={() => setTasksOpen(false)}
                    tasks={tasksList}
                />
            }

            <div>
                <PageHeader>
                    <PageHeaderSection>
                        <PanelHeaderButton
                            hideLabelOnSmallScreens={true}
                            label={"Показать задания"}
                            svg={<TasksIcon/>}
                            onClick={() => setTasksOpen(true)}
                        />
                        <div className="flex flex-row">
                            <PanelHeaderButton
                                svg={<LeftNavIcon/>}
                                onClick={() => navigate(`/tasks/${Number(id)-1}`)}
                            />
                            <PanelHeaderButton
                                svg={<RightNavIcon/>}
                                onClick={() => navigate(`/tasks/${Number(id)+1}`)}
                            />
                        </div>
                    </PageHeaderSection>
                    <PageHeaderSection>
                        {/*<PanelHeaderButton
                            hideLabelOnSmallScreens={true}
                            label={"Запустить"}
                            svg={<RunIcon/>}
                            onClick={() => alert(`/tasks/1`)}
                        />*/}
                        <PanelHeaderButton
                            hideLabelOnSmallScreens={true}
                            label={"Отправить"}
                            svg={<SubmitIcon/>}
                            onClick={() => alert(`/tasks/1`)}
                        />
                    </PageHeaderSection>
                    <PageHeaderSection>
                        {showRemainingTime &&
                            <div className="mt-7 md:mr-4 bg-header absolute rounded-xl p-3 z-10 text-sm shadow-lg">
                                Время начала:<br/> 00:00:00<br/>
                                Время окончания:<br/> 00:00:00
                            </div>
                        }
                        <PanelHeaderButton
                            hideSvgOnSmallScreens={true}
                            label={"00:00"}
                            svg={<StopwatchIcon/>}
                            onClick={() => setShowRemainingTime(true)}
                            onBlur={() => setShowRemainingTime(false)}
                        />
                        <SmallRedButton
                            title={"Завершить выполнение заданий"}
                            label={"Завершить"}
                            onClick={() => setFinishButtonPressed(true)}
                        />
                    </PageHeaderSection>
                </PageHeader>
                <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2 p-2">
                    <PanelContainer
                        customStyles={isCodeFullScreen ? "hidden" : undefined}
                    >
                        <PanelHeader>
                            <PanelHeaderLinkButton
                                href={"#description"}
                                label={"Постановка задачи"}
                                svg={<DescriptionIcon/>}
                            />
                            <PanelHeaderLinkButton
                                href={"#expected-behavior"}
                                label={"Вводные данные"}
                                svg={<ExpectedBehaviorIcon/>}
                            />
                            {data && data.attempts.length > 0 &&
                                <PanelHeaderLinkButton
                                    href={"#results"}
                                    label={"Результаты проверки"}
                                    svg={<ResultsIcon/>}
                                />
                            }
                        </PanelHeader>

                        {isLoading &&
                            <div className="h-screen w-full animate-pulse bg-header">

                            </div>
                        }
                        {!isLoading && !isError && data && (
                            <>
                                <div className="max-h-full p-3 md:px-5 overflow-scroll scrollbar-hide">
                                    <h2 id={"description"} className={"text-2xl mt-2 mb-1"}>Постановка задачи</h2>

                                    {data.task.description}

                                    <h2 id={"expected-behavior"} className={"text-2xl mt-2 mb-1"}>Вводные данные</h2>

                                    <table className="p-2 bg-header">
                                        <tbody className="p-2">
                                        <tr className="border">
                                            <th className="border p-1">Ограничения по времени</th>
                                            <td className="border p-1">{data.task.timeLimit} мс</td>
                                        </tr>
                                        <tr className="border">
                                            <th className="border p-1">Ограничения по памяти</th>
                                            <td className="border p-1">{data.task.memoryLimit} кбайт</td>
                                        </tr>
                                        <tr className="border">
                                            <th className="border p-1">Значимость задания</th>
                                            <td className="border p-1">{data.task.weight} {getScoreWord(data.task.weight)}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    {data.attempts.length > 0 &&
                                        <>
                                            <h2 id={"results"} className={"text-2xl mt-2 mb-1"}>Результаты проверки</h2>

                                            {data.attempts.map(() => <>placeholder</>)}
                                        </>
                                    }

                                    <div className="h-[90vh]"></div>
                                </div>
                            </>
                        )
                        }
                    </PanelContainer>
                    <PanelContainer
                        customStyles={isCodeFullScreen ? "col-span-2" : ""}
                    >
                        <PanelHeader>
                            <div className="flex flex-row w-full justify-between">
                                <PanelHeaderLinkButton
                                    href={"#code"}
                                    label={"Код"}
                                    svg={<CodeIcon/>}
                                />
                                <PanelHeaderButton
                                    title={isCodeFullScreen ? "Уменьшить" : "На весь экран"}
                                    svg={isCodeFullScreen ? <ShrinkIcon/> : <FullScreenIcon/>}
                                    onClick={() => {
                                        setIsCodeFullScreen(!isCodeFullScreen)
                                    }}
                                />
                            </div>
                        </PanelHeader>
                        <CodeEditor
                            mode={"c_cpp"}
                            code={code}
                            setCode={setCode}
                        />
                    </PanelContainer>
                </div>
            </div>
        </>
    )
}