import { ListItem } from "./ListItem";
import { Task } from "../../types/todo";
import styles from "./TodosList.module.css";
import { useDeleteTaskMutation } from "../../hooks/useDeleteTaskMutation";
import { useMarkAllTasksCompletedMutation } from "../../hooks/useMarkAllTasksCompletedMutation";
import { useToggleTaskMutation } from "../../hooks/useToggleTaskMutation";

interface TodosListProps {
  tasks: Task[];
}

export function TodosList({ tasks }: TodosListProps) {
  const { mutate: deleteTask } = useDeleteTaskMutation();
  const { mutate: markAllCompleted } = useMarkAllTasksCompletedMutation();
  const { mutate: toggleTask } = useToggleTaskMutation();

  return (
    <section className="main">
      <div className="view">
        <button
          id="toggle-all"
          className={styles["toggle-all"]}
          onClick={() => markAllCompleted()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </div>
      <ul className={styles["todo-list"]}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))}
      </ul>
    </section>
  );
}
