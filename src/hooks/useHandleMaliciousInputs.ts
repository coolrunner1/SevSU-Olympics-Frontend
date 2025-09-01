import {useEffect, useRef, useState} from "react";
import type {CheatingTypes} from "../types/task.ts";

export type UseHandleMaliciousInputsProps = {
    disableActivityTimestamps?: boolean;
    disableMouseLeaveDetection?: boolean;
    disableCopyPasteDetection?: boolean;
}

type UseHandleMaliciousInputsReturnType = {
    maliciousAction: CheatingTypes;
    clearMaliciousAction: () => void;
}

export const useHandleMaliciousInputs = (
    {disableActivityTimestamps, disableMouseLeaveDetection, disableCopyPasteDetection}: UseHandleMaliciousInputsProps
): UseHandleMaliciousInputsReturnType => {
    const [maliciousAction, setMaliciousAction] = useState<CheatingTypes>(null);
    const keyBuffer = useRef<Set<string>>(new Set());
    const lastActionTimestamp = useRef<number>(0);

    const updateLastActionTimestamp = () => {
        if (disableActivityTimestamps) return;

        const newState = Date.now();

        if (lastActionTimestamp.current && newState - lastActionTimestamp.current > 120000) {
            setMaliciousAction("no_activity");
        }
        lastActionTimestamp.current = newState;
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
    };

    const handleMouseMove = () => {
        updateLastActionTimestamp();
    };

    const handleMouseLeave = () => {
        setMaliciousAction("leave_attempt");
    };

    const normalizeInputCode = (code: string) => {
        if (code.includes("Shift")) {
            return "Shift";
        }

        if (code.includes("Control")) {
            return  "Control";
        }

        if (code.includes("Meta")) {
            return "Meta";
        }

        return code;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        updateLastActionTimestamp();

        if (e.code === "F12") {
            setMaliciousAction("console");
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        const code = normalizeInputCode(e.code);

        const newBuffer = keyBuffer.current;

        newBuffer.add(code);

        if (newBuffer.size < 2) {
            keyBuffer.current = newBuffer;
            return;
        }

        if (newBuffer.has("Shift") && newBuffer.has("Control") && (newBuffer.has("KeyI") || newBuffer.has("KeyJ"))) {
            setMaliciousAction("console");
            e.preventDefault();
            e.stopImmediatePropagation();
        } else if (!disableCopyPasteDetection && newBuffer.has("Control") && (newBuffer.has("KeyV") || newBuffer.has("KeyC") || newBuffer.has("KeyX") || newBuffer.has("KeyS") || newBuffer.has("KeyP"))) {
            setMaliciousAction("copy_paste");
            e.preventDefault();
            e.stopImmediatePropagation();
        } else if (newBuffer.has("Meta") && newBuffer.has("Shift") && newBuffer.has("KeyS")) {
            setMaliciousAction("screenshot");
            newBuffer.clear();
        }

        keyBuffer.current = newBuffer;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        updateLastActionTimestamp();

        if (e.code === "PrintScreen") {
            e.preventDefault();
            setMaliciousAction("screenshot");
            return;
        }

        const code = normalizeInputCode(e.code);

        const newBuffer = keyBuffer.current;

        if (newBuffer.has(code)) {
            newBuffer.delete(code);
        }

        keyBuffer.current = newBuffer;
    };
    const handleVisibilityChange = () => {
        if (document.hidden) {
            setMaliciousAction("tab_switch");
        }
    }

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        if (!disableActivityTimestamps) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchmove', handleMouseMove);
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        if (!disableMouseLeaveDetection) {
            document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return {maliciousAction, clearMaliciousAction: () => setMaliciousAction(null)};
}