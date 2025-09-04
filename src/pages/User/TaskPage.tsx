import {useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTaskById, getTasks} from "../../api/tasks.ts";
import {useEffect, useMemo, useRef, useState} from "react";
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
import {SmallRedButton} from "../../components/Global/Buttons/SmallButtons/SmallRedButton.tsx";
import {SubmitIcon} from "../../components/User/Task/SVGs/SubmitIcon.tsx";
import {PageHeader} from "../../components/User/Task/Headers/PageHeader.tsx";
import {PageHeaderSection} from "../../components/User/Task/Headers/PageHeaderSection.tsx";
import {TasksBurgerMenu} from "../../components/User/Task/BurgerMenus/TasksBurgerMenu.tsx";
import {CPP_Template} from "../../constants/languageTemplates.ts";
import {YesNoModal} from "../../components/Global/Modals/YesNoModal.tsx";
import {MALICIOUS_INPUT_MESSAGES} from "../../constants/maliciousInputDetectionMessages.ts";
import {LeftNavIcon} from "../../components/User/Task/SVGs/LeftNavIcon.tsx";
import {RightNavIcon} from "../../components/User/Task/SVGs/RightNavIcon.tsx";
import {getCompetition} from "../../api/competition.ts";
import {Timer} from "../../components/User/Task/Misc/Timer.tsx";
import {RequirementsTable} from "../../components/User/Task/Misc/RequirementsTable.tsx";
import {AttemptResults} from "../../components/User/Task/Misc/AttemptResults.tsx";
import {getScoreWord} from "../../utils/getScoreWord.ts";

export const TaskPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>("");
    const [isCodeFullScreen, setIsCodeFullScreen] = useState<boolean>(false);
    const [tasksOpen, setTasksOpen] = useState<boolean>(false);
    const [finishButtonPressed, setFinishButtonPressed] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const currentTaskNumber = useRef<number>(1);

    const {maliciousAction, clearMaliciousAction} = useHandleMaliciousInputs({
        disableActivityTimestamps: false,
        disableMouseLeaveDetection: true,
        disableCopyPasteDetection: false,
    });

    const {data: tasksList} = useQuery({
        queryFn: getTasks,
        queryKey: ['tasks'],
    });

    const {data: competitionInfo} = useQuery({
        queryFn: getCompetition,
        queryKey: ['competition'],
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
        currentTaskNumber.current = idNum-1;
    }, [id, tasksList]);

    useEffect(() => {
        if (!data?.task.id) return;

        const savedCode = localStorage.getItem(data.task.id);

        if (savedCode) {
            setCode(savedCode);
        } else {
            setCode(CPP_Template);
        }
    }, [data]);

    useEffect(() => {
        if (!data?.task.id) return;
        localStorage.setItem(data.task.id, code);
    }, [code]);

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
                                onClick={() => navigate(`/tasks/${Number(id) - 1}`)}
                            />
                            <PanelHeaderButton
                                svg={<RightNavIcon/>}
                                onClick={() => navigate(`/tasks/${Number(id) + 1}`)}
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
                        {competitionInfo &&
                            <Timer
                                startDateTime={competitionInfo.startDateTime}
                                endDateTime={competitionInfo.endDateTime}
                            />
                        }
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
                                label={"Требования"}
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
                            <div className="h-screen w-full animate-pulse bg-header"></div>
                        }
                        {!isLoading && !isError && data && (
                            <>
                                <div className="max-h-full p-3 md:px-5 overflow-scroll scrollbar-hide">
                                    <h2 id={"description"} className={"text-2xl mt-1 mb-2"}>Постановка задачи</h2>

                                    <section className="flex flex-col p-3 gap-2 rounded-2xl bg-header">
                                        <span className="text-xl">{data.task.name}</span>
                                        <span className="text-sm">Вес задания: {data.task.weight} {getScoreWord(data.task.weight)}</span>
                                        <span className="text-sm">Статус выполнения:
                                            {tasksList && (
                                                tasksList[currentTaskNumber.current].status === "NOT_STARTED" ?
                                                <span className="text-yellow-400"> Не начата</span> :
                                                    tasksList[currentTaskNumber.current].status === "COMPLETED" ?
                                                        <span className="text-green-500"> Успех</span> :
                                                        <span className="text-red-500"> Провал</span>
                                            )
                                            }
                                        </span>
                                        <div className="prose lg:prose-md dark:prose-invert w-full p-2 bg-container rounded-2xl" dangerouslySetInnerHTML={{__html: data.task.description}}></div>
                                    </section>

                                    <h2 id={"expected-behavior"} className={"text-2xl mt-3 mb-2"}>Требования</h2>

                                    <RequirementsTable
                                        timeLimit={data.task.timeLimit}
                                        memoryLimit={data.task.memoryLimit}
                                    />

                                    {data.attempts.length > 0 &&
                                        <>
                                            <h2 id={"results"} className={"text-2xl mt-3 mb-2"}>Результаты проверки</h2>
                                            {data.attempts.map(((attempt) => (
                                                <AttemptResults key={attempt.id} attempt={attempt}/>
                                            )))}
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