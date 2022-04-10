export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type TaskFilterOption = "all" | "active" | "completed";
