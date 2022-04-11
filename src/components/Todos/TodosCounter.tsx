import { Task } from "../../types/todo";

import styles from "./TodosCounter.module.css";

interface TodosCounterProps {
  tasks: Task[] | undefined;
}

export function TodosCounter({ tasks = [] }: TodosCounterProps) {
  const activeTasks = tasks.filter((task) => !task.completed) || [];

  return (
    <span className={styles["todo-count"]}>
      <strong>{activeTasks.length}</strong>
      {` item${activeTasks.length > 1 ? "s" : ""} left`}
    </span>
  );
}
