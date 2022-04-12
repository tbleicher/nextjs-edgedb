import axios from "axios";
import { useMutation } from "react-query";
import { Task } from "../../types/todo";
import { onError } from "../../utils/api";

import styles from "./ClearCompletedButton.module.css";

interface ClearCompletedButtonProps {
  refetchTasks: () => void;
  tasks: Task[];
}

export function ClearCompletedButton({ tasks, refetchTasks }: ClearCompletedButtonProps) {
  const { mutate: deleteCompletedTasks } = useMutation(
    () => {
      return axios.delete(`/api/todo/`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  const hideButton = tasks.every((task) => !task.completed);

  if (hideButton) return null;

  return (
    <button className={styles["clear-completed"]} onClick={() => deleteCompletedTasks()}>
      Clear completed
    </button>
  );
}
