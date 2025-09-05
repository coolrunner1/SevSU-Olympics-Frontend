export type RequirementsTableProps = {
    timeLimit: number;
    memoryLimit: number;
}

export const RequirementsTable = ({timeLimit, memoryLimit}: RequirementsTableProps) => {
    return (
        <div className="bg-header py-4 px-3 lg:px-4 rounded-2xl">
            <section className="prose lg:prose-md dark:prose-invert rounded-lg bg-container">
                <table>
                    <thead>
                    <tr>
                        <th className="p-2">Критерий</th>
                        <th className="p-2">Ограничение</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="p-2">Ограничение по времени</th>
                        <td className="p-2">{timeLimit} с</td>
                    </tr>
                    <tr >
                        <th className="p-2">Ограничение по памяти</th>
                        <td className="p-2">{memoryLimit} кбайт</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};