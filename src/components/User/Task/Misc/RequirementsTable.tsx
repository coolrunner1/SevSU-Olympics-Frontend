import {getScoreWord} from "../../../../utils/getScoreWord.ts";

export type RequirementsTableProps = {
    timeLimit: number;
    memoryLimit: number;
    weight: number;
}

export const RequirementsTable = ({timeLimit, memoryLimit, weight}: RequirementsTableProps) => {
    return (
        <div className="bg-header p-3 rounded-2xl">
            <section className="prose lg:prose-md dark:prose-invert rounded-lg bg-container">
                <table>
                    <thead>
                    <tr>
                        <th className="p-2">Критерий</th>
                        <th className="p-2">Требование</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="p-2">Ограничения по времени</th>
                        <td className="p-2">{timeLimit} мс</td>
                    </tr>
                    <tr >
                        <th className="p-2">Ограничения по памяти</th>
                        <td className="p-2">{memoryLimit} кбайт</td>
                    </tr>
                    <tr>
                        <th className="p-2">Значимость задания</th>
                        <td className="p-2">{weight} {getScoreWord(weight)}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};