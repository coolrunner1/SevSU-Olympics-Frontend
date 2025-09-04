import {useEffect, useRef, useState} from "react";
import {RemainingTimePanel} from "./RemainingTimePanel.tsx";
import {PanelHeaderButton} from "../Buttons/PanelHeaderButton.tsx";
import {StopwatchIcon} from "../SVGs/StopwatchIcon.tsx";
import {OkModal} from "../../../Global/Modals/OkModal.tsx";
import {useNavigate} from "react-router";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export type TimerProps = {
    startDateTime: string;
    endDateTime: string;
}

//ToDo: remove competition end handling from this component
export const Timer = ({startDateTime, endDateTime}: TimerProps) => {
    const [time, setTime] = useState<string>("");
    const endTime = useRef<string>("");
    const [showRemainingTime, setShowRemainingTime] = useState<boolean>(false);
    const [competitionEnd, setCompetitionEnd] = useState<boolean>(false);
    const navigate = useNavigate();
    const signOut = useSignOut()

    useEffect(() => {
        endTime.current = endDateTime;
    }, [endDateTime]);

    useEffect(() => {
        if (!endTime.current) return;
        setInterval((function updateTime() {
            const now = new Date().getTime();
            const distance = new Date(endTime.current).getTime() - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            if (minutes < 0) {
                setCompetitionEnd(true);
                localStorage.clear()
                signOut();
            }
            setTime(`${hours}:${minutes.toString().length >= 2 ? minutes : "0"+minutes}`);
            return updateTime;
        }()), 30000)
    }, [endTime]);

    if (competitionEnd) {
        return (
            <>
                <OkModal
                    message={"Олимпиада завершена"}
                    setClose={() => navigate("/login")}
                />
            </>
        )
    }

    return (
        <>
            {showRemainingTime &&
                <RemainingTimePanel
                    startTime={startDateTime}
                    endTime={endDateTime}
                />
            }
            <PanelHeaderButton
                hideSvgOnSmallScreens={true}
                label={time}
                svg={<StopwatchIcon/>}
                onClick={() => setShowRemainingTime(true)}
                onBlur={() => setShowRemainingTime(false)}
            />
        </>
    );
};