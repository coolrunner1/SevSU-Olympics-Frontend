export type Task = {
    id: string;
    name: string;
    description: string;
    timeLimit: number;
    memoryLimit: number;
    weight: number;
}

export type CheatingTypes = "no_activity" | "leave_attempt" | "console" | "copy_paste" | "screenshot" | "tab_switch" | null;