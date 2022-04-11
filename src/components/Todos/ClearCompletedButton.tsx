import { Task } from "../../types/todo";

import styles from "./ClearCompletedButton.module.css";

interface ClearCompletedButtonProps {
  tasks: Task[];
}

export function ClearCompletedButton({ tasks }: ClearCompletedButtonProps) {
  const hideButton = tasks.every((task) => !task.completed);

  if (hideButton) return null;

  return (
    <button className={styles["clear-completed"]} onClick={() => console.log("TODO: clear completed")}>
      Clear completed
    </button>
  );
}
