import { Task } from "../../types/todo";

interface TodosCounterProps {
  tasks: Task[] | undefined;
}

export function TodosCounter({ tasks = [] }: TodosCounterProps) {
  const activeTasks = tasks.filter((task) => !task.completed) || [];

  return (
    <span className="todo-count">
      <strong>{activeTasks.length}</strong>
      {` item${activeTasks.length > 1 ? "s" : ""} left`}
    </span>
  );
}
