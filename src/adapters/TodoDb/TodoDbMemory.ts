import { nanoid } from "nanoid";
import { Task, TaskDbInterface } from "../../types/todo";

export class TodoDbMemory implements TaskDbInterface {
  private _tasks: Task[];

  constructor() {
    this._tasks = [];
  }

  async createTask(title: string): Promise<Task | null> {
    const task: Task = {
      id: nanoid(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    this._tasks = [...this._tasks, task];

    return task;
  }

  async deleteTaskById(id: string): Promise<Task | null> {
    const deleted = this._tasks.find((task) => task.id === id);
    this._tasks = this._tasks.filter((task) => task.id !== id);

    return deleted || null;
  }

  async deleteCompletedTasks(): Promise<Task[]> {
    const completed = this._tasks.filter((task) => task.completed);
    this._tasks = this._tasks.filter((task) => !task.completed);

    return completed;
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this._tasks.find((task) => task.id === id) || null;
  }

  async listTasks(): Promise<Task[]> {
    return [...this._tasks];
  }

  async markAllTasksCompleted(): Promise<Task[]> {
    const updated = this._tasks.filter((task) => !task.completed).map((task) => ({ ...task, completed: true }));
    this._tasks = this._tasks.map((task) => ({ ...task, completed: true }));

    return updated;
  }

  async toggleTaskCompleted(id: string): Promise<Task | null> {
    const task = await this.getTaskById(id);
    if (!task) return null;

    const updatedTask: Task = { ...task, completed: !task.completed };
    this._tasks = this._tasks.map((task) => (task.id === id ? updatedTask : task));

    return updatedTask;
  }
}
