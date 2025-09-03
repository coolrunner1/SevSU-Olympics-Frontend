import {getScoreWord} from "../../../../utils/getScoreWord.ts";

export type RequirementsTableProps = {
    timeLimit: number;
    memoryLimit: number;
    weight: number;
}

export const RequirementsTable = ({timeLimit, memoryLimit, weight}: RequirementsTableProps) => {
    return (
        <table className="p-2 bg-header">
            <tbody className="p-2">
            <tr className="border">
                <th className="border p-1">Ограничения по времени</th>
                <td className="border p-1">{timeLimit} мс</td>
            </tr>
            <tr className="border">
                <th className="border p-1">Ограничения по памяти</th>
                <td className="border p-1">{memoryLimit} кбайт</td>
            </tr>
            <tr className="border">
                <th className="border p-1">Значимость задания</th>
                <td className="border p-1">{weight} {getScoreWord(weight)}</td>
            </tr>
            </tbody>
        </table>
    );
};