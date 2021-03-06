export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export interface TaskDbInterface {
  createTask(title: string): Promise<Task | null>;
  deleteCompletedTasks(): Promise<Task[]>;
  deleteTaskById(id: string): Promise<Task | null>;
  getTaskById(id: string): Promise<Task | null>;
  listTasks(): Promise<Task[]>;
  markAllTasksCompleted(): Promise<Task[]>;
  toggleTaskCompleted(id: string): Promise<Task | null>;
}
