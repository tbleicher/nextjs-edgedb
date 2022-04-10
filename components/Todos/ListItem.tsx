import { Task } from "../../types/todo";

interface ListItemProps {
  task: Task;
  toggleTask: (id: string, params?: any) => any;
}

export function ListItem({ task, toggleTask }: ListItemProps) {
  return (
    <li key={task.id} className={task.completed ? "completed" : ""}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
        <label>{task.title}</label>
      </div>
    </li>
  );
}
