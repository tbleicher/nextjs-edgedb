import { Task } from "../../types/todo";
import styles from "./ClearCompletedButton.module.css";
import { useDeleteCompletedTasksMutation } from "../../hooks/useDeleteCompletedTasksMutation";

interface ClearCompletedButtonProps {
  tasks: Task[];
}

export function ClearCompletedButton({ tasks }: ClearCompletedButtonProps) {
  const { mutate: deleteCompletedTasks } = useDeleteCompletedTasksMutation();

  const hideButton = tasks.every((task) => !task.completed);

  if (hideButton) return null;

  return (
    <button
      className={styles["clear-completed"]}
      onClick={() => deleteCompletedTasks()}
    >
      Clear completed
    </button>
  );
}
