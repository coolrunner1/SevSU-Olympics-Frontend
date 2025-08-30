import {useEffect, useState} from "react";

export const useHandleMaliciousInputs = () => {
    const [, setKeyBuffer] = useState<string[]>([]);

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
        const handleKeyPress = (e: KeyboardEvent) => {
            let code = e.code;

            if (code.includes("Shift")) {
                code = "Shift";
            } else if (code.includes("Control")) {
                code = "Control";
            }

            setKeyBuffer(prevBuffer => {
                const newBuffer = [...prevBuffer];

                newBuffer.push(code);

                if (newBuffer.length > 3) {
                    newBuffer.shift();
                }

                if (newBuffer.includes("Shift") && newBuffer.includes("Control") && newBuffer.includes("KeyI")) {
                    alert("Обнаружена попытка открыть консоль разработчика!!!");
                    return [];
                }

                if (newBuffer.includes("Control") && newBuffer.includes("KeyV")) {
                    alert("Обнаружена вставления текста!!!");
                    return [];
                }

                if (newBuffer.includes("Control") && newBuffer.includes("KeyC")) {
                    alert("Обнаружена копирования текста!!!");
                    return [];
                }

                return newBuffer;
            });

            if (e.code === "F12") {
                alert("Обнаружена попытка открыть консоль разработчика!!!")
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
}