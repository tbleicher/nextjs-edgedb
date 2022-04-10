export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TaskFilterOption = "all" | "active" | "completed";

export interface TaskDbInterface {
  createTask(title: string): Promise<Task | null>;
  getTodoById(id: string): Promise<Task | null>;
  listTasks(): Promise<Task[]>;
  toggleCompleted(id: string): Promise<Task | null>;
}
