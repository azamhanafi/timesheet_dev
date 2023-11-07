export interface Task {
    id?: number;
    text: string;
    day: string;
    reminder: boolean;
    status ?: string;
  }