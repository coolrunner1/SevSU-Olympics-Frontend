import {useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTaskById} from "../../api/tasks.ts";
import {useEffect, useState} from "react";
import {CodeEditor} from "../../components/Global/Editors/CodeEditor.tsx";
import {PanelHeaderLinkButton} from "../../components/Task/Buttons/PanelHeaderLinkButton.tsx";
import {DescriptionIcon} from "../../components/Task/SVGs/DescriptionIcon.tsx";
import {ExpectedBehaviorIcon} from "../../components/Task/SVGs/ExpectedBehaviorIcon.tsx";
import {ResultsIcon} from "../../components/Task/SVGs/ResultsIcon.tsx";
import {PanelContainer} from "../../components/Task/Containers/PanelContainer.tsx";
import {PanelHeader} from "../../components/Task/Headers/PanelHeader.tsx";
import {CodeIcon} from "../../components/Task/SVGs/CodeIcon.tsx";
import {PanelHeaderButton} from "../../components/Task/Buttons/PanelHeaderButton.tsx";
import {FullScreenIcon} from "../../components/Task/SVGs/FullScreenIcon.tsx";
import {ShrinkIcon} from "../../components/Task/SVGs/ShrinkIcon.tsx";
import {useHandleMaliciousInputs} from "../../hooks/useHandleMaliciousInputs.ts";
import {OkModal} from "../../components/Global/Modals/OkModal.tsx";
import {TasksIcon} from "../../components/Task/SVGs/TasksIcon.tsx";
//import {RunIcon} from "../../components/Task/SVGs/RunIcon.tsx";
import {StopwatchIcon} from "../../components/Task/SVGs/StopwatchIcon.tsx";
import {SmallRedButton} from "../../components/Global/Buttons/SmallButtons/SmallRedButton.tsx";
import {SubmitIcon} from "../../components/Task/SVGs/SubmitIcon.tsx";
import {PageHeader} from "../../components/Task/Headers/PageHeader.tsx";
import {PageHeaderSection} from "../../components/Task/Headers/PageHeaderSection.tsx";
import {TasksBurgerMenu} from "../../components/Task/BurgerMenus/TasksBurgerMenu.tsx";
import {cppTemplate} from "../../constants/languageTemplates.ts";
import {YesNoModal} from "../../components/Global/Modals/YesNoModal.tsx";

export const TaskPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>(cppTemplate);
    const [isCodeFullScreen, setIsCodeFullScreen] = useState<boolean>(false);
    const [tasksOpen, setTasksOpen] = useState<boolean>(false);
    const [finishButtonPressed, setFinishButtonPressed] = useState<boolean>(false);

    useEffect(() => {
        if (!id) navigate(`/tasks/1`);
    }, [id]);

    const {maliciousAction, clearMaliciousAction} = useHandleMaliciousInputs({
        disableActivityTimestamps: false,
        disableMouseLeaveDetection: true,
        disableCopyPasteDetection: false,
    });

    const {data, isError, isLoading, error} = useQuery({
        queryFn: () => getTaskById,
        queryKey: ['article', id],
    })

    return (
        <>
            {maliciousAction &&
                <OkModal message={maliciousAction} setClose={clearMaliciousAction}/>
            }
            {finishButtonPressed &&
            <YesNoModal
                title={"Вы уверены, что хотите завершить выполнение заданий?"}
                onYesClick={() => alert("placeholder")}
                onNoClick={() => setFinishButtonPressed(false)}
            />
            }
            {isLoading && <>Loading placeholder</>}
            {error && error.message}
            {tasksOpen &&
                <TasksBurgerMenu setClosed={() => setTasksOpen(false)}/>
            }
            {/*isLoading && !isError && data && (
                <>

                </>
            )
            */}
            <div>
                <PageHeader>
                    <PageHeaderSection>
                        <PanelHeaderButton
                            hideLabelOnSmallScreens={true}
                            label={"Показать задания"}
                            svg={<TasksIcon/>}
                            onClick={() => setTasksOpen(true)}
                        />
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
                        <PanelHeaderButton
                            hideSvgOnSmallScreens={true}
                            label={"00:00"}
                            svg={<StopwatchIcon/>}
                            onClick={() => {}}
                        />
                        <SmallRedButton
                            title={"Завершить выполнение заданий"}
                            label={"Завершить"}
                            onClick={() => setFinishButtonPressed(true)}
                        />
                    </PageHeaderSection>
                </PageHeader>
                {/*!tasksHidden &&
                    <div className="flex items-center p-2 md:max-w-1/2 m-2 md:mx-auto rounded-lg shadow-lg gap-2 bg-header">
                        <div className="m-auto">
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {navigate(`/tasks/${item}`)}}
                                    className={`w-9 text-center text-lg font-bold p-1 rounded-lg gap-x-1 transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-950 ${item == 1 && "text-blue-500"} ${item == 2 && "text-red-500"} ${item == 4 && "text-green-500"} ${item === Number(id) && "bg-gray-300 dark:bg-gray-600"}`}
                                >
                                    <span>{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                */}
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
                            <PanelHeaderLinkButton
                                href={"#results"}
                                label={"Результаты проверки"}
                                svg={<ResultsIcon/>}
                            />
                        </PanelHeader>
                        <div className="max-h-full p-3 overflow-scroll scrollbar-hide">
                            <h2 id={"description"} className={"text-2xl mt-2 mb-1"}>Постановка задачи</h2>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            <h2 id={"expected-behavior"} className={"text-2xl mt-2 mb-1"}>Вводные данные</h2>

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            <h2 id={"results"} className={"text-2xl mt-2 mb-1"}>Результаты проверки</h2>

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            <div className="h-[50vh]"></div>
                        </div>
                    </PanelContainer>
                    <PanelContainer
                        customStyles={isCodeFullScreen ? "col-span-2" : undefined}
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
                                    svg={isCodeFullScreen ? <ShrinkIcon/> :<FullScreenIcon/>}
                                    onClick={() => {setIsCodeFullScreen(!isCodeFullScreen)}}
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