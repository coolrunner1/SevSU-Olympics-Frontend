export type RemainingTimePanelProps = {
    startTime: string;
    endTime: string;
}

export const RemainingTimePanel = ({startTime, endTime}: RemainingTimePanelProps) => {
    return (
        <div className="mt-7 md:mr-4 bg-header absolute rounded-xl p-3 z-10 text-sm shadow-lg">
            Время начала:<br/>
            {new Date(startTime).toLocaleTimeString()}<br/>
            Время окончания:<br/>
            {new Date(endTime).toLocaleTimeString()}<br/>
        </div>
    );
};