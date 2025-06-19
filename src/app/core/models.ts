export interface Column {
    id: string;
    title: string;
}

export interface Task {
    id: string;
    columnId: string;
    title: string;
    description?: string;
}

export interface Board {
    columns: Column[];
    tasks: Task[];
}
