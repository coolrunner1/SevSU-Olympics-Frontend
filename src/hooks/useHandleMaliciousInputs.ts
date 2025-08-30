import {useEffect, useState} from "react";

export const useHandleMaliciousInputs = () => {
    const [, setKeyBuffer] = useState<string[]>([]);
    const [maliciousAction, setMaliciousAction] = useState<string | null>(null);
    const [, setLastActionTimestamp] = useState<number>(0);

    const updateLastActionTimestamp = () => {
        setLastActionTimestamp(prevState => {
            const newState = Date.now();
            if (prevState && newState - prevState > 120000) {
                setMaliciousAction("Слишком долго отсутствовала активность со стороны пользователя!")
            }
            return newState;
        });
    }

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const handleMouse = () => {
            updateLastActionTimestamp();
        };

        document.addEventListener('mousemove', handleMouse);

        return () => {
            document.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            let code = e.code;

            if (code.includes("Shift")) {
                code = "Shift";
            } else if (code.includes("Control")) {
                code = "Control";
            }

            setKeyBuffer(prevBuffer => {
                updateLastActionTimestamp();
                const newBuffer = [...prevBuffer];

                newBuffer.push(code);

                if (newBuffer.length > 3) {
                    newBuffer.shift();
                }

                if (newBuffer.includes("Shift") && newBuffer.includes("Control") && (newBuffer.includes("KeyI") || newBuffer.includes("KeyJ"))) {
                    setMaliciousAction("Обнаружена попытка открыть консоль разработчика!!!");
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return [];
                }

                if (newBuffer.includes("Control") && (newBuffer.includes("KeyV") || newBuffer.includes("KeyC") || newBuffer.includes("KeyX"))) {
                    setMaliciousAction("Обнаружена попытка копирования или вставления текста!!!");
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return [];
                }

                /*if (newBuffer.includes("Control") && newBuffer.includes("KeyC")) {
                    alert("Обнаружена попытка копирования текста!!!");
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return [];
                }*/

                return newBuffer;
            });

            if (e.code === "F12") {
                setMaliciousAction("Обнаружена попытка открыть консоль разработчика!!!");
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return {maliciousAction, clearMaliciousAction: () => setMaliciousAction(null)};
}