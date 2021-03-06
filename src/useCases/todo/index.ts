import { Task, TaskDbInterface } from "../../types/todo";

export class DeleteTaskUseCase {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(id: string): Promise<Task | null> {
    return this.db.deleteTaskById(id);
  }
}

export class DeleteCompletedTasks {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(): Promise<Task[]> {
    return this.db.deleteCompletedTasks();
  }
}

export class CreateTaskUseCase {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(title: string): Promise<Task | null> {
    return this.db.createTask(title);
  }
}

export class ListTasksUseCase {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(): Promise<Task[]> {
    return this.db.listTasks();
  }
}

export class MarkAllTasksCompleted {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(): Promise<Task[]> {
    return this.db.markAllTasksCompleted();
  }
}

export class ToggleTaskUseCase {
  db: TaskDbInterface;

  constructor(db: TaskDbInterface) {
    this.db = db;
  }

  async execute(id: string): Promise<Task | null> {
    return this.db.toggleTaskCompleted(id);
  }
}
