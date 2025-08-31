import {useEffect, useRef, useState} from "react";

export const useHandleMaliciousInputs = () => {
    const [maliciousAction, setMaliciousAction] = useState<string | null>(null);
    const keyBuffer = useRef<string[]>([]);
    const lastActionTimestamp = useRef<number>(0);

    const updateLastActionTimestamp = () => {
        const newState = Date.now();

        if (lastActionTimestamp.current && newState - lastActionTimestamp.current > 120000) {
            setMaliciousAction("Слишком долго отсутствовала активность со стороны пользователя!")
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
        setMaliciousAction("Была обнаружена попытка уйти со страницы!");
    };

    const normalizeInputCode = (code: string) => {
        if (code.includes("Shift")) {
            return "Shift";
        }

        if (code.includes("Control")) {
            return  "Control";
        }

        return code;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        updateLastActionTimestamp();

        if (e.code === "F12") {
            setMaliciousAction("Обнаружена попытка открыть консоль разработчика!!!");
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        const code = normalizeInputCode(e.code);

        const newBuffer = [...keyBuffer.current];

        newBuffer.push(code);

        if (newBuffer.length > 3) {
            newBuffer.shift();
        }

        if (newBuffer.includes("Shift") && newBuffer.includes("Control") && (newBuffer.includes("KeyI") || newBuffer.includes("KeyJ"))) {
            setMaliciousAction("Обнаружена попытка открыть консоль разработчика!!!");
            e.preventDefault();
            e.stopImmediatePropagation();
            keyBuffer.current = [];
            return;
        }

        if (newBuffer.includes("Control") && (newBuffer.includes("KeyV") || newBuffer.includes("KeyC") || newBuffer.includes("KeyX"))) {
            setMaliciousAction("Обнаружена попытка копирования или вставления текста!!!");
            e.preventDefault();
            e.stopImmediatePropagation();
            keyBuffer.current = [];
            return;
        }

        keyBuffer.current = newBuffer;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        updateLastActionTimestamp();

        const code = normalizeInputCode(e.code);

        const newBuffer = [...keyBuffer.current];

        const codeIndex = newBuffer.indexOf(code);

        if (codeIndex > -1) {
            newBuffer.splice(codeIndex, 1);
        }

        keyBuffer.current = newBuffer;
    };
    const handleVisibilityChange = () => {
        if (document.hidden) {
            setMaliciousAction("Обнаружена попытка перехода в другую вкладку!!!");
        }
    }

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);

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