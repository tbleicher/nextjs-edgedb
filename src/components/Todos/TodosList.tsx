import { ListItem } from "./ListItem";
import { Task } from "../../types/todo";
import styles from "./TodosList.module.css";
import { useDeleteTaskMutation } from "../../hooks/useDeleteTaskMutation";
import { useMarkAllTasksCompletedMutation } from "../../hooks/useMarkAllTasksCompletedMutation";
import { useToggleTaskMutation } from "../../hooks/useToggleTaskMutation";

interface TodosListProps {
  refetchTasks: () => void;
  tasks: Task[];
}

export function TodosList({ tasks, refetchTasks }: TodosListProps) {
  const { mutate: deleteTask } = useDeleteTaskMutation(refetchTasks);
  const { mutate: markAllCompleted } = useMarkAllTasksCompletedMutation(refetchTasks);
  const { mutate: toggleTask } = useToggleTaskMutation(refetchTasks);

  return (
    <section className="main">
      <div className="view">
        <button id="toggle-all" className={styles["toggle-all"]} onClick={() => markAllCompleted()} />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </div>
      <ul className={styles["todo-list"]}>
        {tasks.map((task) => (
          <ListItem key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} />
        ))}
      </ul>
    </section>
  );
}
