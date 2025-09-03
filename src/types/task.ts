export type TaskStatus = "NOT_STARTED" | "COMPLETED" | "FAILED"

export type Task = {
    id: string;
    name: string;
    timeLimit: number;
    memoryLimit: number;
    weight: number;
    status: TaskStatus;
}

export type FullTask = Task & {
    description: string;
}

export type TaskResponse = {
    task: FullTask;
    attempts: TaskAttempt[]
}

export type TaskAttempt = {
    attemptNumber: number;
    success: boolean;
    submissionTime: string;
    language: "CPP";
    solution: string;
    testResults: never
}

export type CheatingTypes = "no_activity" | "leave_attempt" | "console" | "copy_paste" | "screenshot" | "tab_switch" | null;