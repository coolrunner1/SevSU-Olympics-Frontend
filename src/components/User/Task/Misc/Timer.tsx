import {useEffect, useRef, useState} from "react";
import {RemainingTimePanel} from "./RemainingTimePanel.tsx";
import {PanelHeaderButton} from "../Buttons/PanelHeaderButton.tsx";
import {StopwatchIcon} from "../SVGs/StopwatchIcon.tsx";

export type TimerProps = {
    startDateTime: string;
    endDateTime: string;
}

export const Timer = ({startDateTime, endDateTime}: TimerProps) => {
    const [time, setTime] = useState<string>("");
    const endTime = useRef<string>("");
    const [showRemainingTime, setShowRemainingTime] = useState<boolean>(false);

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
            setTime(`${hours}:${minutes.toString().length >= 2 ? minutes : "0"+minutes}`);
            return updateTime;
        }()), 30000)
    }, [endTime]);

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