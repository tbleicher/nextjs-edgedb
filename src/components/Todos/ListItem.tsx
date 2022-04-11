import { Task } from "../../types/todo";

import styles from "./ListItem.module.css";

interface ListItemProps {
  task: Task;
  toggleTask: (id: string, params?: any) => any;
}

export function ListItem({ task, toggleTask }: ListItemProps) {
  const className = task.completed ? `${styles.listitem} ${styles.completed}` : styles.listitem;
  return (
    <li key={task.id} className={className}>
      <div className="view">
        <input
          className={styles.toggle}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <label className={styles.label}>{task.title}</label>
      </div>

      <button className={styles.destroy} onClick={() => console.log(task.id)} />
    </li>
  );
}
