import styles from "./AddTodoInput.module.css";
import { useAddTaskMutation } from "../../hooks/useAddTaskMutation";

export function AddTodoInput() {
  const { mutate: addTask } = useAddTaskMutation();

  return (
    <input
      className={styles.newtodo}
      placeholder="What needs to be done?"
      autoFocus
      onKeyDown={(e) => {
        const title = e.currentTarget.value.trim();
        if (e.key === "Enter" && title) {
          addTask(title);
          e.currentTarget.value = "";
        }
      }}
    />
  );
}
