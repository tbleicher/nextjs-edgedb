import axios from "axios";
import { useMutation } from "react-query";
import { onError } from "../../utils/api";

import styles from "./AddTodoInput.module.css";

export function AddTodoInput({ refetchTasks }: { refetchTasks: () => void }) {
  const addTask = useMutation((title: string) => axios.post("/api/todo", { title }), {
    onSuccess: refetchTasks,
    onError,
  });

  return (
    <input
      className={styles.newtodo}
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e) => {
        const title = e.currentTarget.value.trim();
        if (e.key === "Enter" && title) {
          addTask.mutate(title);
          e.currentTarget.value = "";
        }
      }}
    />
  );
}
