import { useMutation } from "react-query";
import axios from "axios";

import { ListItem } from "./ListItem";
import { Task } from "../../types/todo";
import { onError } from "../../utils/api";

import styles from "./TodosList.module.css";

interface TodosListProps {
  refetchTasks: () => void;
  tasks: Task[];
}

export function TodosList({ tasks, refetchTasks }: TodosListProps) {
  const { mutate: deleteTask } = useMutation(
    (id: string) => {
      return axios.delete(`/api/todo/${id}`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  const { mutate: markAllCompleted } = useMutation(
    () => {
      return axios.patch(`/api/todo/`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  const { mutate: toggleTask } = useMutation(
    (id: string) => {
      return axios.patch(`/api/todo/${id}`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

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
