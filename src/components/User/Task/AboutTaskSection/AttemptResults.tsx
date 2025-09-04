import type {TaskAttempt} from "../../../../types/task.ts";

export type AttemptResultsProps = {
    attempt: TaskAttempt
}

export const AttemptResults = ({attempt}: AttemptResultsProps) => {
    return (
        <section className="flex flex-col p-3 gap-2 rounded-2xl bg-header mb-3">
            <span>
                Попытка №{attempt.attemptNumber}: {
                attempt.success ?
                    <span className="text-green-500">Успех</span> :
                    <span className="text-red-500">Провал</span>
            }
            </span>
            <span>Время отправки: {new Date(attempt.submissionTime).toLocaleTimeString()}</span>
            <span>Решение: </span>
            <section className="prose lg:prose-md dark:prose-invert"><pre>{attempt.solution}</pre></section>
            <span>Результаты: </span>
            <section className="prose lg:prose-md dark:prose-invert bg-container rounded-lg">
                <table>
                    <thead>
                    <tr>
                        {["Номер", /*"Статус",*/ "Время", "Память", "Описание"]
                            .map((item) => (
                                <th className="p-1 text-center" key={item}>{item}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {attempt.testResults.map((result, index) => (
                        <tr key={result.id || index}>
                            <td className="p-1 text-center">{index+1}</td>
                            {/*<td className="p-1 text-center">
                                                                            {result.passed ? "Успех" : "Провал"}
                                                                        </td>*/}
                            <td className="p-1 text-center">{result.timeSeconds} с</td>
                            <td className="p-1 text-center">{Math.round(result.memoryBytes/1024)} кб</td>
                            {/*<td className="p-1 text-center">{result.reason}</td>*/}
                            <td className={`p-1 text-center ${
                                result.passed ? "text-green-500" : "text-red-500"
                            }`}>{result.reason}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};