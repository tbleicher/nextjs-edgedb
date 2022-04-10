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

  async getTodoById(id: string): Promise<Task | null> {
    return this._tasks.find((task) => task.id === id) || null;
  }

  async listTasks(): Promise<Task[]> {
    return [...this._tasks];
  }

  async toggleCompleted(id: string): Promise<Task | null> {
    const task = await this.getTodoById(id);
    if (!task) return null;

    const updatedTask: Task = { ...task, completed: !task.completed };
    this._tasks = this._tasks.map((task) => (task.id === id ? updatedTask : task));

    return updatedTask;
  }
}
