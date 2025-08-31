import {useEffect, useRef, useState} from "react";

export const useHandleMaliciousInputs = () => {
    const [maliciousAction, setMaliciousAction] = useState<string | null>(null);
    const keyBuffer = useRef<string[]>([]);
    const lastActionTimestamp = useRef<number>(0);
    const lastKeyPressTimestamp = useRef<number>(0);

    const updateLastActionTimestamp = () => {
        const newState = Date.now();

        if (lastActionTimestamp.current && newState - lastActionTimestamp.current > 120000) {
            setMaliciousAction("Слишком долго отсутствовала активность со стороны пользователя!")
        }
        lastActionTimestamp.current = newState;
    }

    const updateLastKeyPressTimestamp = () => {
        const newState = Date.now();

        if (lastKeyPressTimestamp.current && newState - lastKeyPressTimestamp.current > 1000) {
            keyBuffer.current = [];
        }

        lastKeyPressTimestamp.current = newState;
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

    const handleKeyPress = (e: KeyboardEvent) => {
        updateLastKeyPressTimestamp();
        updateLastActionTimestamp();

        if (e.code === "F12") {
            setMaliciousAction("Обнаружена попытка открыть консоль разработчика!!!");
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        let code = e.code;

        if (code.includes("Shift")) {
            code = "Shift";
        } else if (code.includes("Control")) {
            code = "Control";
        }

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

    const handleVisibilityChange = () => {
        if (document.hidden) {
            setMaliciousAction("Обнаружена попытка перехода в другую вкладку!!!");
        }
    }

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return {maliciousAction, clearMaliciousAction: () => setMaliciousAction(null)};
}